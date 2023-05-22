import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { error } from "console"
import { useNotification } from "web3uikit"
import { handleErrorMessage } from "../utils/errorUtils"
import { useContractAddress } from "@/hooks/useContractAddress"
import { useLotteryState } from "@/hooks/useLotteryState"

interface contractAddressesInterface {
    [key: string]: string[]
}

function LotteryEntrance() {
    const { isWeb3Enabled } = useMoralis()
    const lotteryAddress = useContractAddress()
    const [entryPrice, setEntryPrice] = useState("0")
    const { numPlayer } = useLotteryState()

    const dispatch = useNotification()

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "enterLottery",
        params: {},
        msgValue: entryPrice,
    })

    const { runContractFunction: getEntryPrice } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getEntryPrice",
        params: {},
    })

    async function getEntryPriceFromContract() {
        const price = await getEntryPrice()
        if (price !== undefined) {
            const entryPriceFromCall = ((await getEntryPrice()) as BigNumber).toString()
            setEntryPrice(entryPriceFromCall)
        } else {
            console.log("price undefined")
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getEntryPriceFromContract()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx: ContractTransaction) {
        await tx.wait(1)
        handleNewNotification()
        getEntryPriceFromContract()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
        })
    }

    const handleError = async function (error: any) {
        console.log("handling error", error)
        const message = handleErrorMessage(error, entryPrice)
        handleNewErrorNotification(message)
    }

    const handleNewErrorNotification = function (message: string) {
        dispatch({
            type: "error",
            title: "Transaction Reverted",
            message: message,
            position: "topR",
        })
    }

    return (
        <div className="  text-white flex flex-col items-center text-[40px] mt-[50px]">
            LOTTERY POOL
            <div className=" text-white flex flex-col items-center text-[70px] mt-[0px] ">
                {Number(ethers.utils.formatUnits(entryPrice)) * Number(numPlayer)} ETH !!
                {lotteryAddress ? (
                    <div className="flex flex-col items-center text-[20px]">
                        <button
                            className="bg-[#EB5074] mx-auto my-auto flex items-center justify-center w-[400px] h-[150px] text-[60px] 
                                        rounded-3xl transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 mt-2 mb-2"
                            onClick={async function () {
                                await enterLottery({
                                    onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                    onError: (error: any) => handleError(error),
                                })
                            }}
                        >
                            Enter Lottery
                        </button>
                        Entry Price is {ethers.utils.formatUnits(entryPrice)} ETH
                    </div>
                ) : (
                    <div className="text-white">PLEASE CONNECT YOUR WALLET</div>
                )}
            </div>
        </div>
    )
}

export default LotteryEntrance

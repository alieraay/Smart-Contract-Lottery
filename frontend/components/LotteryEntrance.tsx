import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { error } from "console"
import { useNotification } from "web3uikit"

interface contractAddressesInterface {
    [key: string]: string[]
}

function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
    const [entryPrice, setEntryPrice] = useState("0")

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
    const handleError = async function (error: any) {
        console.log("handling error", error)
        let message = ""
        if(error.message.includes("EnterLottery__NotEnoughEntryPrice")){
            message = `You have to send ${ethers.utils.formatUnits(entryPrice)} ETH`
        } else if(error.message.includes("EnterLottery__AlreadyParticipated")){
            message = "You already participated the lottery"
        } else if(error.message.includes(""))
        handleNewErrorNotification(message);
    
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            
        })
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
        <div>
            Hi from lottery Entrance
            {lotteryAddress ? (
                <div>
                    <button
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
                <div>Lottery Address couldn't detected</div>
            )}
        </div>
    )
}

export default LotteryEntrance

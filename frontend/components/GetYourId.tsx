import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import { useNotification } from "web3uikit"
import { handleErrorMessage } from "../utils/errorUtils"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetYourId() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
    const [yourId, setYourId] = useState("0")
    const [buttonClicked, setButtonClicked] = useState(false)

    const dispatch = useNotification()

    const { runContractFunction: getYourId } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getYourId",
        params: {},
    })

    async function getYourIdFromContract() {
        const id = await getYourId()

        if (id !== undefined) {
            const yourIdFromCall = ((await getYourId()) as BigNumber).toString()
            setYourId(yourIdFromCall)
        } else {
            setYourId("undefined")
            handleError()
        }
    }
    useEffect(() => {
        if (isWeb3Enabled) {
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        setButtonClicked(false)
    }, [account])

    const handleButtonClick = () => {
        getYourIdFromContract()
        setButtonClicked(true)
    }

    const handleNewErrorNotification = async function (message: string) {
        dispatch({
            type: "error",
            title: "Transaction Reverted",
            message: message,
            position: "topR",
        })
    }

    const handleError = async function () {
        const message: string = "You have not entered the lottery"
        handleNewErrorNotification(message)
    }
    return (
        <div>
            {lotteryAddress ? (
                <>
                    <button onClick={handleButtonClick}>Get Your Ticket Id</button>

                    {buttonClicked ? (
                        yourId != "undefined" ? (
                            <div> Your ticket id is {yourId}</div>
                        ) : null
                    ) : null}
                </>
            ) : null}
        </div>
    )
}

export default GetYourId

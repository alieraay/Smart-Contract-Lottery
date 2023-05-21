// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"
import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { error } from "console"
import { useNotification } from "web3uikit"
import { handleErrorMessage } from "../utils/errorUtils"
import { useContractAddress } from "@/hooks/useContractAddress"

interface contractAddressesInterface {
    [key: string]: string[]
}
function GodModeButton() {
    const { isWeb3Enabled } = useMoralis()
    const lotteryAddress = useContractAddress()
    const { numPlayer } = useLotteryState()

    const dispatch = useNotification()

    const { runContractFunction: godMode } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "godMode",
        params: {},
    })

    const handleSuccess = async function (tx: ContractTransaction) {
        await tx.wait(1)
        handleNewNotification()
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
        const message = handleErrorMessage(error, "errGod")
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
        <div>
            {lotteryAddress ? (
                <div className="flex flex-col items-center text-[20px] bg-white">
                    <button
                        onClick={async function () {
                            await godMode({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                onError: (error: any) => handleError(error),
                            })
                        }}
                    >
                        {" "}
                        GodMode
                    </button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default GodModeButton

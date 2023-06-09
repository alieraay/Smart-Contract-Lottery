// components/GetRecentWinner.js
import { useWeb3Contract } from "react-moralis"
import { abi } from "../constants"
import { ContractTransaction } from "ethers"
import { useNotification } from "web3uikit"
import { handleErrorMessage } from "../utils/errorUtils"
import { useContractAddress } from "../hooks/useContractAddress"

function DrawButton() {
    const lotteryAddress = useContractAddress()

    const dispatch = useNotification()

    const { runContractFunction: drawLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "drawLottery",
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
        const message = handleErrorMessage(error, "errDraw")
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
                <div className="flex flex-col items-center text-[20px]">
                    <button
                        className="btn-shape text-white bg-slate-600 p-3  mt-5 "
                        onClick={async function () {
                            await drawLottery({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                onError: (error: any) => handleError(error),
                            })
                        }}
                    >
                        Draw
                    </button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default DrawButton

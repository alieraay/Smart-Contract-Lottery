// components/GetRecentWinner.js
import { useLotteryState } from "../hooks/useLotteryState"
import { useWeb3Contract } from "react-moralis"
import { abi } from "../constants"
import { useState } from "react"
import { ContractTransaction } from "ethers"
import { useNotification } from "web3uikit"
import { handleErrorMessage } from "../utils/errorUtils"
import { useContractAddress } from "../hooks/useContractAddress"
import Image from "next/image"

function FunnyImageModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-5 rounded-md funny-image-container">
                        <Image
                            src="/godMeme.webp"
                            alt="Error Image"
                            className="error-image"
                            width={600}
                            height={600}
                        />
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md mt-3"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .funny-image-container {
                    animation: explode 1s forwards;
                }

                .error-image {
                    opacity: 100;
                }

                @keyframes explode {
                    0% {
                        transform: scale(10);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    )
}

function GodModeButton() {
    const [isOpen, setIsOpen] = useState(false)
    const lotteryAddress = useContractAddress()

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
        setIsOpen(true)
    }

    const handleNewErrorNotification = function (message: string) {
        dispatch({
            type: "error",
            title: "Transaction Reverted",
            message: message,
            position: "topR",
        })
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            {lotteryAddress ? (
                <div className="btn-shape  p-1 flex absolute top-[160px] text-[20px] ml-12 bg-red-800">
                    <button
                        onClick={async function () {
                            await godMode({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                                onError: (error: any) => handleError(error),
                            })
                        }}
                    >
                        GodMode
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            <FunnyImageModal isOpen={isOpen} closeModal={closeModal} />
        </div>
    )
}

export default GodModeButton

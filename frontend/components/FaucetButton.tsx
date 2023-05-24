import { useLotteryState } from "../hooks/useLotteryState"
import { useState } from "react"
import Image from "next/image"

function FunnyImageModal() {
    const [isOpen, setIsOpen] = useState(false)
    const lotteryId = useLotteryState()

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            {lotteryId ? (<div className="">
                <div className="text-white absolute bottom-11 right-[30px] mb-[20px]">
                    GET SOME ETH
                </div>
                <button
                    className="btn-shape text-white bg-slate-600 p-3 absolute bottom-1 right-11"
                    onClick={openModal}
                >
                    FAUCET
                </button>
            </div>):(<div>aa</div>)}
            

            

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-5 rounded-md funny-image-container">
                        <Image src="/meme.jpeg" alt="Funny Image" className="funny-image" />
                        <button
                            className="text-white bg-red-500 px-3 py-1 rounded-md mt-3"
                            onClick={closeModal}
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .funny-image-container {
                    animation: explode 1s forwards;
                }

                .funny-image {
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
        </div>
    )
}

export default FunnyImageModal

import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { BigNumber } from "ethers"
import { useNotification } from "web3uikit"
import { useContractAddress } from "@/hooks/useContractAddress"

function GetPlayer() {
    const lotteryAddress = useContractAddress()

    const [lotteryId, setLotteryId] = useState<string>("")
    const [ticketId, setTicketId] = useState<string>("")

    const [playerAddress, setPlayerAddress] = useState<string>("")

    const dispatch = useNotification()

    const { runContractFunction: getPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getPlayer",
        params: { _lotteryId: lotteryId, _ticketId: ticketId },
    })

    async function getPlayerAddressesFromContract() {
        const address = await getPlayer()
        if (address !== undefined) {
            const getPlayerAddressFromCall = (address as BigNumber).toString()
            setPlayerAddress(getPlayerAddressFromCall)
        } else {
            console.log("player is not enrolled")
            handleNewErrorNotification("There is no player. Try again.")
        }
    }

    const handleLotteryIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLotteryId(e.target.value)
    }

    const handleTicketIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTicketId(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        getPlayerAddressesFromContract()
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
        <div className="text-white">
            <form onSubmit={handleSubmit}>
                <ul>
                    <label>
                        Enter the lottery ID:
                        <input type="text" value={lotteryId} onChange={handleLotteryIdInput} />
                    </label>
                </ul>
                <ul>
                    <label>
                        Enter the ticket ID:
                        <input type="text" value={ticketId} onChange={handleTicketIdInput} />
                    </label>
                </ul>

                <input className="button" type="submit" value="Submit" />
            </form>

            {playerAddress && (
                <p>
                    Lottery ID: {lotteryId} Ticket ID: {ticketId} Player address: {playerAddress}
                </p>
            )}
        </div>
    )
}

export default GetPlayer

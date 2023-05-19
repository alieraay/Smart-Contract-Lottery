import { abi, contractAddresses } from "@/constants"
import { MoralisProvider, useMoralis, useWeb3Contract } from "react-moralis"
import { BigNumber, ethers, ContractTransaction, Contract } from "ethers"
import { useEffect, useState } from "react"
import { useContractAddress } from "@/hooks/useContractAddress"
import { resolve } from "path"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetRecentWinner() {
    const { isWeb3Enabled, web3 } = useMoralis()
    const lotteryAddress = useContractAddress()
    const [recentWinner, setRecentWinner] = useState("0")
    const [updatedLotteryId, setLotteryId] = useState("0")

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        contractAddress: lotteryAddress!,
        abi: abi,
        functionName: "getRecentWinner",
        params: {},
    })

    const {runContractFunction: getLotteryId} = useWeb3Contract({
        contractAddress: lotteryAddress!,
        abi: abi,
        functionName: "getLotteryId",
        params: {},

    })

    async function getRecentWinnerFromContract() {
        const winner = await getRecentWinner()
        const getLotteryIdFromContract = (await getLotteryId() as BigNumber).toString()

        if (winner !== null) {
            const winnerFromCall = (winner as string)
            setRecentWinner(winnerFromCall)
            setLotteryId(getLotteryIdFromContract)
            console.log("WINNER FROM cont.:", winnerFromCall)
            console.log("LOTTERY ID FROM cont.:", winnerFromCall)

        } else {
            console.log("The winner has not been selected yet")
        }
    }

    useEffect(() => {
        if (!isWeb3Enabled && !lotteryAddress) return
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)
        getRecentWinnerFromContract()
        const listener = (winner: string,lotteryId:BigNumber,ticketId:BigNumber ) => {
            console.log(winner)
            setRecentWinner(winner)
            console.log(lotteryId)
            setLotteryId(lotteryId.toString())
        }
        contract.on("WinnerSelected", listener)
        return () => {
            contract.off("WinnerSelected", listener)
        }
        
    }, [isWeb3Enabled])

    return <div>Recent Winner {recentWinner} Active Lottery Id: {updatedLotteryId}</div>
}

export default GetRecentWinner 

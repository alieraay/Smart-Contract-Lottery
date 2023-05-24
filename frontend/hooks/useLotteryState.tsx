// hooks/useLotteryState.js
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { useContractAddress } from "../hooks/useContractAddress"
import { abi } from "../constants"
import { useWeb3Contract } from "react-moralis"
import { BigNumber } from "ethers"

export function useLotteryState() {
    const { isWeb3Enabled } = useMoralis()
    const lotteryAddress = useContractAddress()
    const [lotteryId, setLotteryId] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [numPlayer, setGetNumberOfPlayer] = useState("0")

    const { runContractFunction: getLotteryId } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getLotteryId",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        contractAddress: lotteryAddress!,
        abi: abi,
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getNumberOfPlayer",
        params: {},
    })

    async function getLotteryIdFromContract() {
        const lotteryId = await getLotteryId()
        if (lotteryId !== undefined) {
            const lotteryIdFromCall = ((await getLotteryId()) as BigNumber).toString()
            setLotteryId(lotteryIdFromCall)
        } else {
            console.log("lottery undefined")
        }
    }

    async function getRecentWinnerFromContract() {
        const winner = await getRecentWinner()
        if (winner !== undefined) {
            const winnerFromCall = ((await getRecentWinner()) as BigNumber).toString()
            setRecentWinner(winnerFromCall)
        } else {
            console.log("winner undefined")
        }
    }
    async function getNumPlayersFromContract() {
        const numPlayer = await getNumberOfPlayer()
        if (numPlayer !== undefined) {
            const numPlayerFromCall = ((await getNumberOfPlayer()) as BigNumber).toString()
            setGetNumberOfPlayer(numPlayerFromCall)
        } else {
            console.log("Player undefined")
        }
    }

    useEffect(() => {
        console.log("hi")
        if (!isWeb3Enabled) return
        console.log("içeri")
        const provider = new ethers.providers.JsonRpcProvider("https://goerli.rpc.thirdweb.com")
        let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)

        getLotteryIdFromContract()
        getRecentWinnerFromContract()
        getNumPlayersFromContract()

        const winnerListener = (winner: string, lotteryId: BigNumber, ticketId: BigNumber) => {
            setLotteryId(lotteryId.toString())
            setRecentWinner(winner)
            setGetNumberOfPlayer(ticketId.toString())
            console.log("winner fonk")
        }

        const enterListener = (candidate: string, ticketIdCounter: BigNumber) => {
            setGetNumberOfPlayer(ticketIdCounter.toString())
            console.log("enter fonk")
        }

        contract.on("WinnerSelected", winnerListener)
        contract.on("LotteryEnter", enterListener)

        return () => {
            contract.off("WinnerSelected", winnerListener)
            contract.off("LotteryEnter", enterListener)
        }
    }, [isWeb3Enabled])

    return { lotteryId, recentWinner, numPlayer }
}

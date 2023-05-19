// hooks/useLotteryState.js
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import { useContractAddress } from '@/hooks/useContractAddress'
import { abi } from '@/constants'
import { useWeb3Contract } from 'react-moralis'
import { BigNumber } from 'ethers'

export function useLotteryState() {
  const { isWeb3Enabled } = useMoralis()
  const lotteryAddress = useContractAddress()
  const [lotteryId, setLotteryId] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")
  const [numPlayer, setGetNumberOfPlayer] = useState("0")

  const { runContractFunction: getLotteryId } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress!,
    functionName: 'getLotteryId',
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    contractAddress: lotteryAddress!,
    abi: abi,
    functionName: 'getRecentWinner',
    params: {},
  })

  const { runContractFunction: getNumberOfPlayer } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress!,
    functionName: 'getNumberOfPlayer',
    params: {},
  })

  async function fetchState() {
    const [lotteryIdFromCall, winner, number] = await Promise.all([
      getLotteryId(),
      getRecentWinner(),
      getNumberOfPlayer(),

    ])

    if (lotteryIdFromCall) {
      setLotteryId((lotteryIdFromCall as BigNumber).toString())
      console.log("fetch1")
    }

    if (winner) {
      setRecentWinner((winner as string).toString())
      console.log("fetch2")
    }

    if (number) {
      setGetNumberOfPlayer((number as BigNumber).toString())
      console.log("fetch3")

    }
  }

  useEffect(() => {
    console.log("hi")
    if (!isWeb3Enabled) return
    console.log("içeri")
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')
    let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)

    fetchState()

    const winnerListener = (winner: string, lotteryId: BigNumber, ticketId: BigNumber) => {
      setLotteryId(lotteryId.toString())
      setRecentWinner(winner.toString())
      setGetNumberOfPlayer(ticketId.toString())
      console.log("winner fonk")
    }

    const enterListener = (candidate: string, ticketIdCounter: BigNumber) => {
      setGetNumberOfPlayer(ticketIdCounter.toString())
      console.log("enter fonk")
    }

    contract.on('WinnerSelected', winnerListener)
    contract.on('LotteryEnter', enterListener)

    return () => {
      contract.off('WinnerSelected', winnerListener)
      contract.off('LotteryEnter', enterListener)
      console.log("abov")
    }
  }, [isWeb3Enabled])

  return { lotteryId, recentWinner, numPlayer }
}

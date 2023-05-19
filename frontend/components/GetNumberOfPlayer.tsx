import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { useContractAddress } from "@/hooks/useContractAddress"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetNumberOfPlayer() {
    const { isWeb3Enabled } = useMoralis()

    const lotteryAddress = useContractAddress()
    const [numPlayer, setGetNumberOfPlayer] = useState("0")

    const { runContractFunction: getNumberOfPlayer } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getNumberOfPlayer",
        params: {},
    })

    async function getNumPlayerFromContract() {
        const number = await getNumberOfPlayer()
        const getNumberOfPlayerFromCall = (number as BigNumber).toString()
        setGetNumberOfPlayer(getNumberOfPlayerFromCall)
    }

    useEffect(() => {
        if (!isWeb3Enabled && !lotteryAddress) return
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)

        const listenWinner = (winner: string, lotteryId: BigNumber, ticketId: BigNumber) => {
            console.log(ticketId.toString())
            setGetNumberOfPlayer(ticketId.toString())
        }
        contract.on("LotteryEnter", listenWinner)
        return () => {
            contract.off("LotteryEnter", listenWinner)
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (!isWeb3Enabled && !lotteryAddress) return
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)

        const listenEntrance = (candidate: string, ticketIdCounter: BigNumber) => {
            console.log("Entered", ticketIdCounter.toString())
            setGetNumberOfPlayer(ticketIdCounter.toString())
        }

        contract.on("LotteryEnter", listenEntrance)
        return () => {
            contract.off("LotteryEnter", listenEntrance)
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx: ContractTransaction) {
        await tx.wait(1)
        getNumPlayerFromContract()
    }

    return (
        <div>
            NUMBER OF PLAYERS
            {lotteryAddress ? (
                <div>{numPlayer}</div>
            ) : (
                <div>Lottery Address couldn't detected</div>
            )}
        </div>
    )
}

export default GetNumberOfPlayer

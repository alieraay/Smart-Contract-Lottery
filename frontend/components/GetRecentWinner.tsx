import { abi, contractAddresses } from "@/constants"
import { MoralisProvider, useMoralis, useWeb3Contract } from "react-moralis"
import { BigNumber, ethers, ContractTransaction, Contract } from "ethers"
import { useEffect, useState } from "react"
import { useContractAddress } from "@/hooks/useContractAddress"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetRecentWinner() {
    const { isWeb3Enabled, web3 } = useMoralis()
    const lotteryAddress = useContractAddress()
    const [recentWinner, setRecentWinner] = useState("0")

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        contractAddress: lotteryAddress!,
        abi: abi,
        functionName: "getRecentWinner",
        params: {},
    })
    async function getRecentWinnerFromContract() {
        const winner = await getRecentWinner()

        if (winner !== null) {
            const winnerFromCall = (winner as BigNumber).toString()
            setRecentWinner(winnerFromCall)
        } else {
            console.log("The winner has not been selected yet")
        }
    }

    const checkEvents = async function () {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        let a = new ethers.Contract(lotteryAddress!, abi as any, provider)
        a.on("WinnerSelected", async() => {
            getRecentWinnerFromContract()
            console.log("WinnerSelected event emited")
            console.log(recentWinner)
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getRecentWinnerFromContract()
            checkEvents()
        }
    }, [isWeb3Enabled])

    return <div>Recent Winner {recentWinner}</div>
}

export default GetRecentWinner

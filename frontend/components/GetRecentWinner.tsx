import { abi, contractAddresses } from "@/constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { useEffect, useState } from "react"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetRecentWinner() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
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

    useEffect(() => {
        if (isWeb3Enabled) {
            getRecentWinnerFromContract()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Recent Winner {recentWinner}
        </div>
    )
}

export default GetRecentWinner

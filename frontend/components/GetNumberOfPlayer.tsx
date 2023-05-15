import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetNumberOfPlayer() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
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
        if (isWeb3Enabled) {
            getNumPlayerFromContract()
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
                <div>
                  {numPlayer}
                </div>
            ) : (
                <div>Lottery Address couldn't detected</div>
            )}
        </div>
    )
}

export default GetNumberOfPlayer

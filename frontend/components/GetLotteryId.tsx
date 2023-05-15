import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetLotteryId() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
    const [lotteryId, setLotteryId] = useState("0")

    const { runContractFunction: getLotteryId } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getLotteryId",
        params: {},
    })

    async function getLotteryIdFromContract() {
        const id = await getLotteryId()

        const lotteryIdFromCall = ((await getLotteryId()) as Number).toString()
        setLotteryId(lotteryIdFromCall)
    }

    const handleSuccess = async function (tx: ContractTransaction) {
        await tx.wait(1)
        getLotteryIdFromContract()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getLotteryIdFromContract()
        }
    }, [isWeb3Enabled])

    return <div>Active Lottery ID: {lotteryId}</div>
}

export default GetLotteryId

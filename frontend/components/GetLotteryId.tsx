import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { useContractAddress } from "@/hooks/useContractAddress"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetLotteryId() {
    const{isWeb3Enabled} = useMoralis()
    const lotteryAddress = useContractAddress()
    const [lotteryId, setLotteryId] = useState("0")

    const { runContractFunction: getLotteryId } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getLotteryId",
        params: {},
    })

    async function getLotteryIdFromContract() {
        const lotteryIdFromCall = ((await getLotteryId()) as BigNumber).toString()
        console.log("getLotteryFromContract: ", lotteryIdFromCall)
        setLotteryId(lotteryIdFromCall)

    }

    const checkEvents = async function() {
        const provider =  new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        let a = new ethers.Contract(lotteryAddress!, abi as any, provider);
        a.on("WinnerSelected",async()=>{

            getLotteryIdFromContract()


            console.log("WinnerSelected next lotteryID")
            console.log(lotteryId)

        })
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            getLotteryIdFromContract()
            checkEvents()
        }
    }, [isWeb3Enabled])

    return <div>Active Lottery ID: {lotteryId}</div>
}

export default GetLotteryId

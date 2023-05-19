import { contractAddresses, abi } from "@/constants"
import { useContractAddress } from "@/hooks/useContractAddress"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import {BigNumber} from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetInterval() {
    const lotteryAddress = useContractAddress()
    const {isWeb3Enabled} = useMoralis()
    const [interval,setInterval] = useState("0")
    
    const {runContractFunction:getInterval} = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getInterval",
        params:{},
    })

    async function getIntervalFromContract() {
        const result = await getInterval()
        const intervalFromCall = (result as BigNumber).toString()
        setInterval(intervalFromCall)
        console.log(intervalFromCall)
    }

    useEffect(() =>{
        if(!isWeb3Enabled) return
            getIntervalFromContract()

    },[isWeb3Enabled])

    return(
        <div>
            Lottery Time is {interval}
        </div>
    )
}

export default GetInterval

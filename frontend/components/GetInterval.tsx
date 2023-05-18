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
        const intervalFromCall = (await getInterval() as BigNumber).toString()
        setInterval(intervalFromCall)
    }

    useEffect(() =>{
        if(isWeb3Enabled){
            getIntervalFromContract()
        }
    },[isWeb3Enabled])

    return(
        <div>
            Lottery Time is {interval}
        </div>
    )
}

export default GetInterval

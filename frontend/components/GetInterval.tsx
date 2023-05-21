import { contractAddresses, abi } from "@/constants"
import { useContractAddress } from "@/hooks/useContractAddress"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { BigNumber } from "ethers"

function GetInterval() {
    const lotteryAddress = useContractAddress()
    const { isWeb3Enabled } = useMoralis()
    const [interval, setInterval] = useState("0")

    const { runContractFunction: getInterval } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getInterval",
        params: {},
    })

    async function getIntervalFromContract() {
        const result = await getInterval()
        if (result !== undefined) {
            const entryPriceFromCall = (result as BigNumber).toString()
            setInterval(entryPriceFromCall)
        } else {
            console.log("interval undefined")
        }
    }

    useEffect(() => {
        if (!isWeb3Enabled) return
        getIntervalFromContract()
    }, [isWeb3Enabled])

    return <div className="text-white text-right mr-14 mt-3">Lottery Time : {interval} seconds</div>
}

export default GetInterval

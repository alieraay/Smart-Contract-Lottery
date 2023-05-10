import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

function LotteryEntrance() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "enterLottery",
        params: {},
        msgValue: 1,
    })

    const { runContractFunction: getEntryPrice } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getEntryPrice",
        params: {},
    })

    async function f() {
        const price = await getEntryPrice()
        if (price !== undefined){
            const entryPrice = ((await getEntryPrice()) as BigNumber).toString()
            console.log(entryPrice," is entry price")

        }
        else{
            console.log("price undefined")
        }
       
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            f()
        }
    }, [isWeb3Enabled])

    return <div>Hi from lottery</div>
}

export default LotteryEntrance

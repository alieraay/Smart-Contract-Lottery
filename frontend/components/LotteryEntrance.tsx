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
    const [entryPrice, setEntryPrice] = useState("0")

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "enterLottery",
        params: {},
        msgValue: entryPrice,
    })

    const { runContractFunction: getEntryPrice } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getEntryPrice",
        params: {},
    })
    async function getEntryPriceFromContract() {
        const price = await getEntryPrice()
        if (price !== undefined) {
            const entryPriceFromCall = ((await getEntryPrice()) as BigNumber).toString()
            setEntryPrice(entryPriceFromCall)
        } else {
            console.log("price undefined")
        }
    }


    useEffect(() => {
        if (isWeb3Enabled) {
            getEntryPriceFromContract()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Hi from lottery Entrance
            {lotteryAddress ? (
                <div>
                    <button onClick={async function (){enterLottery()}}>Enter Lottery</button>
                    Entry Price is {ethers.utils.formatUnits(entryPrice)} ETH
                </div>
            ) : (
                <div>Lottery Address couldn't detected</div>
            )}
        </div>
    )
}

export default LotteryEntrance

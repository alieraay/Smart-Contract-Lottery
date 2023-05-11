import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"

interface contractAddressesInterface {
    [key: string]: string[]
}

function GetYourId() {
    const addresses: contractAddressesInterface = contractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null
    const [yourId, setYourId] = useState("0")
    const { runContractFunction: getYourId } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress!,
        functionName: "getYourId",
        params: {},
    })

    async function getYourIdFromContract() {
        const yourId = await getYourId()
        if (yourId != undefined) {
            const yourIdFromContract = (await getYourId() as BigNumber).toString()
            setYourId(yourIdFromContract)
            console.log(yourIdFromContract, "2")
        }
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            getYourIdFromContract()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            
            <button>Get Your Id</button>
            Your Ticket Number is {yourId}
        </div>
    )
}

export default GetYourId

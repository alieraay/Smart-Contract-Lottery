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
        const id = await getYourId()

        if (id !== undefined) {
            const yourIdFromCall = ((await getYourId()) as BigNumber).toString()
            setYourId(yourIdFromCall)
        } else{
            setYourId("undefined")
        }
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            getYourIdFromContract()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            { yourId!="undefined" ? 
            <div> Your ticket id is {yourId}</div> 
            : <div> You have not entered the lotteryhh</div> 
                
            }
        </div>
    )
}

export default GetYourId

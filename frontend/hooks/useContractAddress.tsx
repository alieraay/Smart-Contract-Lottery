import { useMoralis } from "react-moralis"
import { contractAddresses } from "../constants"

interface contractAddressesInterface {
    [key: string]: string[]
}

export function useContractAddress() {
    const { chainId: chainIdHex} = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const addresses: contractAddressesInterface = contractAddresses
    const lotteryAddress = chainId in addresses ? addresses[chainId][0] : null

    return lotteryAddress
}

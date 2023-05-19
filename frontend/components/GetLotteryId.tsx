// import { useWeb3Contract } from "react-moralis"
// import { abi, contractAddresses } from "../constants"
// import { useMoralis } from "react-moralis"
// import { useEffect, useState } from "react"
// import { BigNumber, ethers, ContractTransaction } from "ethers"
// import { useContractAddress } from "@/hooks/useContractAddress"

// interface contractAddressesInterface {
//     [key: string]: string[]
// }

// function GetLotteryId() {
//     const { isWeb3Enabled } = useMoralis()
//     const lotteryAddress = useContractAddress()
//     const [updatedLotteryId, setLotteryId] = useState("0")

//     const { runContractFunction: getLotteryId } = useWeb3Contract({
//         abi: abi,
//         contractAddress: lotteryAddress!,
//         functionName: "getLotteryId",
//         params: {},
//     })

//     async function getLotteryIdFromContract() {
//         const lotteryIdFromCall = ((await getLotteryId()) as BigNumber).toString()
//         setLotteryId(lotteryIdFromCall)
//         console.log("getLotteryFromContract: ", lotteryIdFromCall)
//     }

//     useEffect(() => {
//         if (!isWeb3Enabled) return
//         const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
//         let contract = new ethers.Contract(lotteryAddress!, abi as any, provider)
//         getLotteryIdFromContract()
//         const listener = (winner: string, lotteryId: BigNumber) => {
//             console.log("Updated Lottery Id: ", lotteryId)
//             setLotteryId(lotteryId.toString())
//         }
//         contract.on("WinnerSelected", listener)
//         return () => {
//             contract.off("WinnerSelected", listener)
//         }
//     }, [isWeb3Enabled])

//     return <div>Active Lottery ID: {updatedLotteryId}</div>
// }

// export default GetLotteryId

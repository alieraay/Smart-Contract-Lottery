
// It doesn't work right now

// import React, { useState, useEffect } from "react"
// import { useMoralis, useWeb3Contract } from "react-moralis"
// import { contractAddresses, abi } from "@/constants"
// import { useContractAddress } from "@/hooks/useContractAddress"
// import { ethers } from "ethers"
// import { Contract } from "ethers"

// function Countdown() {
//     const { web3, isWeb3Enabled } = useMoralis()
//     const lotteryAddress = useContractAddress()
//     const [secondsLeft, setSecondsLeft] = useState(0) // Seconds left for countdown

//     const { runContractFunction: getInterval } = useWeb3Contract({
//         abi: abi,
//         contractAddress: lotteryAddress!,
//         functionName: "getInterval",
//         params: {},
//     })

//     const { runContractFunction: getLastTimeStamp } = useWeb3Contract({
//         abi: abi,
//         contractAddress: lotteryAddress!,
//         functionName: "getLatestTimeStamp",
//         params: {},
//     })

//     // Fetch interval and last timestamp from contract when component mounts
//     useEffect(() => {
//         if (isWeb3Enabled) {
//             Promise.all([getInterval(), getLastTimeStamp()]).then(
//                 ([intervalFromContract, lastTimeStamp]: any[]) => {
//                     // Assuming intervalFromContract and lastTimeStamp are BigNumbers
//                     const intervalNumber = Number(
//                         ethers.utils.formatUnits(intervalFromContract, 0)
//                     )
//                     const lastTimeStampNumber = Number(ethers.utils.formatUnits(lastTimeStamp, 0))

//                     const currentTime = Math.floor(Date.now() / 1000)
//                     const timeElapsed = currentTime - lastTimeStampNumber
//                     const timeLeft = intervalNumber - timeElapsed

//                     setSecondsLeft(timeLeft > 0 ? timeLeft : 0)
//                 }
//             )
//         }
//     }, [isWeb3Enabled])

//     // Countdown logic
//     useEffect(() => {
//         if (secondsLeft > 0) {
//             const timerId = setTimeout(() => {
//                 setSecondsLeft(secondsLeft - 1)
//             }, 1000)
//             return () => clearTimeout(timerId) // Cleanup timer when component unmounts or re-renders
//         }
//     }, [secondsLeft])

//     // Listen to WinnerSelected event and reset countdown
//     useEffect(() => {
//         if (isWeb3Enabled && web3) {
//             const provider = new ethers.providers.Web3Provider(web3);
//             const contract = new ethers.Contract(lotteryAddress!, abi as any, provider.getSigner());
    
//             contract.once("WinnerSelected", () => {
//                 // Reset secondsLeft when a winner is selected
//                 setSecondsLeft(0);
//             });
//         }
//     }, [isWeb3Enabled, web3, lotteryAddress]);
//     return <div>Seconds left: {secondsLeft}</div>
// }

// export default Countdown

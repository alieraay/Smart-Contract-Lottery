// components/GetRecentWinner.js
import { useLotteryState } from "../hooks/useLotteryState"

function GetRecentWinner() {
    const { recentWinner } = useLotteryState()
    const {winnerTransactionHash} = useLotteryState()

    const winnerAddressLink = `https://goerli.etherscan.io/address/${recentWinner}`
    const winnerTxLink = `https://goerli.etherscan.io/tx/${winnerTransactionHash}`

    console.log(winnerTransactionHash)
    return (
        <div className="text-white text-[20px] justify-center flex ">
        
            <a className="hover:bg-red-300" href={winnerTxLink} target="_blank" rel="noopener noreferrer">Last Winner: {recentWinner}</a>
        </div>
    )
}
export default GetRecentWinner

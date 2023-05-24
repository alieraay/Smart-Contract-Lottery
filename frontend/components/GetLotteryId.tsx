// components/GetRecentWinner.js
import { useLotteryState } from "../hooks/useLotteryState"

function GetRecentWinner() {
    const { lotteryId } = useLotteryState()

    return <div className="text-white text-center mt-5 text-[30px]
    "> Active Lottery ID: {lotteryId}</div>
}

export default GetRecentWinner

// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"

function GetRecentWinner() {
    const { lotteryId } = useLotteryState()

    return <div> Active Lottery ID: {lotteryId}</div>
}

export default GetRecentWinner

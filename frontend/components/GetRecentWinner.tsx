// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"

function GetRecentWinner() {
    const { recentWinner } = useLotteryState()

    return <div>Recent Winner: {recentWinner} </div>
}

export default GetRecentWinner

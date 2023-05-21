// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"

function GetRecentWinner() {
    const { recentWinner } = useLotteryState()

    return <div className="text-white text-[20px] ml-5">Recent Winner: {recentWinner} </div>
}

export default GetRecentWinner

// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"

function GetRecentWinner() {
    const { recentWinner } = useLotteryState()

    return (<div className="text-white text-[20px] absolute bottom-1 left-2">Last Winner: {recentWinner} </div>)
}
export default GetRecentWinner

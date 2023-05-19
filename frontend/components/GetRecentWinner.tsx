// components/GetRecentWinner.js
import {useLotteryState} from '@/hooks/useLotteryState'

function GetRecentWinner() {
  const { lotteryId, recentWinner } = useLotteryState()

  return <div>Recent Winner: {recentWinner} Active Lottery ID: {lotteryId}</div>
}

export default GetRecentWinner

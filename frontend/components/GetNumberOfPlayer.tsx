// components/GetNumberOfPlayer.js
import {useLotteryState} from '@/hooks/useLotteryState'

function GetNumberOfPlayer() {
  const { numPlayer } = useLotteryState()

  return <div>Number of Players: {numPlayer}</div>
}

export default GetNumberOfPlayer

// components/GetNumberOfPlayer.js
import { useLotteryState } from "@/hooks/useLotteryState"

function GetNumberOfPlayer() {
    const { numPlayer } = useLotteryState()

    return <div className="text-white text-center text-[30px]">Number of Players: {numPlayer}</div>
}

export default GetNumberOfPlayer

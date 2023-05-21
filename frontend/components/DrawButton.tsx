// components/GetRecentWinner.js
import { useLotteryState } from "@/hooks/useLotteryState"

function DrawButton() {
    return (
        <div className="text-center">
            <button className="btn-shape text-white bg-slate-600 p-3  mt-5 ">DRAW</button>
        </div>
    )
}

export default DrawButton

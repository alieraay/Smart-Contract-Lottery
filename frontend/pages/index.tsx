import Head from "next/head"

import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
import GetYourId from "../components/GetYourId"
import GetLotteryId from "../components/GetLotteryId"
import { NotificationProvider } from "web3uikit"
import GetNumberOfPlayer from "../components/GetNumberOfPlayer"
import GetRecentWinner from "../components/GetRecentWinner"
import GetInterval from "../components/GetInterval"
import FaucetButton from "../components/FaucetButton"
import GodModeButton from "../components/GodModeButton"
import DrawButton from "../components/DrawButton"

export default function Home() {
    return (
        <div className="bg-[#150D25] min-h-screen min-w-fit">
            <NotificationProvider>
                <Head>
                    <title>Smart Contract Lottery</title>
                    <meta name="description" content="Our Lottery" />
                    <link rel="icon" href="../app/favicon.ico" />
                </Head>
                <Header />
                <GetRecentWinner />

                <div className="flex justify-between">
                    <div className="flex items-center">
                        <GodModeButton />
                        <FaucetButton />
                    </div>

                    <GetInterval />
                </div>
                <GetLotteryId />
                <GetNumberOfPlayer />
                <div className=" justify-center items-center">
                    <LotteryEntrance />

                    <div className="ml-4"></div>
                </div>

                <GetYourId />

                <DrawButton></DrawButton>
            </NotificationProvider>
        </div>
    )
}
export { Header }

import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader"
import Header from "@/components/Header"
import LotteryEntrance from "@/components/LotteryEntrance"
import GetYourId from "@/components/GetYourId"
import GetLotteryId from "@/components/GetLotteryId"
import { NotificationProvider } from "web3uikit"
import GetPlayer from "@/components/GetPlayer"
import GetNumberOfPlayer from "@/components/GetNumberOfPlayer"
import GetRecentWinner from "@/components/GetRecentWinner"
import GetInterval from "@/components/GetInterval"
import FaucetButton from "@/components/FaucetButton"
import GodModeButton from "@/components/GodModeButton"
import DrawButton from "@/components/DrawButton"
// import Countdown from "@/components/Countdown"

export default function Home() {
    return (
        <div className="bg-[#150D25]">
            <NotificationProvider>
                <Head>
                    <title>Smart Contract Lottery</title>
                    <meta name="description" content="Our Lottery" />
                    <link rel="icon" href="../app/favicon.ico" />
                </Head>
                <Header />
                <div className="flex justify-between">
                    <GodModeButton />
                    <GetInterval />
                </div>
                <GetLotteryId />
                <GetNumberOfPlayer />
                <div className="flex justify-center items-center">
                    <LotteryEntrance />
                </div>

                <GetYourId />

                <DrawButton></DrawButton>

                <div className="flex justify-between ">
                    <GetRecentWinner />
                    <FaucetButton />
                </div>
            </NotificationProvider>
        </div>
    )
}
export { Header }

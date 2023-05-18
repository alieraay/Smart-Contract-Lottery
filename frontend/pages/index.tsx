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
// import Countdown from "@/components/Countdown"

export default function Home() {
    return (
        <div className={styles.container}>
            <NotificationProvider>
                <Head>
                    <title>Smart Contract Lottery</title>
                    <meta name="description" content="Our Lottery" />
                    <link rel="icon" href="../app/favicon.ico" />
                </Head>
                <Header />
                <GetInterval/>
                <LotteryEntrance />
                <GetLotteryId />
                <GetPlayer />
                <GetNumberOfPlayer />
                <GetRecentWinner />

                <GetYourId />
                
            </NotificationProvider>
            Hi!
        </div>
    )
}
export { Header }

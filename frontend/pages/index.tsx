import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader"
import Header from "@/components/Header"
import LotteryEntrance from "@/components/LotteryEntrance"
import GetYourId from "@/components/GetYourId"
import { NotificationProvider } from "web3uikit"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Lottery" />
                <link rel="icon" href="../app/favicon.ico" />
            </Head>
            <Header />
            <NotificationProvider>
                <LotteryEntrance />
            </NotificationProvider>
            <GetYourId />
            Hi!
        </div>
    )
}
export { Header }
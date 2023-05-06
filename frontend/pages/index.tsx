import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/ManualHeader"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return(
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Lottery"/>
                <link rel="icon" href="../app/favicon.ico" />
            </Head>
            <ManualHeader/>
            Hi!
        </div>
    )
}
export {
    Header
}
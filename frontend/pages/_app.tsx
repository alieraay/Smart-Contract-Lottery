// _app.tsx dosyası

import "../styles/global.css"
import type { AppProps } from "next/app"
import { MoralisProvider, useMoralis } from "react-moralis"
import React from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const { isWeb3Enabled } = useMoralis()

  if (!isWeb3Enabled) {
    return <div>You are not connected to the network. Please connect to the Goerli network.</div>
  }

  return (
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp

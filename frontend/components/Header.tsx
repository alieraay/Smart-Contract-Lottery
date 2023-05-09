import { ConnectButton } from "web3uikit"

function Header() {
    return (
        <div>
            Decentralized Lottery
            {/* moralisAuth is used for connection to the server but we don't need it now*/}
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header

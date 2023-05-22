import { ConnectButton } from "web3uikit"

function Header() {
    return (
        <div className="p-5  flex flex-row  ">
            <h1 className="font-bold p-2 text-[60px]  bg-[#EAABEB] bg-clip-text text-transparent absolute left-[430px] ">DECENTRALIZED LOTTERY</h1>
            {/* moralisAuth is used for connection to the server but we don't need it now*/}
            <div className=" p-4 hover:bg-black my-5  ml-auto">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

export default Header

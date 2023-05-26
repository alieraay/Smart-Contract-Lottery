import { ConnectButton } from "web3uikit"

function Header() {
    return (
        <div className="p-5  flex flex-col items-center  md:justify-between  ">
            <h1 className="font-bold p-2 text-[60px] bg-[#EAABEB] bg-clip-text text-transparent row-auto ">DECENTRALIZED LOTTERY</h1>
            <div className=" p-4 hover:bg-black my-5  ml-auto">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

export default Header

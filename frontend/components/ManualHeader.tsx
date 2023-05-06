import {useMoralis} from "react-moralis"

function ManualHeader() {

    const {enableWeb3} = useMoralis()

    return(<div>It is a header</div>)
}

export default ManualHeader
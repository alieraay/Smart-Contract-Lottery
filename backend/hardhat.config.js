require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-contract-sizer")
require("hardhat-gas-reporter")
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY
const GOERLI_URL = process.env.GOERLI_URL
const PRIVATE_KEY_ACCOUNT_2 = process.env.PRIVATE_KEY_ACCOUNT_2

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.18" }],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            accounts: [
                {
                    privateKey: PRIVATE_KEY,
                    balance: "100000000000000000000000",
                },
                {
                    privateKey: PRIVATE_KEY_ACCOUNT_2,
                    balance: "100000000000000000000000",
                }
            ],
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_URL,
            chainId: 5,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report-txt",
        noColors: true,
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
    mocha: {
        timeout: 200000,
    },
}

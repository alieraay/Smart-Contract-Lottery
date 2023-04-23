require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-contract-sizer")
require("hardhat-gas-reporter")
require("dotenv").config();
require("@nomiclabs/hardhat-ethers")


/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const GOERLI_URL = process.env.GOERLI_URL
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY

module.exports = {
  solidity: {
    compilers: [
      {version: "0.8.18"},
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: GOERLI_URL,
      chainId: 5,
      accounts : [PRIVATE_KEY],
      blockConfirmations: 6,
    },
    
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report-txt",
    noColors: true,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

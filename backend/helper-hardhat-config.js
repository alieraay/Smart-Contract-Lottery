const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entryPrice: ethers.utils.parseEther("0.01"),
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "11366",
        requestConfirmation: "3",
        callbackGasLimit: "500000",
        numWords: "1",
        interval: "180"
    },
    31337: {
        name: "localhost",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entryPrice: ethers.utils.parseEther("0.01"),
        keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "1",
        requestConfirmation: "1",
        callbackGasLimit: "500000",
        numWords: "1",
        interval: "5"
    },

}
const developmentChains = ["hardhat","localhost"]

module.exports = {
	networkConfig,
	developmentChains,

}
const {getChainId} = require("hardhat")
const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {network, ethers} = require("hardhat")
const {verify} = require("../utils/verify")
require("dotenv").config();

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("100")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const { deployer} = await getNamedAccounts()
    const chainId =network.config.chainId
    let vrfCoordinatorV2Address
    let _subscriptionId

    if(developmentChains.includes(network.name)){
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait(1)
        _subscriptionId = transactionReceipt.events[0].args.subId 
        await vrfCoordinatorV2Mock.fundSubscription(_subscriptionId, VRF_SUB_FUND_AMOUNT)

    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        _subscriptionId = networkConfig[chainId]["subscriptionId"]

    }

    const entryPrice = networkConfig[chainId]["entryPrice"]
    const keyHash = networkConfig[chainId]["keyHash"]
    const requestConfirmation = networkConfig[chainId]["requestConfirmation"]
    const callbackGasLimit = networkConfig[chainId]["requestConfirmation"]
    const numWords = networkConfig[chainId]["numWords"]
    const interval = networkConfig[chainId]["interval"]

    const args = [vrfCoordinatorV2Address, entryPrice, keyHash, _subscriptionId, requestConfirmation, callbackGasLimit, numWords, interval ]
    const lottery = await deploy("Lottery", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(lottery.address,args)
        log("-------------------------------------------------")
    }
}
module.exports.tags = ["all","lottery"]
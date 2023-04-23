const { assert, expect} = require("chai")
const { ethers, deployments, getNamedAccounts, network} = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")


!developmentChains.includes(network.name)
    ? describe.skip
    :describe("Lottery Contract", async function() {
        let lottery, deployer, user1, vrfCoordinatorV2Mock, lotteryEntryPrice
        lotteryEntryPrice = ethers.utils.parseEther("0.01")
        const chainId = network.config.chainId

        beforeEach(async function(){
            // getSigners() function returns accounts at hardhat.config.js
            // const accounts = await ethers.getSigners()
            // const accountZero = accounts[0]
            deployer = (await getNamedAccounts()).deployer
            accounts = await ethers.getSigners()
            user1 = accounts[1]
            await deployments.fixture(["all"])
            lottery = await ethers.getContract("Lottery",deployer)
            vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
        })
        describe("constructor", async function() {
            it("initializes the lottery correctly", async function() {
                const interval = await lottery.getInterval()
                assert.equal(interval.toString(), networkConfig[chainId]["interval"])
            })
        })
        describe("enterLottery", async function() {
            //const lotteryId = await lottery.lotteryId()
            it("revert if you don't pay enough ", async function() {
                await expect(lottery.enterLottery()).to.be.revertedWith("EnterLottery__NotEnoughEntryPrice")
            })
            it("participate succesfully", async function() {
                expect(await lottery.lotteryIdToCandidates(0,deployer)).to.be.equal(false)
                await lottery.enterLottery({value: lotteryEntryPrice})
                expect(await lottery.lotteryIdToCandidates(0,deployer)).to.be.equal(true)
            })
            it("revert if already participated",async function() {
                await lottery.enterLottery({value: lotteryEntryPrice})
                await expect(lottery.enterLottery({value: lotteryEntryPrice})).to.be.revertedWith("EnterLottery__AlreadyParticipated")
            })
            it("check lotteryToTicketIdToAddress",async function() {
                await lottery.enterLottery({value: lotteryEntryPrice})
                assert.equal(await lottery.lotteryToTicketIdToAddress(0,0),deployer)

            })
            it("check multiple user", async function() {
                await lottery.enterLottery({value: lotteryEntryPrice})
                await lottery.connect(user1).enterLottery({value: lotteryEntryPrice})
                assert.equal(await lottery.lotteryToTicketIdToAddress(0,1),user1.address)
            })
            it("check bonus amount", async function() {
                const startingBalance = await lottery.provider.getBalance(lottery.address)
                const startingDeployerBalance = await lottery.provider.getBalance(deployer)
                await lottery.enterLottery({value: lotteryEntryPrice})
                const afterBalance = await lottery.provider.getBalance(lottery.address)
                const afterDeployerBalance = await lottery.provider.getBalance(deployer)
                assert.equal((startingBalance.add(lotteryEntryPrice)).toString(),afterBalance.toString())
            })
            it("emits event on enter",async function() {
                await expect(lottery.enterLottery({value: lotteryEntryPrice})).to.emit(lottery,"LotteryEnter")
            })
        })
    })
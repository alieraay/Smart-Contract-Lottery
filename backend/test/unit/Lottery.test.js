const { assert, expect} = require("chai")
const { ethers, deployments, getNamedAccounts, network} = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")


!developmentChains.includes(network.name)
    ? describe.skip
    :describe("Lottery Contract", function() {
        let lottery, deployer, user1, vrfCoordinatorV2Mock, lotteryEntryPrice, interval
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
            interval = await lottery.getInterval()

        })
        describe("constructor", function() {
            it("initializes the lottery correctly", async function() {
                const interval = await lottery.getInterval()
                assert.equal(interval.toString(), networkConfig[chainId]["interval"])
            })
        })
        describe("enterLottery", function() {
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
        describe("checkUpkeep", function() {
            it("returns false if pepole haven't sent any ETH", async function() {
                await network.provider.send("evm_increaseTime", [interval.toNumber() +1])
                await network.provider.send("evm_mine",[])
                const {upkeepNeeded} = await lottery.callStatic.checkUpkeep([])
                assert(!upkeepNeeded)
            })
            it("returns false if lottery isn't open", async function() {
                await lottery.enterLottery({value: lotteryEntryPrice})
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                await lottery.performUpkeep([])
                await lottery.godMode()
                const isOpen = await lottery.isContractActive()
                const {upkeepNeeded} = await lottery.callStatic.checkUpkeep([])
                assert.equal(isOpen, false)
                assert.equal(upkeepNeeded,false)
            })
        })
        describe("performUpkeep", function() {
            it("it can only run if checkupkeep is true", async function() {
                await lottery.enterLottery({value: lotteryEntryPrice})
                await network.provider.send("evm_increaseTime",[interval.toNumber() +1])
                await network.provider.send("evm_mine", [])
                const transaction = await lottery.performUpkeep([])
                assert(transaction)
            })
            it("reverts when checkupkeep is false", async function() {
                await expect(lottery.performUpkeep([])).to.be.revertedWith("Lottery__UpkeepNotNeeded")
            })
            it("updates the lottery, emits and eventi and calls the vrf coordinator", async function(){
                await lottery.enterLottery({value: lotteryEntryPrice})
                await network.provider.send("evm_increaseTime",[interval.toNumber() +1])
                await network.provider.send("evm_mine", [])
                const txResponse = await lottery.performUpkeep([])
                const txReceipt = await txResponse.wait(1)
                const requestId = txReceipt.events[1].args.requestId
                assert(requestId.toNumber() > 0)
                
            })
        })
        describe("fullfillRandomWords", function() {
            beforeEach(async function () {
                await lottery.enterLottery({value: lotteryEntryPrice})
                await network.provider.send("evm_increaseTime", [interval.toNumber() +1])
                await network.provider.send("evm_mine",[])
            })
            it("can only be called after performUpkeep",async function() {
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, lottery.address)).to.be.revertedWith("nonexistent request")
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, lottery.address)).to.be.revertedWith("nonexistent request")
            })
            it("picks a winner, reset the lottery, and sends money", async function() {
                const additionalEntrants = 3
                const startingAccountIndex = 1
                const accounts = await ethers.getSigners()
                for( let i = startingAccountIndex; i < startingAccountIndex + additionalEntrants; i++){
                    const accountConnectedLottery = lottery.connect(accounts[i])
                    await accountConnectedLottery.enterLottery({value: lotteryEntryPrice})
                }
                const startingTimeStamp = await lottery.getLatestTimeStamp()

                await new Promise(async (resolve, reject) => {
                    lottery.once("WinnerSelected", async() => {
                        console.log("Found the event")
                        try {
                            
                            const recentWinner = await lottery.getRecentWinner()
                            const endingTimeStamp = await lottery.getLatestTimeStamp()
                            const numPlayers = await lottery.getNumberOfPlayer()
                            const winnerEndingBalance = await accounts[1].getBalance()
                            assert(numPlayers.toString(),"0")
                            assert(endingTimeStamp > startingTimeStamp)
                            assert.equal(
                                winnerEndingBalance.toString(),
                                (winnerStartingBalance.add(
                                    lotteryEntryPrice.mul(additionalEntrants).add(lotteryEntryPrice).toString())))

                        } catch(e) {
                            reject(e)
                        }
                        resolve()
                    })
                    const tx = await lottery.performUpkeep([])
                    const txReceipt = await tx.wait(1)
                    const winnerStartingBalance = await accounts[1].getBalance()
                    await vrfCoordinatorV2Mock.fulfillRandomWords(
                        txReceipt.events[1].args.requestId,
                        lottery.address,
                    )
                })
            })
        })
    })
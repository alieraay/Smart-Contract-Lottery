const { assert, expect} = require("chai")
const { ethers, deployments, getNamedAccounts, network} = require("hardhat") 
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")


developmentChains.includes(network.name)
    ? describe.skip
    :describe("Lottery Contract", function() {
        let lottery, deployer, user1, lotteryEntryPrice

        beforeEach(async function(){
            // getSigners() function returns accounts at hardhat.config.js
            // const accounts = await ethers.getSigners()
            // const accountZero = accounts[0]
            deployer = (await getNamedAccounts()).deployer
            accounts = await ethers.getSigners()
            lottery = await ethers.getContract("Lottery",deployer)
            lotteryEntryPrice = await lottery.getEntryPrice()
        })

        describe("fulfillRandomWords", function () {
            it("keeper, vrf, get a random winner", async function() {
                // enter the lottery
                const startinTimeStamp = await lottery.getLatestTimeStamp()
                const accounts = await ethers.getSigners()

            await new Promise(async (resolve, reject) => {
                // setup listener before we enter lottery
                lottery.once("WinnerSelected", async () => {
                    console.log("WinnerSelected event fired!")
                    try {
                        // add asserts here
                        const recentWinner = await lottery.getRecentWinner()
                        const winnerEndingBalance = await accounts[0].getBalance()
                        const endingTimeStamp = await lottery.getLatestTimeStamp()
                        

                        assert.equal(recentWinner.toString(), accounts[o].address)
                        assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(lotteryEntryPrice).toString())
                        assert(endingTimeStamp > startinTimeStamp)
                        resolve()
                    } catch (error) {
                        console.log(error) 
                        reject(e)
                    }
                })
                // entring lottery
                await lottery.enterLottery({value: lotteryEntryPrice})
                const winnerStartingBalance = await accounts[0].getBalance()
            })    
                // this wont complete until our listener has finished listening!
                 
                

            })
        })
    })
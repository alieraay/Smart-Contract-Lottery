// Rafle

// Enter the lottery (paying some amount)

// Pick a random winner

// Winner to be selected automated

// Chainlil Oracle --> Randomness, Automated Execution

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

error EnterLottery__NotEnoughEntryAmount();
error EnterLottery__AlreadyParticipated();

contract Raffle {

    mapping(uint256 => mapping(address => bool)) public lotteryIdToCandidates;
    mapping(uint256 => mapping(uint256 => address)) public lotteryToTicketIdToAddress;

    // State variables

    uint256 private i_entryAmount;
    uint256 private lotteryId;
    uint256 private bonusAmount;
    uint256 private ticketIdCounter;

    // Events
    event LotteryEnter(address indexed candidate );

    constructor(uint256 entryAmount) {
        i_entryAmount = entryAmount;
    }

    function enterLottery() public payable {
        if(lotteryIdToCandidates[lotteryId][msg.sender] != true){
            revert EnterLottery__AlreadyParticipated();
        }
        if(msg.value != i_entryAmount){
            revert EnterLottery__NotEnoughEntryAmount();
        }
        lotteryIdToCandidates[lotteryId][msg.sender] = true;
        lotteryToTicketIdToAddress[lotteryId][ticketIdCounter] = msg.sender;
        bonusAmount += msg.value;
        ticketIdCounter++;
        emit LotteryEnter(msg.sender);
    }

    function pickRandomWinner() public  returns (address) {
        // We will just get a random number which will be winner tickedId
    }

    function payToWinner() public {
        lotteryId++;
    }
    function getEntryAmount() public view returns(uint256){
        return i_entryAmount;
    }
    function getLotteryId() public view returns(uint256){
        return lotteryId;
    }
    function getPlayer(uint256 _lotteryId, uint256 _ticketId) public view returns(address){
        return lotteryToTicketIdToAddress[_lotteryId][_ticketId];
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Auction {
    address public owner;
    uint public highestBid;
    address public highestBidder;
    bool public isActive;
    mapping(address => uint) public bidders;

    event AuctionStart();
    event HighestBid(address indexed bidder, uint amount);
    event AuctionEnd(address winner, uint amount);

    constructor() {
        owner = msg.sender;
        isActive = true;
        emit AuctionStart();
    }

    function placeBid() external payable {
        require(isActive, "auction has ended");
        require(msg.value > highestBid, "must be higher than current bud");

        bidders[highestBidder] += highestBid;

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit HighestBid(msg.sender, msg.value);
    }

    function endAuction() external {
        require(
            msg.sender == owner,
            "Only the auction owner can end the auction"
        );
        require(isActive, "Auction has already ended");

        isActive = false;

        if (highestBidder != address(0)) {
            payable(owner).transfer(highestBid);
        }

        emit AuctionEnd(highestBidder, highestBid);
    }

    function withdraw() external {
        uint256 amount = bidders[msg.sender];
        require(amount > 0, "insufficient funds");

        bidders[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}

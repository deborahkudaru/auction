import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Auction", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, account1, account2] = await hre.ethers.getSigners();

    const Auction = await hre.ethers.getContractFactory("Auction");
    const auction = await Auction.deploy();

    return { auction, owner, otherAccount, account1, account2 };
  }

  describe("Deployment", function () {
    it("Should set owner of item", async function () {
      const { auction, owner, otherAccount, account1, account2} = await loadFixture(deployOneYearLockFixture);

      const onlyOwner = await auction.owner();
      expect(onlyOwner).to.eq(owner);
    });

    it("Should set highest bid to be zero at first", async function () {
      const { auction, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);

      const bid = await auction.highestBid();
      expect(bid).to.eq(0);
    });


    it("Should place bid corrrectly", async function () {
      const { auction, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const placebid = await auction.placeBid();
      const highest = await auction.highestBid();
      const highestbidder = await auction.highestBidder();


      
    });
  });
});

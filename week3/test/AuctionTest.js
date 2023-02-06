const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");

beforeEach(async function () {
  // create wallets
  [seller, buyer1, buyer2] = await ethers.getSigners();

  // deploy contracts 
  const PennCoin_Fact = await hre.ethers.getContractFactory("PennCoin");
  PennCoin = await PennCoin_Fact.deploy("10000000000000000000000");
  const PennFT_Fact = await hre.ethers.getContractFactory("PennFT");
  PennFT = await PennFT_Fact.deploy("PennFT", "PFT");
  const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";
  tx = await PennFT.functions.mintNFT(seller.getAddress(), TOKEN_URI);
  const PennFT_id = 1;
  const EnglishAuction_Fact = await hre.ethers.getContractFactory("EnglishAuction");
  englishAuction = await EnglishAuction_Fact.deploy(PennFT.address, PennFT_id, PennCoin.address, 5);

  // Set up approvals and balances
  PennFT.connect(seller).approve(englishAuction.address, PennFT_id);
  await assert(PennCoin.connect(seller).transfer(buyer1.address, 100));
  await assert(PennCoin.connect(seller).transfer(buyer2.address, 200));
  // console.log(await PennCoin.balanceOf(buyer1.address));
  // console.log(await PennCoin.balanceOf(buyer2.address));
});


describe("Start the Auction", function () {    
  it("Starting the auction changes the started variable to true", async function () {
    assert(!await englishAuction.started(), "Auction hasn't started yet")
    await englishAuction.connect(seller).start();
    assert(await englishAuction.started(), "Auction has started");
  });
    
  it("Only seller can start the auction", async function () {
    await expect(
      englishAuction.connect(buyer1).start()
    ).to.be.reverted;
  });
});

describe("Make a bid", function () {    
  it("Basic Bid", async function () {
    assert(await englishAuction.highestBidder() == "0x0000000000000000000000000000000000000000", "highest bidder initializes to 0")
    await englishAuction.connect(seller).start();
    await assert(await PennCoin.connect(buyer1).approve(englishAuction.address, 50), "approve should work");
    await englishAuction.connect(buyer1).bid(50);
    assert(await englishAuction.highestBid() == 50, "bid amount is correct");
    assert(await englishAuction.highestBidder() == buyer1.address, "highest bidder changed");
  });
});
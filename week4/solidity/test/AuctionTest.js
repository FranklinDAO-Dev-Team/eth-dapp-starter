const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

beforeEach(async function () {
  // create wallets
  [seller, buyer1, buyer2] = await ethers.getSigners();

  // deploy contracts. Note: constvariable cannot be referenced outside the beforeEach 
  const PennCoin_Fact = await hre.ethers.getContractFactory("PennCoin");
  PennCoin = await PennCoin_Fact.deploy("300");
  const PennFT_Fact = await hre.ethers.getContractFactory("PennFT");
  PennFT = await PennFT_Fact.deploy("PennFT", "PFT");
  const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";
  tx = await PennFT.functions.mintNFT(seller.getAddress(), TOKEN_URI);
  PennFT_id = 1;
  const EnglishAuction_Fact = await hre.ethers.getContractFactory("EnglishAuction");
  englishAuction = await EnglishAuction_Fact.deploy(PennFT.address, PennFT_id, PennCoin.address, 5);

  // Set up approvals and balances
  PennFT.connect(seller).approve(englishAuction.address, PennFT_id);
  await assert(PennCoin.connect(seller).transfer(buyer1.address, 100));
  await assert(PennCoin.connect(seller).transfer(buyer2.address, 200));
});


describe("Test Start()", function () {    
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

describe("Test Bid()", function () {    
  it("Basic Bid", async function () {
    assert(await englishAuction.highestBidder() == "0x0000000000000000000000000000000000000000", "highest bidder initializes to 0")
    await englishAuction.connect(seller).start();
    await PennCoin.connect(buyer1).approve(englishAuction.address, 50);
    await englishAuction.connect(buyer1).bid(50);
    assert(await englishAuction.highestBid() == 50, "bid amount is correct");
    assert(await englishAuction.highestBidder() == buyer1.address, "highest bidder changed");
  });

  it("Should not allow a bidder to bid lower than the highest bid", async function () {
    assert(await englishAuction.highestBidder() == "0x0000000000000000000000000000000000000000", "highest bidder initializes to 0")
    await englishAuction.connect(seller).start();
    await PennCoin.connect(buyer1).approve(englishAuction.address, 50);
    await englishAuction.connect(buyer1).bid(50);
    
    await PennCoin.connect(buyer2).approve(englishAuction.address, 40);
    
    assert(await expect(englishAuction.connect(buyer2).bid(40), "value < highest bid"));
  });

});

describe("Test Withdraw()", function () {    
  it("Basic Withdraw", async function () {
    await englishAuction.connect(seller).start();
    await PennCoin.connect(buyer1).approve(englishAuction.address, 50);
    await englishAuction.connect(buyer1).bid(50);
    await PennCoin.connect(buyer2).approve(englishAuction.address, 100);
    await englishAuction.connect(buyer2).bid(100);
    await englishAuction.connect(buyer1).withdraw();
    assert(await englishAuction.bids(buyer1.address) == 0, "bid set to 0");
    assert(await PennCoin.balanceOf(buyer1.address) == 100, "tokens returned");
  });
});

describe("Test End()", function () {    
  it("Basic End", async function () {
    await englishAuction.connect(seller).start();
    await PennCoin.connect(buyer1).approve(englishAuction.address, 50);
    await englishAuction.connect(buyer1).bid(50);
    await time.increase(600); // advance time by 10 minutes and mine a new block
    await englishAuction.connect(buyer1).end();
    assert(await PennFT.ownerOf(PennFT_id) == buyer1.address, "nft was transfered to winner")
    assert(await PennCoin.balanceOf(buyer1.address) == 50, "Highest Bid transferred to seller");
    assert(await englishAuction.ended(), "auction officially ended")
  });

  it("Loser can withdraw funds after auction ends", async function () {
    await englishAuction.connect(seller).start();
    await PennCoin.connect(buyer1).approve(englishAuction.address, 50);
    await englishAuction.connect(buyer1).bid(50);
    await PennCoin.connect(buyer2).approve(englishAuction.address, 100);
    await englishAuction.connect(buyer2).bid(100);
    await time.increase(600);
    await englishAuction.connect(buyer2).end();
    await englishAuction.connect(buyer1).withdraw();
    assert(await englishAuction.bids(buyer1.address) == 0, "bid set to 0");
    assert(await PennCoin.balanceOf(buyer1.address) == 100, "tokens returned");
  });

  it("No bids occur", async function () {
    await englishAuction.connect(seller).start();
    await time.increase(600);
    await englishAuction.connect(seller).end();
    assert(await PennFT.ownerOf(PennFT_id) == seller.address, "nft was transfered back to seller")
  });
});
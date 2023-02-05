const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");



beforeEach(async function () {
  [seller, buyer1, buyer2] = await ethers.getSigners();
  const PennCoin_Fact = await hre.ethers.getContractFactory("PennCoin");
  const token = await PennCoin_Fact.deploy("10000000000000000000000");
  const PennFT_Fact = await hre.ethers.getContractFactory("PennFT");
  const PennFT = await PennFT_Fact.deploy("PennFT", "PFT");
  const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";
  const tx = await PennFT.functions.mintNFT(wallet.getAddress(), TOKEN_URI);
  const EnglishAuction_Fact = await hre.ethers.getContractFactory("EnglishAuction");
  const englishAuction = await EnglishAuction_Fact.deploy(PennFT.address, PennFT_id, PennCoin.address, 5);
});


describe("Start the Auction", function () {    

  it("Starting the auction changes the started variable to true", async function () {
    await englishAuction.connect(seller).start();
    assert(englishAuction.started(), "Auction has started");
  });
    
  it("Only seller can start the auction", async function () {
    await expect(
      englishAuction.connect(buyer1).start()
    ).to.be.reverted;
  });

  
});
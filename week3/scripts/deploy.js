const hre = require("hardhat");




async function main() {

    /* our contract addresses (mumbai) */
    const PennCoin = "0x19878cff44820F53C21968B81C378A2635064cEF";
    const PennFT =   "0x2D53197C8Dfb493b64111BcA29286f613912a7BB";
    const PennFT_id = 1;
    const startingBid = 1; 
    

  // We get the contract to deploy
  const EnglishAuction = await hre.ethers.getContractFactory("EnglishAuction");

  /* TODO
    add constuctor arguments to the deploy function:
      The nft contract address
  */

  // TODO update before deploy
  // Deploy script to localhost is: npx hardhat run scripts/deploy.js --network localhost
  const englishAuction = await EnglishAuction.deploy(PennFT, PennFT_id, PennCoin, startingBid); 

  await englishAuction.deployed();
  console.log("EnglishAuction deployed to:", englishAuction.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
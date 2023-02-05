const hre = require("hardhat");




async function main() {

    /* our contract addresses (mumbai) */
    const PennCoin = "0xA233d98e2c53D6C7e57750A30B204a9bb916eEf3";
    const PennFT =   "0x250F2B55bAD518506114A64f6C73A92934eeE4C0";
    const PennFT_id = 1;
    const startingBid = 1; 
    

  // We get the contract to deploy
  const EnglishAuction = await hre.ethers.getContractFactory("EnglishAuction");

  /* TODO
    add constuctor arguments to the deploy function:
      The nft contract address
  */

  // TODO update before deploy
  // Deploy script to locahost is: npx hardhat run scripts/deploy.js --network localhost
  const englishAuction = await EnglishAuction.deploy(PennFT, PennFT_id, PennCoin, startingBid); 

  await englishAuction.deployed();
  console.log("EnglishAuction deployed to:", englishAuction.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
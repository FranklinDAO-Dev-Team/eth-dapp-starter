// scripts/PennCoin.js

const hre = require("hardhat");

async function main() {
  const PennCoin = await hre.ethers.getContractFactory("PennCoin");
  console.log("Deploying PennCoin...");
  const token = await PennCoin.deploy("10000000000000000000000");

  await token.deployed();
  console.log("PennCoin deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

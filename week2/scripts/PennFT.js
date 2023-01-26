const hre = require("hardhat");

// Function deploys the PennFT contract
async function main() {
  const PennFT = await hre.ethers.getContractFactory("PennFT");
  console.log("Deploying PennFT ERC721 token...");
  const token = await PennFT.deploy("PennFT", "PFT");

  await token.deployed();
  console.log("PennFT deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

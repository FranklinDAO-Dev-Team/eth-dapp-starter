const hre = require("hardhat");

const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";

async function main() {
  const signers = await hre.ethers.getSigners();

  const PennCoin = await hre.ethers.getContractFactory("PennCoin", signers[0]);
  console.log("Deploying PennCoin ERC20 token...");
  const pennCoin = await PennCoin.deploy(1_000_000);
  await pennCoin.deployed();
  console.log("PennCoin deployed to:", pennCoin.address);

  const PennFT = await hre.ethers.getContractFactory("PennFT", signers[0]);
  console.log("Deploying PennFT ERC721 token...");
  const pennFT = await PennFT.deploy("PennFT", "PFT");
  await pennFT.deployed();
  console.log("PennFT deployed to:", pennFT.address);

  console.log("Giving PennCoin to other accounts...");
  await pennCoin.functions.transfer(signers[1].address, 100);
  await pennCoin.functions.transfer(signers[2].address, 100);

  console.log("Minting PennFT...");
  await pennFT.functions.mintNFT(signers[0].address, TOKEN_URI);

  const EnglishAuction = await hre.ethers.getContractFactory(
    "EnglishAuction",
    signers[0]
  );
  console.log("Deploying EnglishAuction contract...");
  const englishAuction = await EnglishAuction.deploy(
    pennFT.address,
    1,
    pennCoin.address,
    1
  );
  await englishAuction.deployed();
  console.log("EnglishAuction deployed to:", englishAuction.address);

  // await pennFT.functions.approve(englishAuction.address, 1);
  // await englishAuction.functions.start();
  // console.log("EnglishAuction started");
  //
  // console.log("Bidding on EnglishAuction...");
  // const pennCoin2 = pennCoin.connect(signers[1]);
  // const englishAuction2 = englishAuction.connect(signers[1]);
  // await pennCoin2.functions.approve(englishAuction2.address, 99);
  // await englishAuction2.functions.bid(99);
  //
  // console.log("Bidding again on EnglishAuction...");
  // const pennCoin3 = pennCoin.connect(signers[2]);
  // const englishAuction3 = englishAuction.connect(signers[2]);
  // await pennCoin3.functions.approve(englishAuction3.address, 100);
  // await englishAuction3.functions.bid(100);
  //
  // await new Promise((r) => setTimeout(r, 5000));
  //
  // console.log("Ending EnglishAuction...");
  // await englishAuction.functions.end();
  //
  // console.log("Withdrawing Tokens...");
  // await englishAuction.functions.withdraw();
  // await englishAuction2.functions.withdraw();
  // await englishAuction3.functions.withdraw();
  //
  // console.log(
  //   "PennCoin balance of signers[0]:",
  //   await pennCoin.functions.balanceOf(signers[0].address)
  // );
  // console.log(
  //   "PennCoin balance of signers[1]:",
  //   await pennCoin.functions.balanceOf(signers[1].address)
  // );
  // console.log(
  //   "PennCoin balance of signers[2]:",
  //   await pennCoin.functions.balanceOf(signers[2].address)
  // );
  // console.log(
  //   "PennCoin balance of EnglishAuction:",
  //   await pennCoin.functions.balanceOf(englishAuction.address)
  // );
  // console.log(
  //   "PennFT balance of signers[0]:",
  //   await pennFT.functions.balanceOf(signers[0].address)
  // );
  // console.log(
  //   "PennFT balance of signers[1]:",
  //   await pennFT.functions.balanceOf(signers[1].address)
  // );
  // console.log(
  //   "PennFT balance of signers[2]:",
  //   await pennFT.functions.balanceOf(signers[2].address)
  // );
  // console.log(
  //   "PennFT balance of EnglishAuction:",
  //   await pennFT.functions.balanceOf(englishAuction.address)
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

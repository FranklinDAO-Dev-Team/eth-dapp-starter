const hre = require("hardhat");

const TOKEN_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";

async function main() {
  const contract = require("../artifacts/contracts/PennFT.sol/PennFT.json");
  const PennFT = await hre.ethers.getContractAt(contract.abi, TOKEN_ADDRESS);

  const wallets = await hre.ethers.provider.listAccounts();
  const wallet = await hre.ethers.provider.getSigner(wallets[0]);

  const tx = await PennFT.functions.mintNFT(wallet.getAddress(), TOKEN_URI);
  console.log(`Minted NFT with tx hash: ${tx.hash}`);

  const balance = await PennFT.balanceOf(wallet.getAddress());
  console.log(`Number of PennFTs ${wallet.getAddress()} owns: ${balance}`);

  const tokenURI = await PennFT.tokenURI(1);
  console.log(`PennFT 1 token URI: ${tokenURI}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

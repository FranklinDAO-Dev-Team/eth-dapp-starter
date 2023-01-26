const hre = require("hardhat");

const TOKEN_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const TOKEN_URI = "ipfs://QmPYXAvt8WzsmEytuSfsPrTLwqdNXPKmmF5VsJvvzPkTWW";

async function main() {
  // Load the contract to get its ABI
  const contract = require("../artifacts/contracts/PennFT.sol/PennFT.json");

  // Get a reference to the deployed contract
  const PennFT = await hre.ethers.getContractAt(contract.abi, TOKEN_ADDRESS);

  // Get the available (pre-seeded) hardhat wallets
  const wallets = await hre.ethers.provider.listAccounts();

  // Just use the first one
  const wallet = await hre.ethers.provider.getSigner(wallets[0]);

  // Mint a new NFT
  const tx = await PennFT.functions.mintNFT(wallet.getAddress(), TOKEN_URI);
  console.log(`Minted NFT with tx hash: ${tx.hash}`);

  // todo: mint another NFT to a different wallet

  // todo: get the number of NFTs minted

  // todo: get the URI of the first NFT

  // todo: get the URI of the second NFT
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

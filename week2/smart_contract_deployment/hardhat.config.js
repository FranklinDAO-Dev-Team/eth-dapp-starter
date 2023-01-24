require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// eslint-disable-next-line no-undef
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "",
      chainId: 5,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      accounts: {
        count: 10,
      },
    },
  },
};

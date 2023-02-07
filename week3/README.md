# Step 1: Smart Contract Work
We provide a skeleton for the Auction.sol contract in the contracts folder. Follow the TODO statements to finish the contract

# Step 2: Unit Testing
In the terminal, install hardhat with '''$npm install hardhat'''
run '''$npx hardhat test'''

# Step 3: Deploying
Track down contract addresses from last week in week2/scripts/MintPennFT.js. If you cannot find the addresses, you will have to redeploy PennCoin and PennFT.

Use this alchemy tutorial as a guide for deploying to testnet - https://docs.alchemy.com/docs/hello-world-smart-contract. Steps 1-5, 11-13, and step 16 will be relevant for you. Other steps are areas you already completed. 

# FAQ
If you get red squiggly lines under your import openzeppelin statements, 
Run $ npm install @openzeppelin/contracts
If the problem persists, just force close vscode and reopen it.
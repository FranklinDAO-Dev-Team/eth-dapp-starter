# Step 1: Smart Contract Work
We provide a skeleton for the Auction.sol contract in the contracts folder. Follow the TODO statements to finish the contract

---

# Step 2: Unit Testing
In the terminal, install hardhat with 

```
$npm install hardhat
```

run 

```
$npx hardhat test
```

---

# Step 3: Deploying
Track down contract addresses from last week in week2/scripts/MintPennFT.js. If you cannot find the addresses, you will have to redeploy PennCoin and PennFT.

Update the address values of PennCoin and PennFT in scripts/deploy.js

Create a new file in the week3 directory named ".env" and paste the following: 

```
PRIVATE_KEY=

MUMBAI_RPC_URL=
```

And input relevant info next to the equal signs (create an account on alchemy to get a mumbai RPC API and export your private key from metamask -- DO NOT PUSH THIS ANYWHERE! Make sure the .env file is grayed out and properly GitIgnored)

Save everything and run:

```
npx hardhat run scripts/deploy.js --network mumbai
```


---

# FAQ
If you get red squiggly lines under your import openzeppelin statements, 
Run $ npm install @openzeppelin/contracts
If the problem persists, just force close vscode and reopen it.

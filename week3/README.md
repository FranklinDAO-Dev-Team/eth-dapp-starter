# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:



Step 1:

```
track down contract addresses from last week in week2/scripts/MintPennFT.js

import ERC721 from open zeppelin to replace IERC721 interface in source code
```


Deploy script to locahost is: npx hardhat run scripts/deploy.js --network localhost

Step x: Testing
run 'npm install hardhat'
'npx hardhat test' to run tests




FAQ:

```
If you get red squiggly lines under your import openzeppelin statements, 

run 

$ npm install @openzeppelin/contracts

if the problem persists, just force close vscode and reopen it.
```
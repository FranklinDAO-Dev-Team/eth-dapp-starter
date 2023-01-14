## dApp starter template

----

1. Clone github repo
2. In a terminal, run 

```
cd FranklinDAO_dApp_starter
yarn install 
```

3. create a new file in the root directory named ".env" and paste the following (you can get RPC URL from infura.io and private key from MetaMask): 

``
GOERLI_RPC_URL=
``

``
PRIVATE_KEY=
``

4. And input relevant info next to the equal signs (you can always add more as you add more networks to deploy to)

5. Save everything with ctrl+s 

6. If you want to deploy the donate.sol contract to goerli, run:

```
truffle migrate --network goerli
```

7. If you want to change the deployment network, follow the same template in truffle-config.js and replace the "goerli" in the terminal line above with the other network's name


8. To verify it on etherscan, select "multi-file solidity" and compiler 0.8.11. Keep everything else the same and when it prompts you to upload files, upload all files from your project folder: 


9. To replace the contract address for the dApp, stick around for more documentation...

----

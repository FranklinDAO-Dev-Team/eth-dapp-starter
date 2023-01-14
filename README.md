# dApp starter template

----
## Live website: 

[eth-dapp-starter.vercel.app/](https://eth-dapp-starter.vercel.app/) (must have MetaMask installed and be connected to Goerli Testnet!)

---


## To deploy on your own machine:

1. Clone github repo
2. In a terminal, run 

```
cd eth_dapp_starter
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

6. Start the project in developement mode:

```
yarn dev
```

7: Open http://localhost:3000/ in your browser 


----

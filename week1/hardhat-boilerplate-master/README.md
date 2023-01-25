

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
cd week1
cd hardhat-boilerplate-master
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, to deploy your contract:

```sh
cd week1
cd hardhat-boilerplate
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.


To run hardhat tests

```sh
npx hardhat test
```

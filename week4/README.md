# Week 4 Guide

This week, we'll be setting up a frontend to interact with our auction contract.

## Pre-requisites

We assume you've completed your smart contracts from the previous weeks. You should paste them
into `solidity/contracts`.

Note that we've added a `solidity` folder and moved all of our code there. This is a design choice so the project
directories don't get too complex.

## Step 1: Local Testing

First, let's test the contracts on a local hardhat node. In the `solidity` directory, run:

```shell
cd solidity
npm install
npx hardhat node
```

In another terminal, run:

```shell
cd solidity
npx hardhat run scripts/deploy.js --network localhost
```

This will deploy all your contracts and print their deployed addresses. Copy each of the addresses
into the respective variables in `client/src/utils/variables.js`.

To run the website, run:

```shell
cd client
npm install
npm start
```

This will host a dev version of the website, which you can access at `localhost:3000`.

## Step 2: Adding more functionality

The website should work and allow the owner of the auction contract to start the auction. We now want you to add more to
the website to allow users to bid and the owner to end the auction. See the TODOs in `client/src/components` and
`client/src/pages` to do this.

## Step 3: Deploying to Mumbai

Deploying to Mumbai is similar to last week, create a `.env` file with the `PRIVATE_KEY` AND `MUMBAI_RPC_URL`. Then run:

```shell 
cd solidity
npx hardhat run scripts/deploy.js --network mumbai
```

Copy the addresses into `client/src/utils/variables.js` and run `npm start` in the `client` directory. In metamask,
change the provider to mumbai and refresh the page. You should be able to interact with the auction contract on mumbai.
# Week 1 - Hardhat Setup

This week, we will focus on setting up your local environment to work with Hardhat.

## Prerequisites

1. Install [`nodejs`](https://nodejs.org/en/download/)
    2. Note: node needs to be version 14, 16 or 18. We recommend using Node 18.
2. Install [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable), or your preferred node package manager
3. Initialize a node repository in the parent repo folder (`yarn init -y`)

## Hardhat Setup

1. Install hardhat (`yarn add hardhat`)
2. Initialize hardhat repository (`yarn hardhat`)
    1. Make a Typescript project
    2. Set project route to a child folder (e.g. `hardhat`)
    3. Install sample project dependencies
3. Modify `hardhat/hardhat.config.ts`
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        hardhat: {},
    }
};

export default config;

```

## Compile, test and deploy
1. Go into the hardhat folder (`cd hardhat`)
2. Compile (`npx hardhat compile`)
3. Test (`npx hardhat test`)
4. Deploy (`npx hardhat run scripts/deploy.ts`)
5. Interact with the blockchain (`npx hardhat console --network localhost`)
```javascript
const address = '[YOUR ADDRESS HERE]';
const contract = await ethers.getContractAt("Lock", address);

await contract.withdraw();
```
import { Button, Container, createStyles, Flex, Title } from "@mantine/core";
import { useState } from "react";
import TokenCard from "../components/TokenCard";
import { ethers } from "ethers";
import {
  AUCTION_ADDRESS,
  AUCTION_CONTRACT,
  PENN_COIN_ADDRESS,
  PENN_COIN_CONTRACT,
  PENNFT_ADDRESS,
  PENNFT_CONTRACT,
} from "../utils/variables";

const useStyles = createStyles({
  padding: {
    padding: 50,
  },
});

export default function Home() {
  const { classes } = useStyles(undefined, undefined);

  const [selectedAddress, setSelectedAddress] = useState("");
  const [numTokens, setNumTokens] = useState(0);

  const [openedToken, setOpenedToken] = useState(null);

  const [coinContract, setCoinContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [auctionContract, setAuctionContract] = useState(null);

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.log(error);
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setSelectedAddress(accounts[0]);
    const signer = provider.getSigner();
    console.log("Got signer.");

    const coinContract = new ethers.Contract(
      PENN_COIN_ADDRESS,
      PENN_COIN_CONTRACT,
      signer
    );
    setCoinContract(coinContract);
    const nftContract = new ethers.Contract(
      PENNFT_ADDRESS,
      PENNFT_CONTRACT,
      signer
    );
    setNftContract(nftContract);
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_CONTRACT,
      signer
    );
    setAuctionContract(auctionContract);
    console.log("Got contracts.");

    const tokens = await coinContract.functions.balanceOf(accounts[0]);
    setNumTokens(tokens[0].toNumber());

    const token = {
      price: 0,
      id: 1,
      highestBidder: null,
      status: "Ongoing",
      metadata: null,
    };

    const started = await auctionContract.started();
    if (!started) {
      token.status = "Not Started";
    } else {
      token.highestBidder = await auctionContract.highestBidder();
    }

    const ended = await auctionContract.ended();
    if (ended) {
      token.status = "Ended";
    }

    token.price = (await auctionContract.highestBid()).toNumber();

    const tokenURI = await nftContract.functions.tokenURI(1);
    const req = new Request(
      `https://ipfs.io/ipfs/${tokenURI[0].split("//")[1]}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    token.metadata = await (await fetch(req)).json();

    token.owner = (await auctionContract.seller()).toLowerCase();
    setOpenedToken(token);
    console.log("Got token information.");
    console.log(token);
  };

  const getTokenData = async () => {
    await new Promise((r) => setTimeout(r, 5000));
    const token = {
      price: 0,
      id: 1,
      highestBidder: null,
      status: "Ongoing",
      metadata: null,
    };

    const started = await auctionContract.started();
    if (!started) {
      token.status = "Not Started";
    } else {
      token.highestBidder = await auctionContract.highestBidder();
    }

    const ended = await auctionContract.ended();
    if (ended) {
      token.status = "Ended";
    }

    token.price = (await auctionContract.highestBid()).toNumber();

    const tokenURI = await nftContract.functions.tokenURI(1);
    const req = new Request(
      `https://ipfs.io/ipfs/${tokenURI[0].split("//")[1]}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    token.metadata = await (await fetch(req)).json();

    token.owner = (await auctionContract.seller()).toLowerCase();
    setOpenedToken(token);
  };

  // This function allows the owner to start the auction
  const startAuction = async () => {
    await nftContract.functions.approve(AUCTION_ADDRESS, 1);
    await auctionContract.functions.start();
    await getTokenData();
  };

  const submitBid = async (bid) => {
    // TODO: alter this to submit the user's bid to the contract
  };

  const endAuction = async () => {
    // TODO: alter this to end the auction
  };

  const withdraw = async () => {
    // TODO: alter this to withdraw the user's winnings
  };

  return (
    <Container size="xl" className={classes.padding}>
      {selectedAddress ? (
        <Flex direction="column" justify="center" align="center">
          <Title order={1}>NFT Auction Demo</Title>
          <Title order={3}>Welcome {selectedAddress}</Title>
          <Title order={3}>You have {numTokens} PennCoin</Title>
          <TokenCard
            token={openedToken}
            address={selectedAddress}
            startAuction={startAuction}
            submitBid={submitBid}
            endAuction={endAuction}
            withdraw={withdraw}
          />
        </Flex>
      ) : (
        <Flex direction="column" justify="center" align="center">
          <Button onClick={connectToMetamask}>Connect to Metamask</Button>
        </Flex>
      )}
    </Container>
  );
}

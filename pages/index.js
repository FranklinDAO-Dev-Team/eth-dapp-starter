import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { ContractABI } from '../components/contractABI.js';


// create provider variable
let provider;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // we are in the browser and metamask is running
    provider = new ethers.providers.Web3Provider(window.ethereum);

} else {
    // we are on the server *OR* the user is not running metamask
    // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
    provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/<insert alchemy key or use infura http link>");
    // provider = new ethers.providers.Web3Provider(provider);
}


// create smart contract variable wiht inputs: contract address, abi, and signer
const Donate = new ethers.Contract(
    '0x2D53197C8Dfb493b64111BcA29286f613912a7BB',
    ContractABI,
    provider.getSigner()
);


// test


export default function Home() {
    // Connecting Wallet
    const [accounts, setAccounts] = useState([]);

    async function connectAccounts() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccounts(accounts);
        }
    }

    // getting whether user is authenticated
    const [authenticated, setAuthenticated] = useState(false);

    // checking for authentication
    async function requestAccount() {
        console.log('Requesting account...');
    
        //Check if MetaMask is installed
        if (window.ethereum) {
          console.log('detected metamask');
    
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            console.log('auth detected', authenticated)
    
            setWalletAddress(accounts[0]);
            getBalance();
    
            if (accounts.length > 0) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
    
          } catch (error) {
            console.error(error);
          }
    
        } else {
          console.log('no metamask detected');
        }
      }



    // getting contract balance
    const [contractBalance, setContractBalance] = useState();

    const getContractBalance = async () => {
        const bigNumberContractBalance = await Donate.getContractBalance.call();
        const contractBalance = ethers.utils.formatEther(bigNumberContractBalance);
        setContractBalance(parseInt(contractBalance));
    };

    // handle submit form 
    const handleSubmitForm = async (event) => {
        event.preventDefault();
        //***modify below to call ur smart contract */
        console.log(event.target[0].value)
        console.log(event.target[1].value)
        console.log(event.target[2].value)
        ////////
        setUser("");
        setDescription("");
        setNoteURI("");
        setButtonState(false);

    }


    // rendering the page
    return (
        <section className="text-white ">
            <div className="pb-40 mx-auto max-w-screen-xl">

                <div className="max-w-lg mx-auto text-center">
                    <h2 className="pb-10 text-3xl font-extrabold sm:text-5xl text-white">
                        dApp Demo {"\n"}
                    </h2>
                </div>

                <div className="m-6">

                <h2 className="flex mb-4 text-sm font-medium text-yellow-500">
                        For below buttons to work, switch to Goerli Testnet on Metamask
                    </h2>
                    
                    <h2 className="flex mb-4 text-sm font-medium text-white">
                        Contract: 0x2D53197C8Dfb493b64111BcA29286f613912a7BB (<a className="text-blue-600 underline hover:text-blue-700" href="https://goerli.etherscan.io/address/0x2D53197C8Dfb493b64111BcA29286f613912a7BB#code">See Goerli Etherscan</a>)
                    </h2>

                    <a className="mr-4 p-2 text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 rounded-md shadow">
                        <button onClick={() => getContractBalance()}>Show Contract Balance</button>
                        
                    </a>
                    <a className="text-m text-white font-bold">
                        {contractBalance}
                    </a>



                </div>
            </div>

        </section>


    )
}

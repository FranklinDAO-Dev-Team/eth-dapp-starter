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
    const [authenticated, setAuthenticated] = useState(true);

    // checking for authentication
    async function requestAccount() {
        console.log('Requesting account...');

        //Check if MetaMask is installed
        if (window.ethereum) {
            console.log('detected metamask');

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log(accounts);


                setWalletAddress(accounts[0]);
                getBalance();

                if (accounts.length > 0) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }

                console.log('auth detected', authenticated)

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
        const weiContractBalance = await Donate.getContractBalance.call();
        const contractBalance = ethers.utils.formatEther(weiContractBalance, { commify: true });
        setContractBalance(contractBalance);
    };

    // handle donate button
    const [donateAmount, setDonateAmount] = useState('');
    const [updated, setUpdated] = useState(donateAmount);

    const handleChange = (event) => {
        setDonateAmount(event.target.value);
    };

    const handleClick = async () => {
        await Donate.connect(provider.getSigner()).donate({ value: ethers.utils.parseUnits(donateAmount, "ether") });
        setUpdated(donateAmount);
    };

    // handle withdraw button
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [updatedWithdraw, setUpdatedWithdraw] = useState(withdrawAmount);

    const handleChangeWithdraw = (event) => {
        setWithdrawAmount(event.target.value);
    };

    const handleClickWithdraw = async () => {
        await Donate.connect(provider.getSigner()).withdrawBalance('0x85257F5401071fB3EF665299d63A1e42a41b3769', ethers.utils.parseUnits(withdrawAmount, "ether"));
        setUpdatedWithdraw(withdrawAmount);
    };


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
                        Contract: <a className="ml-2 text-blue-600 underline hover:text-blue-700" href="https://goerli.etherscan.io/address/0x2D53197C8Dfb493b64111BcA29286f613912a7BB#code">0x2D53197C8Dfb493b64111BcA29286f613912a7BB</a>
                    </h2>



                    {/* contract balanace button */}
                    <a className="mr-4 p-2 text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 rounded-md shadow">
                        <button onClick={() => getContractBalance()}>Balance</button>

                    </a>
                    <a className="text-m text-white font-bold mr-4">
                        {contractBalance}
                    </a>


                    {/* donate input */}
                    <a className="mr-4 p-2 text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 rounded-md shadow">
                        <button onClick={handleClick}>Donate</button>

                    </a>


                    <input className="mr-4"
                        type="number" min="0"
                        id="donate-button"
                        name="donate-button"
                        onChange={handleChange}
                        value={donateAmount}
                    />


                    {/* withdraw input */}
                    <a className="mr-4 p-2 text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 rounded-md shadow">
                        <button onClick={handleClickWithdraw}>Withdraw</button>

                    </a>


                    <input
                        type="number" min="0"
                        id="withdraw-button"
                        name="withdraw-button"
                        onChange={handleChangeWithdraw}
                        value={withdrawAmount}
                    />

                </div>
            </div>

        </section>


    )
}

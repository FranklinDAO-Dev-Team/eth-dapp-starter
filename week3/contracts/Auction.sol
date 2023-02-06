// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract EnglishAuction {
    event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address highestBidder, uint amount);

    IERC721 public immutable nft;
    uint public immutable nftId;
    IERC20 public immutable coin;
    
    address payable public immutable seller;
    uint32 public endAt;
    bool public started;
    bool public ended;
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;


    /* constructor TODO
        Take in as inputs an address _nft, a uint _nftId, an address _erc20, and a uint _startingbid
        Initialize variables nft, nftID, coin (the erc20), and highestBid to these respective values, and seller to msg.sender
        Remember cast variables to the correct type: _nft as an IERC721, coin to IERC20, and seller as a payable address
    */
    // constructor() {

    // }
    constructor(address _nft, uint _nftId, address _erc20, uint _startingBid) {
        nft = IERC721(_nft); 
        nftId = _nftId; 
        coin = IERC20(_erc20);
        highestBid = _startingBid;
        seller = payable(msg.sender); 
    }

    function start() external {
        require(msg.sender == seller, "not seller");
        require(!started, "started");
        started = true;
        endAt = uint32(block.timestamp + 300); // 300 seconds should be long enough for the Demo and test.
        nft.transferFrom(seller, address(this), nftId);
        emit Start();
    }

    // Here we give you some functions to interact the PennCoin ERC20 contract 
    function ApproveCoin(uint256 _coinAmount) public returns(bool){
       coin.approve(address(this), _coinAmount);
       return true;
    }


    function AcceptPayment(uint256 _tokenamount) public returns(bool) {
       require(_tokenamount > GetAllowance(), "Please approve tokens before transferring");
       coin.transfer(address(this), _tokenamount);
       return true;
    }
    function GetUserTokenBalance() public view returns(uint256){ 
       return coin.balanceOf(msg.sender);
    }
    function GetAllowance() public view returns(uint256){
       return coin.allowance(msg.sender, address(this));
    }
    function GetContractTokenBalance() public view returns(uint256){
       return coin.balanceOf(address(this));
    }

    // TODO TODO TODO: bid currently takes in matic, need to not make it payable and instead bid PC@\2
    function bid(uint256 coinamount) external payable {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        require(coinamount > highestBid, " value < highest bid");
        AcceptPayment(coinamount);
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }
        highestBid = coinamount;                                
        highestBidder = msg.sender;
        emit Bid(msg.sender, coinamount);
    }

    function withdraw() external {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        coin.approve(address(this), bal);
        coin.transfer(msg.sender, bal);
        emit Withdraw(msg.sender, bal);
    }

    function end() external {
        require(started, "not started");
        require(!ended, "ended!");
        require(block.timestamp >= endAt, "not ended");
        ended = true;
        if (highestBidder != address(0)) {
            nft.transferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }
        emit End(highestBidder, highestBid);
    }
}
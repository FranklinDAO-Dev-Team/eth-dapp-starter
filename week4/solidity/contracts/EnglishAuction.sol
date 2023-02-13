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
        endAt = uint32(block.timestamp + 60);
        // 300 seconds should be long enough for the Demo and test.
        nft.transferFrom(seller, address(this), nftId);
        emit Start();
    }

    // Here we give you some functions to interact the PennCoin ERC20 contract 
    function ApproveCoin(uint256 _coinAmount) public returns (bool){
        coin.approve(address(this), _coinAmount);
        return true;
    }

    function AcceptPayment(uint256 _tokenamount) public returns (bool) {
        require(_tokenamount <= GetAllowance(), "Please approve tokens before transferring");
        coin.transferFrom(msg.sender, address(this), _tokenamount);
        return true;
    }

    function GetUserTokenBalance() public view returns (uint256){
        return coin.balanceOf(msg.sender);
    }

    function GetAllowance() public view returns (uint256){
        return coin.allowance(msg.sender, address(this));
    }

    function GetContractTokenBalance() public view returns (uint256){
        return coin.balanceOf(address(this));
    }

    function bid(uint256 coinamount) external payable {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        require(coinamount > highestBid, "value < highest bid");
        AcceptPayment(coinamount);
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }
        highestBid = coinamount;
        highestBidder = msg.sender;
        emit Bid(msg.sender, coinamount);
    }

    function withdraw() external {
        require(ended, "not ended");
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        coin.approve(address(this), bal);
        coin.transferFrom(address(this), msg.sender, bal);
        emit Withdraw(msg.sender, bal);
    }

    function end() external {
        require(started, "not started");
        require(!ended, "ended!");
        require(block.timestamp >= endAt, "not ended");
        ended = true;
        if (highestBidder != address(0)) {
            nft.transferFrom(address(this), highestBidder, nftId);
            coin.approve(address(this), highestBid);
            coin.transferFrom(address(this), seller, highestBid);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }
        emit End(highestBidder, highestBid);
    }
}
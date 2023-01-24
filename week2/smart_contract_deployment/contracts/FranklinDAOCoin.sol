// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FranklinDAOCoin is ERC20, Ownable {
    constructor() ERC20("FranklinDAO Coin", "FDC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
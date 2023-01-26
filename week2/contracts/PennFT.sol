// contracts/PennFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PennFT is ERC721 {
    // todo: think about what variables you need to store the NFT metadata

    /**
        The constructor for the PennFT contract. Passes the name and symbol to the ERC721 constructor.
    */
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        // todo: initialize any variables you created here
    }

    /**
        Mints a new NFT and stores the tokenURI in the contract.
        @param recipient The address of the NFT recipient
        @param tokenURI The tokenURI of the NFT
        @return The ID of the newly minted NFT
    */
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256)
    {
        // todo: finish this code
    }

    /**
    * Gets the URI of the specified token.
    * @param tokenId uint256 ID of the token to query the URI of
    * @return string URI of the token
    */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // todo: finish this code
    }

    /**
    * Gets the number of tokens in existence.
    * @return uint256 representing the number of tokens in existence
    */
    function tokenCount() public view returns (uint256) {
        // todo: finish this code
    }
}
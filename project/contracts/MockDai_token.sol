// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC20/ERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/access/Ownable.sol";

contract MockDai_token is ERC20, Ownable{
    constructor() ERC20("Mock Dai", "DAI"){
    }
}
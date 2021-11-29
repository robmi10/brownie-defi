// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC20/ERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/access/Ownable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC20/IERC20.sol";

contract Dapp_token is ERC20, Ownable{
    constructor () ERC20 ('DAPP token', 'DAPP'){
        _mint(msg.sender, 1000000 * 10 **18);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC20/IERC20.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/access/Ownable.sol";
import "smartcontractkit/chainlink-brownie-contracts@1.0.2/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Farm_token is Ownable{

    IERC20 public dapp_token;
    mapping(address => mapping(address => uint256)) public Stakingamount;
    mapping(address => bool) public Is_staking;
    mapping(address => address) public PriceFeedAddress; 

    address[] public Staking_list;
    address[] public Allowed_tokens;

    string public newbalance = "hi newbalance";

    event Amount(uint256);

    event User(address);

    event Print(string);

    modifier able_tostake(address _token){
        require(Stakingamount[_token][msg.sender] > 0 && Is_staking[msg.sender] == false);
        _;
    }

    modifier already_staking(){
        require(Is_staking[msg.sender] == true);
        _;
    }
    
    constructor (address _dapptokenaddress){
        dapp_token = IERC20(_dapptokenaddress);
    }
    
    function _add_allowedtokens (address _token) public onlyOwner{
        Allowed_tokens.push(_token);
    }

    function _allowed_tokens(address _token) public returns (bool){
        for(uint256 i = 0; i < Allowed_tokens.length; i++){
            if(Allowed_tokens[i] == _token){
                return true;
            }
        }
        return false;
    }
    //Stake func
    function stake(uint256 _amount, address _token) public {
        // require sender has eth in account and is not already staked. And token is allowed
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        Stakingamount[_token][msg.sender] = Stakingamount[_token][msg.sender] + _amount; 
        Is_staking[msg.sender] = true;
        Staking_list.push(msg.sender);
    }

  /*   function get_value(int balance) public {
        newbalance = balance;
    } */

    function token_balance(address _token) public view returns(string memory){
        //uint256 balance = Stakingamount[_tokenaddress][msg.sender];
        string memory balance = "100";
        return balance;
    }
    
    //UNstake func
    function unstake(address _token) public already_staking{
        //require user is already staking
        uint256 balance = Stakingamount[_token][msg.sender];
        Stakingamount[_token][msg.sender] = Stakingamount[_token][msg.sender] = 0;

        IERC20(_token).transfer(msg.sender, balance);
        Is_staking[msg.sender] = false;
    }

    function set_price_feedcontract(address _token, address _pricefeed) public onlyOwner{
        PriceFeedAddress[_token] = _pricefeed;
    }

    function token_price_converter(address _user, address _token) public returns(uint256){
        (uint256 price, uint256 decimals) = get_token_price_feed(_token);
        
        uint256 result = (Stakingamount[_token][_user] * price / (10 **decimals)); 

        emit Print("Result--->");
        emit Amount(result);

        return result;
    }

    function get_token_price_feed(address _token) public returns(uint256, uint256){
        address curr_pricefeed_address = PriceFeedAddress[_token];
        
        AggregatorV3Interface priceFeed = AggregatorV3Interface(curr_pricefeed_address);
        (
            ,int price,,,
        ) = priceFeed.latestRoundData();
        uint256 decimal = uint256(priceFeed.decimals());
        return (uint256(price), decimal);
    }
    //issue rewards to those who are staking
 

    function issue_tokens(address _token, address _account) public returns(bool){        
        for(uint i = 0; i < Staking_list.length; i++){
                //look how much ETH they are staking and give the output as dapp token so 1 ETH current price perhaps 1500 == 1500 Dapp tokens 
                //reward to the staker
                address reciptiant = Staking_list[i];
                if(_account == reciptiant){
                    uint256 balance = Stakingamount[_token][reciptiant];
                    uint256 issue_amount = token_price_converter(_account, _token);
                 
                    dapp_token.transfer(reciptiant, issue_amount);
                    return true;
                }
        }
        return false;
    }
  
}
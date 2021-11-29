pragma solidity ^0.8.0;

contract Test {

    string input= 'hello world';
    

    function hello_world()public view returns(string memory){
        return input;
    }

    function new_hello_world() public payable returns(string memory){
        input = 'bye world';
        return input;
    }

    function boolean() public payable returns(bool){
        return true;
    }
}

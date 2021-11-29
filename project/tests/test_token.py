from scripts.helpful_scripts import get_contract, INITIAL_VALUE, get_account
from brownie import config, accounts
from scripts.deploy import deploy_dapp
from brownie.network import account
from eth_utils.conversions import T
from web3 import Web3
import pytest


def test_My_token():
    account = get_account()
    dapp_token, token_farm = deploy_dapp()
    input_amount = Web3.toWei(1, 'ether')   

    dapp_token.approve(token_farm.address, input_amount, {"from": account})  
    token_farm.stake(input_amount, dapp_token.address, {"from": account})
    current_balance = token_farm.token_balance(dapp_token.address, {"from": account})

    expected = input_amount

    assert current_balance == expected

    return token_farm, dapp_token
    
def test_unstake():
    account = get_account()
    token_farm, dapp_token = test_My_token()

    first_startingbalance = dapp_token.balanceOf(account)

    token_farm.unstake(dapp_token.address, {"from": account})

    second_startingbalance = dapp_token.balanceOf(account)

    current_balance = token_farm.token_balance(dapp_token.address, {"from": account})

    assert current_balance == 0

    
def test_price_feed():
    dapp_token, token_farm = deploy_dapp()

    price_feed = get_contract("eth_usd_price_feed")
    token_farm.set_price_feedcontract(dapp_token.address, price_feed)

    curr_get_price_feed = token_farm.PriceFeedAddress(dapp_token.address)

    print("curr_get_price_feed-->", curr_get_price_feed)

    assert curr_get_price_feed == price_feed

    
def test_issuetoken():
    account = get_account()
    token_farm, dapp_token, fau_token = test_My_token()

    first_startingbalance = dapp_token.balanceOf(account.address)

    fau_token_staking_balance = fau_token.balanceOf(account.address)

    account_balance = dapp_token.balanceOf(token_farm.address)

    tx = token_farm.issue_tokens(dapp_token.address, account, {"from": account})
    event = tx.events
    print("event--->", event)
    new_balance =  dapp_token.balanceOf(account.address)
    expected = new_balance
    result = first_startingbalance + 2000000000000000000000

    print("fau_token_staking_balance --->", fau_token_staking_balance)

    print("account_balance --->", account_balance)
    print("first_startingbalance --->", first_startingbalance)
    print("new_balance --->", new_balance)
    print("result --->", result)


    assert new_balance == 0

def get_price_decimal():
    account = get_account()
    token_farm, dapp_token = test_My_token()
    result = token_farm.get_token_price_feed(dapp_token.address)

    assert result == (INITIAL_VALUE, 18)



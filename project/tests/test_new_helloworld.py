""" from brownie import accounts, Test
import pytest

def test_hello_deploy():
    account = accounts[0]

    test_contract = Test.deploy({"from": account})
    hello_world = test_contract.hello_world()

    expected = 'hello world'

    assert hello_world == expected

def test_bye_deploy():
    account = accounts[0]
    new_contract = Test.deploy({"from": account})
    bye_world = new_contract.new_hello_world()

    hello_world = new_contract.boolean()

    print("hell_world", hello_world)

    expected = True

    assert hello_world == expected """

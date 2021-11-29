from brownie import accounts, config, Farm_token, Dapp_token 
from scripts.helpful_scripts import get_account, get_contract
from web3 import Web3
import yaml
import json
import os
import shutil

KEEP_BALANCE = Web3.toWei(100, 'ether') 

def deploy_dapp(_update_frontend = False):
    account = get_account()

    print("account ->", account)
    dapp_token = Dapp_token.deploy({"from": account})
    
    token_farm = Farm_token.deploy(dapp_token.address, {"from": account})

    tx = dapp_token.transfer(token_farm.address, dapp_token.totalSupply() - KEEP_BALANCE, {"from": account})
    tx.wait(1)

    weth_token = get_contract("weth_token")
    fau_token = get_contract("fau_token")
    dict_allowed_tokens ={
        dapp_token: get_contract("dai_usd_price_feed"),
        fau_token: get_contract("dai_usd_price_feed"),
        weth_token: get_contract("eth_usd_price_feed"),
    }

    add_allowed_token(token_farm, dict_allowed_tokens, account)
    if _update_frontend:
        update_frontend()
    return dapp_token, token_farm, fau_token

def add_allowed_token(token_farm, dict_allowed_tokens, account):
    for token in dict_allowed_tokens:
        add_tx = token_farm._add_allowedtokens(token.address, {"from": account})
        add_tx.wait(1)
        set_tx = token_farm.set_price_feedcontract(token.address, dict_allowed_tokens[token], {"from": account})

        set_tx.wait(1)
    return token_farm

def update_frontend():
    copy_folders_to_front_end("./build", "./frontend/src/chain-info")

    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader = yaml.FullLoader)
        with open("./frontend/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
        print("Frontend updated!")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_dapp(_update_frontend = True)
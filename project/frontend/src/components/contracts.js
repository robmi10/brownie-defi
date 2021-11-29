import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json"
import networkMapping from  "../chain-info/deployments/map.json"
import {constants} from "ethers"
import brownieConfig from "../brownie-config.json"
import dai_logo from "./Defi/images/dai_logo.png"
import dapp_logo from "./Defi/images/dapp_logo.png"
import eth_logo from "./Defi/images/eth_logo.png"
import Menu from "./Defi/menu"
import Main from "./main"
import {AccountContext} from "../UseContext/Account_Context"
import { useContext, useEffect } from 'react';

export default function Contracts(){
    const {chainId} = useEthers()

    const networkName = chainId ? helperConfig[chainId] : "dev"

    const dappTokenAdress = chainId ? networkMapping[String(chainId)]["Dapp_token"][0] : constants.AddressZero
    const wethTokenAdress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAdress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const {token_list, setTokenList} = useContext(AccountContext)

    const handle_supportToken = () =>{  
        setTokenList(supportedTokens)
    }  

    useEffect(() => {
        handle_supportToken()
    }, [setTokenList])


    console.log("chainId->", chainId)

    console.log("dappTokenAdress->", dappTokenAdress)
    const supportedTokens = [
        {image: dapp_logo,
        address: dappTokenAdress,
        name:"DAPP"
        },
        {image: eth_logo,
        address: wethTokenAdress,
        name:"WETH"
        },
        {image: dai_logo,
        address: fauTokenAdress,
        name:"DAI"
        }
    ]
 
    console.log("token_list ->", token_list)
    console.log("networkName", networkName)

    console.log("supportedTokens CONTRACTS --->", supportedTokens)
    return( 
        <div>


            <Main supportedTokens ={{supportedTokens}}></Main>
            
           
            
        </div>
    )
}
import {useEthers, useTokenBalance, useEtherBalance, useContractCalls } from '@usedapp/core'
import {formatUnits} from "@ethersproject/units"
import Farm_token from "../../chain-info/contracts/Farm_token.json"
import {Contract} from "@ethersproject/contracts"
import networkMapping from "../../chain-info/deployments/map.json"
import {constants, utils} from "ethers"
import { useContractCall } from "@usedapp/core";

function useStaking_(token){
    const {abi} = Farm_token;
    const {account, chainId} = useEthers()

    const {name, address} = token
    //console.log("token inside useSTAKING--", name)

    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["Farm_token"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    //console.log("tokenFarmInterface abi ->", abi)
    //console.log("tokenFarmAddress abi string->", tokenFarmAddress.toString())

   
    const [Stakingamount] =
    useContractCall({
      abi: tokenFarmInterface,
      address: tokenFarmAddress,
      method: "Stakingamount",
      args: [address, account],
    }) ?? []

    return Stakingamount
        

        
}

export default function Balance_stake({token}){
    const {image, address} = token
    const {account, chainId} = useEthers()
    
    const token_balance = useStaking_(token)

    const userBalance = useEtherBalance(account)
    
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["Farm_token"][0] : constants.AddressZero
   
    const formatted_balance = token_balance ? parseFloat(formatUnits(token_balance, 18)): 0

    console.log("formatted_balance-->", token_balance)

   
    return(
        <div>
            <img style={{ width: 50, height: 50}}src={image}/>

            <h1>
                {formatted_balance}
            </h1>
           
        </div>
    )
}
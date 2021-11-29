import {useEthers, useTokenBalance } from '@usedapp/core'
import {formatUnits} from "@ethersproject/units"

export default function Balance({token}){
    const {image, address} = token
    const {account} = useEthers()
    const tokenBalance = useTokenBalance(address, account);
   
    const formatted_balance = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)): 0
   
    return(
        <div>
            <img style={{ width: 50, height: 50}}src={image}/>

            <h1>{formatted_balance}</h1>
        </div>
    )
}
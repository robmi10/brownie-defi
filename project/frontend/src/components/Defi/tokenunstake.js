import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {Tab} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Balance_stake from './balance_stake';
import * as React from 'react';
import UnStake from './unstake'
import {AccountContext} from "../../UseContext/Account_Context"
import { useContext } from 'react';
import {useEthers, useEtherBalance, useTokenBalance } from '@usedapp/core'
import {formatUnits} from "@ethersproject/units"

const theme = makeStyles({
    text:{
        color: 'rgb(255, 255, 255)',
    },
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',  
        color: 'rgb(255, 255, 255)',
    },
    button:{
        marginTop: 20
    },
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
   
})


export default function Tokenunstake({supportedTokens}){
    const classes = theme()
    const [inside_value, inside_setvalue] = React.useState(1);
    const handle_token_change = (event, Newvalue) =>{
        inside_setvalue(Newvalue)
    }
    const {account} = useEthers()

    const {token_list} = useContext(AccountContext)

    const etherbalance = useEtherBalance(account)

    return(
        <div>
            <TabContext value={inside_value}>
       
                                    <TabList onChange = {handle_token_change} aria-label ="Menu">             
                                        {supportedTokens.supportedTokens.supportedTokens.map((token, index) =>(
                                                        <Tab label={token.name}
                                                            value={index}
                                                            index ={index}
                                                            className={classes.text}
                                                            >
                                                        {token.name}
                                                        
                                                        </Tab>
                                                    ))}
                                           
                                        </TabList>
                                                            
                                    {supportedTokens.supportedTokens.supportedTokens.map((token, index) =>{
                                            return( 
                                            <TabPanel
                                             value ={index}
                                             key = {index}
                                            >
                                                <div className={classes.tabContent}>
                                        
                                                    

                                                    Your staked balance
                                                <Balance_stake token = {token}></Balance_stake>
                                                <UnStake token = {token}></UnStake>
                                                </div>                                                                     
                                            </TabPanel>   
                                     )})}
                                    
                                    </TabContext>

        </div>
    )
}
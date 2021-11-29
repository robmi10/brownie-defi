import {Paper, Tab, Button} from '@material-ui/core'
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {useEthers, useEtherBalance, useTokenBalance } from '@usedapp/core'
import {AccountContext} from "../../UseContext/Account_Context"
import { useContext } from 'react';
import Tokens from './tokens';
import UnStake from './unstake';
import Tokenunstake from './tokenunstake';
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
    paper:{
        height: 400,
        width: 500,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px (45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 10,
        position: 'relative',
        marginTop: 50 ,
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

function useTokenBalances_(address){

    const {account} = useEthers()

    const tokenbalance = useTokenBalance(address, account)

    return tokenbalance;
}
export default function Menu({supportedTokens}){
    const [value, setvalue] = React.useState(1);
    const handle_change = (event, Newvalue) =>{
        setvalue(Newvalue)
    }
    
    const classes = theme();

    const {account} = useEthers()

    const etherbalance = useEtherBalance(account)
    
    return(
        <div className={classes.root}>

        <TabContext value={value}>
            <Paper className = {classes.paper}>
                <TabList onChange ={handle_change} aria-label ="Menu">
                    <Tab label ="Stake" value={1} className={classes.text}></Tab>
                    <Tab label ="Unstake" value={2} className={classes.text}></Tab>
                    <Tab label ="Portfolio" value={3} className={classes.text}></Tab>
                </TabList>
                        <TabPanel value={1} className={classes.text}>
                        <Tokens supportedTokens = {supportedTokens} ></Tokens>
                        </TabPanel>           
                <TabPanel value={2} className={classes.text}>
                        <Tokenunstake supportedTokens ={supportedTokens}></Tokenunstake>
                </TabPanel>
                <TabPanel value={3} className={classes.text}>
                    {etherbalance ?  parseFloat(formatUnits(etherbalance, 18)): 0} ETH
                </TabPanel> 
            </Paper>
            
            
        </TabContext>
        </div>
    )
}

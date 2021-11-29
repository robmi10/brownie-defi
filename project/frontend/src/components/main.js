import {Paper, Tab, Button} from '@material-ui/core'
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Menu from './Defi/menu'
import Connect from './Defi/connect'
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {useEthers, useEtherBalance, useTokenBalance } from '@usedapp/core'
import {formatUnits} from "@ethersproject/units"

const theme = makeStyles({
    text:{
        color: 'rgb(0, 0, 0)',
    },
    root:{
        justifyContent: 'center',  
        color: 'rgb(255, 255, 255)',
    },
    paper:{
        height: 800,
        width: 700,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px (45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 10,
        position: 'relative',
        marginTop: 100 ,
    },
    button:{
        marginTop: 20
    },
})

export default function Main({supportedTokens}){
    const [value, setvalue] = React.useState()

    const classes = theme();
    const handle_change = (e, value) =>{
        setvalue(value)
    }
    const {account} = useEthers()


    const etherbalance = useEtherBalance(account)
    return(
        <div>
        <TabContext value={value}>
            
                <TabList onChange ={handle_change} aria-label ="Menu">
                    <Tab label ="Wallet" value={1} className={classes.text}></Tab>
                    <Tab label ="Connect" value={2} className={classes.text}></Tab>
                </TabList>
                        <TabPanel value={1} className={classes.text}>

                        <Menu supportedTokens ={{supportedTokens}} />
                        </TabPanel>           
                <TabPanel value={2} className={classes.text}>
                    <Connect></Connect>
                </TabPanel>
                
        </TabContext>
        </div>
    )
}
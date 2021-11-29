import {Paper, Tab, Button} from '@material-ui/core'
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AccountContext} from "../../UseContext/Account_Context"
import { useContext } from 'react';
import {useEthers } from '@usedapp/core'

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
        marginTop: 40
    },
})

export default function Connect (){
    const {setAccount} = useContext(AccountContext)
    const { activateBrowserWallet, deactivate, account, active} = useEthers()
    const isConnected = account !== undefined

    const classes = theme();

    const check_bool = () =>{  
        setAccount(account)
    }  

    return(
                <div className ={classes.root}>
                    <Paper className ={classes.paper}>       
                    <p className ={classes.text}> Connect your Wallet</p>            
                     
                     {
                        isConnected ?
                            (<Button color="primary" className={classes.button} variant= "contained" onClick={() => {     
                                
                                
                                deactivate();
                                }}>
                            Disconnect  {console.log("Disconnect address -->",account)}
                            {console.log("Active -->",active)}
                        </Button>)
                        :
                    
                        (<Button color="primary" className={classes.button} variant= "contained" onClick={() => {         
                            activateBrowserWallet();
                            
                            }}>
                            Activate {console.log("Activate address -->", account)}
                            {console.log("Active -->",active)}
                        </Button>)
                    }   
                    
                    
                    {check_bool()}

                    </Paper>
  
                </div>
    )
}
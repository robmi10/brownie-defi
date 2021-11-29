import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Input, CircularProgress } from '@material-ui/core';
import {useContractFunction, useEthers, useTokenBalance, useNotifications } from '@usedapp/core'
import {formatUnits} from "@ethersproject/units"
import { useState } from 'react';
import {constants, utils} from "ethers"
import {Contract} from "@ethersproject/contracts"
import Farm_token from "../../chain-info/contracts/Farm_token.json"
import networkMapping from "../../chain-info/deployments/map.json"
import ERC20 from "../../chain-info/contracts/Dapp_token.json"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
    })
    
export default function Stake({token}){
    const classes = theme();
    const{address} = token;
    const {account, chainId} = useEthers()
    const {notifications} = useNotifications()
    
    const {abi} = Farm_token;

    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["Farm_token"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const ERC20ABI = ERC20.abi
    const ERC20Interface = new utils.Interface(ERC20ABI)
    const ERC20Contract = new Contract(address, ERC20Interface)

    
 
    const {send: approveERC20stake, state: approveERC20state} = 
    useContractFunction(ERC20Contract, "approve", 
    { transactionName: 'Approve ERC20 transfer' }) 

    const approve = (amount) =>{
        approveERC20stake(tokenFarmAddress, amount)
    }

    const [amount, setAmount] = useState()

    const [amountStake, setAmountStake] = useState()

    const {send: stakeERC20, state: stakeERC20state} = 
    useContractFunction(tokenFarmContract, "stake", 
    { transactionName: 'Stake ERC20'  }) 



    const isMining = approveERC20state.status === "Mining" || stakeERC20state.status ==="Mining"

    //console.log("isMining --->", isMining)

    React.useEffect(() => {
        if(approveERC20state.status === "Success" && amount != 0){
            console.log("ERC20 is Approved!")
            stakeERC20(amountStake, address)
            setAmount(0)
            setapproveERC20status(true)
            setstakeERC20status(false)
        }
        
        if(stakeERC20state.status === "Success"){
            console.log("Staked sucessfully!")
            setapproveERC20status(false)
            setstakeERC20status(true)
        }
    
    }, [notifications, stakeERC20state, approveERC20state, amountStake, address])

    const handle_submit =() =>{
        
        const amoutToWei = amount ? utils.parseEther(amount.toString()) : 0
        
        approve(amoutToWei)
        setAmountStake(amoutToWei)
    }
 

    const handle_change = (event, e) =>{
        console.log("Newvalue-->", event.target.value)
        setAmount(event.target.value)
    }

    const tokenBalance = useTokenBalance(address, account)
    const formatted_balance = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)): 0

    const [approveERC20status, setapproveERC20status] = useState(false)
    const [stakeERC20status, setstakeERC20status] = useState(false)

    const handleClose = () =>{
        setapproveERC20status(false)
        setstakeERC20status(false)
    }

    const open = () =>{
        setapproveERC20status(true)
        setstakeERC20status(true)
    }

    return(
        <div className={classes.root}>
            <Input value={amount} onChange={handle_change} color="primary" className={classes.text} variant= "contained"/>
            <Button 
            onClick={handle_submit} 
            color="primary"
            variant= "contained"
            disabled ={isMining}
             >{isMining ? <CircularProgress size={26}/>: "Stake!"}
             
             
             </Button>
            
            <Snackbar
            open={approveERC20status} autoHideDuration={6000} onClose={handleClose}
            >
                <Alert severity="success">ERC20 is approved!</Alert>
            </Snackbar>

            <Snackbar
            open={stakeERC20status} autoHideDuration={6000} onClose={handleClose}
            >
                <Alert severity="success">Staking succeded!</Alert>
            </Snackbar>
        </div>
    )
}
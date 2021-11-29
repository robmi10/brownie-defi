import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Input, CircularProgress } from '@material-ui/core';
import {useContractFunction, useEthers, useTokenBalance, useNotifications, useEtherBalance } from '@usedapp/core'
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
    
export default function UnStake({token}){
    
    const classes = theme();
    const{address} = token;
    const {account, chainId} = useEthers()
    const {notifications} = useNotifications()
    
    const {abi} = Farm_token;

    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["Farm_token"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    console.log("tokenFarmAddress ---->", tokenFarmAddress)
    
    const ERC20ABI = ERC20.abi
    const ERC20Interface = new utils.Interface(ERC20ABI)
    const ERC20Contract = new Contract(address, ERC20Interface)

    const userBalance = useEtherBalance(account)
    const stakingBalance = useEtherBalance(address)


 
    const {send: approveERC20stake, state: approveERC20state} = 
    useContractFunction(tokenFarmContract, "approve", 
    { transactionName: 'Approve ERC20 transfer' }) 


    const {send: UnStake, state: UnStakeStatus} = 
    useContractFunction(tokenFarmContract, "unstake", 
    { transactionName: 'Unstake ERC20 tokens' }) 

    const {send: IssueRewards, state: IssueRewardsStatus} = 
    useContractFunction(tokenFarmContract, "issue_tokens", 
    { transactionName: 'IssueRewards tokens' }) 

    const approve = (amount) =>{
        approveERC20stake(tokenFarmAddress, amount)
    }

    const [amount, setAmount] = useState()

    const [amountStake, setAmountStake] = useState()
      
    const isMining = UnStakeStatus.status === "Mining" || IssueRewardsStatus.status ==="Mining"
    
    

    React.useEffect(() => {
        console.log("UnStakeStatus.status ---_>", UnStakeStatus.status)
        if(IssueRewardsStatus.status === "Success"  && amount != 0 && UnStakeStatus.status !== "Mining"){
            console.log("Issue rewards!")
            //UnStake(address)
            //setIssueRewards(true)
            setUnstakeERC20status(true)
        }
        if(UnStakeStatus.status === "Success"){
            console.log("ERC20 is Unstaked!")
            //IssueRewards(address, account)
            //setUnstakeERC20status(true)
        }
        
    }, [notifications, UnStakeStatus, IssueRewardsStatus])

    const handle_submit =() =>{
        const amoutToWei = amount ? utils.parseEther(amount.toString()) : 0
        console.log("amount -->", amount)
        console.log("address -->", address)
        //console.log("inside handle submit IssueRewards-->", IssueRewards(address, account))
        console.log("inside handle submit UnStake-->", UnStake(address))
    }

    const tokenBalance = useTokenBalance(address, account)
    const formatted_balance = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)): 0

    const [IssueRewardERC20Status, setIssueRewards] = useState(false)
    const [UnstakeERC20status, setUnstakeERC20status] = useState(false)

    const handleClose = () =>{
        setIssueRewards(false)
        setUnstakeERC20status(false)
    }

    const open = () =>{
        setIssueRewards(true)
        setUnstakeERC20status(true)
    }

    return(
        <div className={classes.root}>
            <Button 
            onClick={handle_submit} 
            color="primary"
            variant= "contained"
            disabled ={isMining}
             >{isMining ? <CircularProgress size={26}/>: "Unstake!"}
             
             
             </Button>
            
            <Snackbar
            open={UnstakeERC20status} autoHideDuration={6000} onClose={handleClose}
            >
                <Alert severity="success">Unstaking succeded!</Alert>
            </Snackbar>

            <Snackbar
            open={IssueRewardERC20Status} autoHideDuration={6000} onClose={handleClose}
            >
                <Alert severity="success">Issue rewards succeded!</Alert>
            </Snackbar>
        </div>
    )
}
import {AppBar, Toolbar, Typography, createTheme, ThemeProvider, IconButton} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles';
import {AccountContext} from "../UseContext/Account_Context"
import { useContext } from 'react';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    text:{
        color: 'rgb(255, 255, 255)',
    },
});

const theme = createTheme ({
    palette:{
        primary:{
            main: '#9765F4'
        }
    }
})

function Navbar({props}) {
    const classes = useStyles()
    const {account_address} = useContext(AccountContext)
    
    console.log("INSIDE NAVBAR account_address->", account_address)
    
  return (
    
    <div className={useStyles.root}>
        <ThemeProvider theme ={theme}>
            <AppBar position="static" color = 'primary'>
                <Toolbar >
                    <Typography >
                        <IconButton>
                            <AccountCircle className={classes.text}/>
                        </IconButton>
                    </Typography>
                    <Typography align= "right" style = {{align: "right"}}>
                        {account_address} 
                    </Typography>
                </Toolbar>
            </AppBar>
    </ThemeProvider>
    </div>
   
  );
}

export default Navbar;
import { createContext } from "react";
import { useState } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({children}) =>{
    const [account_address, setAccount] = useState('')

    const [token_list, setTokenList] = useState()
    
    return(
        <AccountContext.Provider value ={{account_address, setAccount, token_list, setTokenList}}>
            {children}
        </AccountContext.Provider>
    )
}
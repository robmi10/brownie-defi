import './App.css';
import Navbar from './components/navbar';
import { ChainId, DAppProvider} from '@usedapp/core'
import { AccountProvider } from './UseContext/Account_Context';
import Contracts from './components/contracts';

const config = {
  supportedChains: [ChainId.Rinkeby],
  notifications:{
    expirationPeriod: 1000,
    checkInterval: 1000
  }
}


function App() {

  return (
        <DAppProvider config = {config}>
            <AccountProvider>
            <div className="App">
                <Navbar />
                <Contracts/>
            </div>
            </AccountProvider>
        </DAppProvider>
     
  
  );
}

export default App;

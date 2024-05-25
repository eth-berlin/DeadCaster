import React from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const contractAddress = '0x49C9370e6152F312aefEA19D55AE89f11ca30cf4';

  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('value');
  const calldata = urlParams.get('calldata');



  const sendTransaction = async () => {
    if (typeof window.ethereum !== 'undefined') {

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x5aff",
          rpcUrls: ["https://testnet.sapphire.oasis.io"],
          chainName: "Oasis Testnet",
          nativeCurrency: {
            name: "TEST",
            symbol: "TEST",
            decimals: 18
          },
          blockExplorerUrls: ["https://explorer.oasis.io/testnet/sapphire"]
        }]
      });

      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);

      const transaction = {
        to: contractAddress,
        value: ethers.parseEther(value),
        data: calldata,
      };
      (await signer).populateTransaction(transaction);
      (await signer).sendTransaction(transaction);
    } else {
      console.log('Ethereum wallet not detected');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DeadCaster</h1>
        <button onClick={sendTransaction}>Create secret & activate switch</button>
      </header>
    </div>
  );
}

export default App;
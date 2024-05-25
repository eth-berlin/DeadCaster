import React from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const contractAddress = '0x131CF758d9EF6bcA88928442DC715c8Fdc113952';

  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('value');
  const calldata = urlParams.get('calldata');

  const sendTransaction = async () => {
    if (typeof window.ethereum !== 'undefined') {
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
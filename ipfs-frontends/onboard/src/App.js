import React from 'react';
import { ethers } from 'ethers';
import './App.css';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import logo from './ethlogober.png';


function App() {
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const contractAddress = '0x069D53c961Af6A37cF14b2cC2667f20f1D8E4C98';

  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('value');
  const calldata = urlParams.get('calldata');
  const url = window.location.href;
  const urlWithoutHttps = url.replace('https://', '');



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

      const signer = sapphire.wrap(
        new ethers.providers.Web3Provider(window.ethereum).getSigner(),
      );

      const transaction = {
        to: contractAddress,
        value: ethers.utils.parseEther(value),
        data: calldata,
      };
      await signer.sendTransaction(transaction);



    } else {
      console.log('Wallet not found');
    }

  };

  return (
    <div className="App">
      <header className="App-header">
        {(typeof window.ethereum !== 'undefined') ? (

          <>        <img src={logo} alt="Logo" width={"50%"} height={"50%"} />

            <button onClick={sendTransaction}>Execute transaction</button><br />
            <p>need testnet tokens for Sapphire?</p>
            <button><a href="https://faucet.testnet.oasis.dev/">Faucet</a></button>
            <br />
          </>
        ) : (

          <><h4>You are on mobile?</h4><button><a href={`dapp://${urlWithoutHttps}`}> Click here</a></button></>
        )}
      </header>
    </div >
  );
}

export default App;
import React, { useState } from 'react';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import './App.css';
import { ethers } from 'ethers';
import DeadCaster from "./DeadCaster.json"

function App() {
  const [encrypted, setEncrypted] = useState('');
  const [secret, setSecret] = useState('');
  const [fid, setFID] = useState('');
  const [bounty, setBounty] = useState('');
  const [castJson, setCastJson] = useState('');
  const [castArray, setCastArray] = useState([]);
  const [decrypted, setDecrypted] = useState('');

  const url = window.location.href;
  const urlWithoutHttps = url.replace('https://', '');

  const contractAddress = '0x49C9370e6152F312aefEA19D55AE89f11ca30cf4';

  // The ABI of the smart contract
  const contractABI = [
    // Replace with the actual ABI of your smart contract
    'event SecretRevealed( address indexed creator, uint256 index, string scheme, uint256 indexed fid, uint256 bounty, bytes secret)'

  ];

  // functions

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const decryptText = () => {
    const bytes = AES.decrypt(encrypted, secret);
    const originalText = bytes.toString(Utf8);
    setDecrypted(originalText);
  };

  const fetchWarpCasterCasts = async (fid) => {
    const response = await fetch(`https://api.warpcast.com/v2/casts?fid=${fid}`);
    const data = await response.json();
    return data;
  };

  // const listenForSecretRevealedEvent = async () => {
  //   // Initialize the provider


  //   const provider = new ethers.BrowserProvider(window.ethereum);

  //   // Create a new contract instance
  //   const contract = new ethers.Contract(contractAddress, contractABI, provider);

  //   // Listen for the "secretRevealed" event
  //   contract.on('SecretRevealed', (creator, index, scheme, fid, bounty, secret) => {
  //     return { secret, fid, bounty };
  //   }
  //   );
  // };


  const getTextFromCasts = async (jsonData, secret) => {
    let textArray = [];
    if (jsonData.result && jsonData.result.casts) {
      jsonData.result.casts.forEach(cast => {
        if (cast.text) {
          try {
            const bytes = AES.decrypt(cast.text, secret);
            const originalText = bytes.toString(Utf8);
            if (originalText !== '') {
              textArray.push(originalText);
            }
          } catch (error) {
            console.error('Decryption failed:', error);
          }
        }
      });
    }
    return textArray;
  }


  // const revealSecretClaimBounty = async (secret) => {
  //   // do the function call with ethers
  //   const provider = new ethers.BrowserProvider(window.ethereum);

  //   const contract = new ethers.Contract(contractAddress, contractABI, provider);

  //   // Call the "revealSecret" function
  //   await contract.revealSecret(index);

  //   listenForSecretRevealedEvent().then(({ secret, fid, bounty }) => {
  //     setSecret(secret);
  //     fetchWarpCasterCasts(fid).then((data) => {
  //       setCastJson(data);
  //       getTextFromCasts(data, secret).then((texts) => {
  //         setCastArray(texts);
  //       });
  //     }
  //     );
  //   }
  //   );


  // }


  const testgetText = async (secret, fid) => {
    fetchWarpCasterCasts(fid).then((data) => {
      setCastJson(data);
      console.log(data);
      getTextFromCasts(data, secret).then((texts) => {
        setCastArray(texts);
        console.log(texts);
      });
    });
  };




  const getMetas = async () => {
    await requestAccount()

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()

    const Contract = new ethers.Contract(contractAddress, DeadCaster.abi, signer);
    const contract = await Contract.connect()

    const metas = await contract.getMetas(ethers.toBigInt(0).toString(), ethers.toBigInt(20).toString());
    console.log('metas', metas)
  }


  return (
    <div className="App">
      <header className="App-header">


        {(typeof window.ethereum !== 'undefined') ? (
          <>  <h1>deadcaster</h1>

            {/* <input type="text" value={encrypted} onChange={e => setEncrypted(e.target.value)} placeholder="Enter encrypted text" /> */}
            <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Enter secret" />
            <input type="text" value={fid} onChange={e => setFID(e.target.value)} placeholder="Enter FID" />

            <button onClick={() => { testgetText(secret, fid) }}>Get decrypted casts</button>
            <ul>
              {castArray.map((cast, index) => (
                <li key={index}>{cast}</li>
              ))}
            </ul>
          </>

        ) : (

          <><h4>You are on mobile?</h4><button><a href={`dapp://${urlWithoutHttps}`}> Click here</a></button></>
        )}
      </header>
    </div>
  );
}

export default App;
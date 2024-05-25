import React, { useState } from 'react';
import './App.css';
import AES from 'crypto-js/aes';


function App() {
  const [text, setText] = useState('');
  const [secret, setSecret] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const encryptText = () => {
    const ciphertext = AES.encrypt(text, secret).toString();
    setEncrypted(ciphertext);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>DeadCaster</h1>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter your cast" />
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Enter your secret" />
        <button onClick={encryptText}>Encrypt</button>
        <textarea readOnly value={encrypted} onClick={() => navigator.clipboard.writeText(encrypted)} />
        <button onClick={() => navigator.clipboard.writeText(encrypted)}>Copy Encrypted Text</button>
      </header>
    </div>
  );
}

export default App;
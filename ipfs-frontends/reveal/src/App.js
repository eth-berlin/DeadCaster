import React, { useState } from "react"
import AES from "crypto-js/aes"
import Utf8 from "crypto-js/enc-utf8"
import "./App.css"
import { ethers } from "ethers"
import DeadCaster from "./DeadCaster.json"

function App() {
  const [encrypted, setEncrypted] = useState("")
  const [secret, setSecret] = useState("")
  const [fid, setFID] = useState("")
  const [bounty, setBounty] = useState("")
  const [castJson, setCastJson] = useState("")
  const [decrypted, setDecrypted] = useState("")

  const [castArray, setCastArray] = useState([])

  const [username, setUsername] = useState("")

  const [metas, setMetas] = useState([])

  const url = window.location.href
  const urlWithoutHttps = url.replace("https://", "")

  const contractAddress = "0x069D53c961Af6A37cF14b2cC2667f20f1D8E4C98"

  // The ABI of the smart contract
  const contractABI = [
    // Replace with the actual ABI of your smart contract
    "event SecretRevealed( address indexed creator, uint256 index, string scheme, uint256 indexed fid, uint256 bounty, bytes secret)",
  ]

  // functions

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  const fetchWarpCasterCasts = async (fid) => {
    const response = await fetch(`https://api.warpcast.com/v2/casts?fid=${fid}`)
    const data = await response.json()
    return data
  }

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
    let textArray = []
    if (jsonData.result && jsonData.result.casts) {
      jsonData.result.casts.forEach((cast) => {
        if (cast.text) {
          try {
            const bytes = AES.decrypt(cast.text, secret)
            const originalText = bytes.toString(Utf8)
            if (originalText !== "") {
              textArray.push(originalText)
            }
          } catch (error) {
            console.error("Decryption failed:", error)
          }
        }
      })

      if (textArray.length === 0) {
        textArray.push("Failed to decrypt text, correct secret?")
      }
    }
    return textArray
  }

  const usernameByFID = async (fid) => {
    const response = await fetch(`https://api.warpcast.com/v2/casts?fid=${fid}`)
    const data = await response.json()
    let username = data.result.casts[0].author.username

    console.log("username", username)

    setUsername(username)

    return username
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
      console.log(data)

      setCastJson(data)

      getTextFromCasts(data, secret).then((texts) => {
        setCastArray(texts)
        console.log("texts", texts[0])
      })
    })
  }

  const getMetas = async () => {
    await requestAccount()

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(
      contractAddress,
      DeadCaster.abi,
      signer
    )
    const metas = await contract.getMetas(0, 20)

    setMetas(metas)
  }

  const revealSecret = async (index) => {
    await requestAccount()

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(
      contractAddress,
      DeadCaster.abi,
      signer
    )
    await contract.revealSecret(index)

    console.log("bounty claimed")
  }

  const revealSecretView = async (index) => {
    await requestAccount()

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(
      contractAddress,
      DeadCaster.abi,
      signer
    )
    const secret = await contract.revealSecretView(index)

    console.log("secret", ethers.toUtf8String(secret))
    setSecret(ethers.toUtf8String(secret))
  }

  return (
    <div className="App">
      <header className="App-header">
        {typeof window.ethereum !== "undefined" ? (
          <>
            <h1>deadcaster</h1>
            {/* <input type="text" value={encrypted} onChange={e => setEncrypted(e.target.value)} placeholder="Enter encrypted text" /> */}
            <button
              onClick={() => {
                getMetas()
              }}
            >
              Get secret metas
            </button>

            <ul>
              {metas.map((meta, i) => {
                const [_creator, _longevity, _scheme, fid, bounty, bountyPaid] =
                  meta

                return (
                  <div key={`${fid.toString()}-${i}`}>
                    <span className="text-xs mr-2 inline-block">
                      Index: {i},{" "}
                    </span>
                    <span className="text-xs mr-2 inline-block">
                      Fid:{" "}
                      <button
                        onClick={() => {
                          usernameByFID(fid)
                          setFID(fid.toString())
                        }}
                      >
                        {fid.toString()},{" "}
                      </button>
                    </span>
                    <span className="text-xs mr-2 inline-block">
                      Bounty: {ethers.formatUnits(bounty.toString())} ETH,{" "}
                    </span>
                    <span className="text-xs mr-2 inline-block">
                      Claimed: {bountyPaid ? "Yes" : "No"}{" "}
                    </span>
                    {/* <span className="text-xs">
                      Longevity: {(parseInt(longevity.toString()) / 60).toFixed(2)} minutes
                    </span> */}
                    <button
                      onClick={() =>
                        bountyPaid ? revealSecretView(i) : revealSecret(i)
                      }
                      className="ml-4"
                    >
                      {bountyPaid ? "Reveal" : "Claim"}
                    </button>
                  </div>
                )
              })}
            </ul>

            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter secret"
            />
            <div>
              <input
                type="text"
                value={fid}
                onChange={(e) => setFID(e.target.value)}
                placeholder="Enter FID"
                className="inline-block"
              />
              <button
                onClick={() => {
                  usernameByFID(fid)
                }}
                className="m-4 inline-block"
              >
                Get Username by FID
              </button>

              <span>{username}</span>
            </div>
            <button
              onClick={() => {
                testgetText(secret, fid)
              }}
              className="mt-4 inline-block"
            >
              Get decrypted casts
            </button>

            <ul>
              {castArray.map((cast, index) => {
                return <li key={index}>{cast}</li>
              })}
            </ul>
          </>
        ) : (
          <>
            <h4>You are on mobile?</h4>
            <button>
              <a href={`dapp://${urlWithoutHttps}`}>Click here</a>
            </button>
          </>
        )}
      </header>
    </div>
  )
}

export default App

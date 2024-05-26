# deadcaster

## Requirements

- An Ethereum wallet.
- Testnet tokens for Sapphire. [Faucet is here](https://faucet.testnet.oasis.io/)
- A password and secrets Messages only to be revealed when you are dead.
- [Add sapphire network to your wallet](https://chainlist.org/?testnets=true&search=oasis+sapphire+testnet)

## Usage

- See Farcaster cast: <https://warpcast.com/flobrown.eth/0xa89d693c>

# The problem Deadcaster solves

**tl;dr: Your easy to use Dead Human Switch**

Deadcaster addresses the critical need for secure, decentralized and incentivized information reveal when individuals become inactive or incapacitated.
_Imagine a journalist in a hostile environment ensuring their critical findings are revealed if they are silenced._

# Architecture

![frames architecture](https://i.imgur.com/Edh6o8u.jpeg)

# Challenges you ran into

- Currently, users need to navigate to an external website to make TXs on Sapphire (Oasis). In the future, with Farcaster's on-frame TXs, this experience can be integrated into a single client application.
- Relying solely on Sapphire poses a risk if TEE hardware experiences disruptions. Utilizing multiple privacy-preserving compute mechanisms, such as other TEE or FHE networks, can ensure the security of revealing secret, even if one solution fails. Additionally, incorporating hardware wallets as a deadhuman switch via ZK proofs can provide users with more options depending on the circumstances.
- Using Farcaster's hubs to store encrypted deadcasts requires a hub rental contract and insurance to ensure the casts remain on the hubs as long as the user confirms their lively status.

# Technology used

- [frames.js](https://framesjs.org/) - Farcaster frames Framework
- [Oasis Sapphire](https://oasisprotocol.org/sapphire) - TEE EVM for Smart contracts handling secret keys
- IPFS - The logic of the client to interact with our dApp.

# Deployed here

- Onboarding/Reveal secret relayer:
  https://deadcaster-onboard.vercel.app | IPFS: QmZzvaHCB2TNVcYwzum6TMNcCTpcnVx5TpQyL3CxywrEzk

- Message Encrypter:
  https://deadcaster-encrypt.vercel.app/ | IPFS: QmWo4HeLRKzJ2ckTr4sAbe25FUxfkffF3vC2Gie9ifaqPv

- Reveal Messages:
  https://deadcaster-reveal.vercel.app/ | IPFS: QmXXU1Sa51K5UwfV34NBMxBE13Ze51fbnk9QEkjqcMEGND

- Farcaster Frame:
  https://deadcaster-frame.vercel.app/ | IPFS: QmNhDMtKj6BKTvg12sms6dE8aYQM4YLRWzfUZw3kgohQA4

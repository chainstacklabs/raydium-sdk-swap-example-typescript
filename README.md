<img width="1200" alt="Labs" src="https://user-images.githubusercontent.com/99700157/213291931-5a822628-5b8a-4768-980d-65f324985d32.png">

<p>
 <h3 align="center">Chainstack is the leading suite of services connecting developers with Web3 infrastructure</h3>
</p>

<p align="center">
  <a target="_blank" href="https://chainstack.com/build-better-with-ethereum/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Ethereum.svg" /></a>&nbsp;  
  <a target="_blank" href="https://chainstack.com/build-better-with-bnb-smart-chain/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/BNB.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-polygon/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Polygon.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-avalanche/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Avalanche.svg" /></a>&nbsp;
  <a target="_blank" href="https://chainstack.com/build-better-with-solana/"><img src="https://github.com/soos3d/blockchain-badges/blob/main/protocols_badges/Solana.svg" /></a>&nbsp;
</p>

<p align="center">
  <a target="_blank" href="https://chainstack.com/protocols/">Supported protocols</a> •
  <a target="_blank" href="https://chainstack.com/blog/">Chainstack blog</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Chainstack docs</a> •
  <a target="_blank" href="https://docs.chainstack.com/quickstart/">Blockchain API reference</a> •
  <a target="_blank" href="https://console.chainstack.com/user/account/create">Start for free</a>
</p>

# Raydium SDK Swap Example

This project demonstrates how to perform a token swap on the Solana blockchain using Raydium and Chainstack. The example specifically illustrates swapping SOL (native Solana token) for USDC (a stablecoin).

Find the full [guide on the Chainstack Developer Portal](https://docs.chainstack.com/docs/solana-how-to-perform-token-swaps-using-the-raydium-sdk).

> Shoutout to [precious-void](https://github.com/precious-void) for the the [base code](https://github.com/precious-void/raydium-swap) used for this project!

## Features

- Utilizes the Raydium SDK for interacting with the Solana blockchain.
- Supports both versioned and legacy transactions.
- Allows simulation of swap transactions before execution.
- Easy configuration for swap parameters through a dedicated config file.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v18 or above recommended)
- Yarn
- A Solana wallet with some SOL for testing the swap
- An environment file (.env) with your RPC URL and WALLET_PRIVATE_KEY

## Chainstack Solana node

Deploy a Solana node on Chainstack; the following steps will guide you:

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).
2. [Deploy a node](https://docs.chainstack.com/docs/manage-your-networks#join-a-public-network).
3. [View node access and credentials](https://docs.chainstack.com/docs/manage-your-node#view-node-access-and-credentials).

## Environment variables

Add your RPC endoint and private key to a `.env` file:

```env
RPC_URL=YOUR_RPC_URL
WALLET_PRIVATE_KEY=YOUR_PRIVATE_KEY
```

## Installation

Clone the repository locally and install the dependencies:

```bash
git clone https://github.com/soos3d/raydium-sdk-swap-example.git
cd raydium-sdk-swap-example
yarn
```

## Usage

Edit the configuration in `src/swapConfig.ts` editing:

- Select if you want to send the transaction or only simulate
- The amount to swap
- The tokens to swap
- The liquidity file to pull the pool info from

```ts
export const swapConfig = {
  executeSwap: false, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.01, // Swap 0.01 SOL for USDT in this example
  tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
  tokenBAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC address
  maxLamports: 1000000, // Max lamports allowed for fees
  direction: "in" as "in" | "out", // Swap direction: 'in' or 'out'
  liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
  maxRetries: 10
};
```

Then run:

```sh
yarn swap
```

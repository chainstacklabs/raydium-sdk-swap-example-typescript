# Raydium SDK Swap Example

This project demonstrates how to perform a token swap on the Solana blockchain using Raydium's protocol. The example specifically illustrates swapping SOL (native Solana token) for USDC (a stablecoin).

## Features

- Utilizes the Raydium SDK for interacting with the Solana blockchain.
- Supports both versioned and legacy transactions.
- Allows simulation of swap transactions before execution.
- Easy configuration for swap parameters through a dedicated config file.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or above recommended)
- A Solana wallet with some SOL for testing the swap
- An environment file (.env) with your RPC URL and WALLET_PRIVATE_KEY

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

Then run:

```sh
yarn swap
```

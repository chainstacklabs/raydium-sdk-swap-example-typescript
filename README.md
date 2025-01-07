**>>WARNNING ON SCAMS IN ISSUES COMMENT SECTION<<**

The issues comment section is often targeted by scam bots willing to redirect you to an external resource and drain your funds.

I have enabled a GitHub actions script to detect the common patterns and tag them, which obviously is not 100% accurate.

The official maintainers are in the [MAINTAINERS.md](MAINTAINERS.md) file.

Not everyone is a scammer though, sometimes there are helpful outside devs who comment and I absolutely appreciate it.

**>>END OF WARNING<<**

# TLDR quick run

Download the latest Raydium mainnet.json to the project root (it's a ~500 MB file):

```
wget https://api.raydium.io/v2/sdk/liquidity/mainnet.json
```

Set the tokenA and tokenB in `src/swapConfig.ts`.

Now that you have the the 500 MB `mainnet.json` that has the entrirety of info on liquidity pairs, and you have the correct pairs set in `swapConfig.ts`, you want to trim the `mainnet.json` file to have only the necessary liquidity info pertaining to your tokenA & tokenB. So run:

```
ts-node src/trimMainnet.ts
```

This will produce `src/trimmed_mainnet.json` that takes less than a second to load vs minutes for `mainnet.json`.

Make sure you have the Chainstack node & your private key set in `.env`. Make sure you have all dependencies installed with `yarn`.

Run the swap:

```
yarn swap
```
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

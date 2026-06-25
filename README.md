**>>WARNNING ON SCAMS IN ISSUES COMMENT SECTION<<**

The issues comment section is often targeted by scam bots willing to redirect you to an external resource and drain your funds.

I have enabled a GitHub actions script to detect the common patterns and tag them, which obviously is not 100% accurate.

The official maintainers are in the [MAINTAINERS.md](MAINTAINERS.md) file.

Not everyone is a scammer though, sometimes there are helpful outside devs who comment and I absolutely appreciate it.

**>>END OF WARNING<<**

# TLDR quick run

This example uses the **Raydium SDK v2** (`@raydium-io/raydium-sdk-v2`). The v2 SDK fetches pool data from Raydium's API/RPC, so there's no more ~500 MB `mainnet.json` to download and trim.

1. Install dependencies with `yarn`.
2. Set your Chainstack node and private key in `.env` (`RPC_URL`, `WALLET_PRIVATE_KEY`).
3. In `src/swapConfig.ts`, set the `poolId` (the Raydium AMM v4 pool, default SOL-USDC), the `inputMint` and amount, and `executeSwap` (`false` simulates, `true` sends).

Run the swap:

```
yarn swap
```
# Raydium SDK Swap Example

This project demonstrates how to perform a token swap on the Solana blockchain using Raydium and Chainstack. The example specifically illustrates swapping SOL (native Solana token) for USDC (a stablecoin).

Find the full [guide on the Chainstack Developer Portal](https://docs.chainstack.com/docs/solana-how-to-perform-token-swaps-using-the-raydium-sdk).

> Shoutout to [precious-void](https://github.com/precious-void) for the the [base code](https://github.com/precious-void/raydium-swap) used for this project!

## Features

- Uses the [Raydium SDK v2](https://github.com/raydium-io/raydium-sdk-V2) (`@raydium-io/raydium-sdk-v2`) to swap on Raydium AMM pools.
- Fetches pool data from Raydium's API/RPC — no large local pool file to download or trim.
- Builds versioned (v0) transactions with a configurable priority fee.
- Simulates the swap before execution.
- Easy configuration through a dedicated config file.

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
git clone https://github.com/chainstacklabs/raydium-sdk-swap-example-typescript.git
cd raydium-sdk-swap-example-typescript
yarn
```

## Usage

Edit the configuration in `src/swapConfig.ts`:

- `executeSwap` — `false` simulates the swap, `true` sends it
- `poolId` — the Raydium AMM v4 pool to swap on (default: SOL-USDC). Find one on [raydium.io](https://raydium.io) or via `raydium.api.fetchPoolByMints`
- `inputMint` + `tokenAAmount` — the token you swap from, and how much
- `slippage` — slippage tolerance (`0.01` = 1%)
- `computeUnitPriceMicroLamports` — priority fee, in micro-lamports per compute unit

```ts
export const swapConfig = {
  executeSwap: false, // true = send the transaction, false = simulate it
  poolId: "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2", // SOL-USDC AMM v4 pool
  inputMint: "So11111111111111111111111111111111111111112", // the token you swap from (SOL)
  tokenAAmount: 0.001, // amount of inputMint to swap, in human units
  slippage: 0.01, // 1%
  computeUnitPriceMicroLamports: 100_000, // priority fee (micro-lamports per CU)
  maxRetries: 20,
};
```

Then run:

```sh
yarn swap
```

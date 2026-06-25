export const swapConfig = {
  executeSwap: false, // true = send the transaction, false = simulate it
  // Raydium AMM v4 pool id for the pair. Default: SOL-USDC.
  // Find a pool id on https://raydium.io, or look one up with raydium.api.fetchPoolByMints.
  poolId: "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2",
  inputMint: "So11111111111111111111111111111111111111112", // the token you swap from (SOL here)
  tokenAAmount: 0.001, // amount of inputMint to swap, in human units
  slippage: 0.01, // 1% — range 1 ~ 0.0001 (100% ~ 0.01%)
  computeUnitPriceMicroLamports: 100_000, // priority fee, in micro-lamports per compute unit
  maxRetries: 20,
};

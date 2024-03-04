export const swapConfig = {
    executeSwap: true, // Send tx when true, simulate tx when false
    useVersionedTransaction: true,
    tokenAAmount: 0.01, // Swap 0.01 SOL for USDT in this example
    tokenAAddress: 'So11111111111111111111111111111111111111112', // Token to swap for the other
    tokenBAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    LPpoolAddress: '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu',
    maxLamports: 1000000, // Max lamports allowed for fees
    direction: 'in' as 'in' | 'out', // Swap direction: 'in' or 'out'
    liquidityFile: 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json'
  };
  
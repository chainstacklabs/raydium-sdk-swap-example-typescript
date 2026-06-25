import { VersionedTransaction } from '@solana/web3.js';
import RaydiumSwap from './RaydiumSwap';
import { swapConfig } from './swapConfig';

/**
 * Performs a token swap on Raydium using the SDK v2.
 * Depending on swapConfig.executeSwap, it either sends or simulates the transaction.
 */
const swap = async () => {
  const raydiumSwap = new RaydiumSwap();
  await raydiumSwap.initialize();
  console.log('Raydium SDK v2 initialized');
  console.log(
    `Swapping ${swapConfig.tokenAAmount} of ${swapConfig.inputMint} on pool ${swapConfig.poolId}...`
  );

  // Build the swap transaction (fetches pool data, computes the output, builds the tx).
  const result = await raydiumSwap.getSwapTransaction(
    swapConfig.poolId,
    swapConfig.inputMint,
    swapConfig.tokenAAmount,
    swapConfig.slippage,
    swapConfig.computeUnitPriceMicroLamports
  );

  if (swapConfig.executeSwap) {
    // Sign and send through your node.
    const { txId } = await result.execute({ sendAndConfirm: true });
    console.log(`https://solscan.io/tx/${txId}`);
  } else {
    // Simulate without sending.
    const simRes = await raydiumSwap.simulate(result.transaction as VersionedTransaction);
    console.log(simRes.value);
  }

  process.exit(0);
};

swap();

import RaydiumSwap from './RaydiumSwap';
import { Transaction, VersionedTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import 'dotenv/config';

/**
 * Performs a token swap on the Raydium protocol.
 * Depending on the configuration, it can execute the swap or simulate it.
 */
const swap = async () => {
  /**
   * The RaydiumSwap instance for handling swaps.
   */
  const raydiumSwap = new RaydiumSwap(process.env.PrivateURL, process.env.SubPraviteKey);
  console.log(`Raydium swap initialized`);
  console.log(`Swapping ${process.env.TokenAAmount} of ${process.env.TokenAAddress} for ${process.env.TokenBAddress}...`)

  /**
   * Load pool keys from the Raydium API to enable finding pool information.
   */
  await raydiumSwap.loadPoolKeys(process.env.LiquidityFile);
  console.log(`Loaded pool keys`);

  /**
   * Find pool information for the given token pair.
   */
  const poolInfo = raydiumSwap.findPoolInfoForTokens(process.env.TokenAAddress, process.env.TokenBAddress);
  if (!poolInfo) {
    console.error('Pool info not found');
    return 'Pool info not found';
  } else {
    console.log('Found pool info');
  }

  /**
   * Prepare the swap transaction with the given parameters.
   */

  const tokenAAmount: number = Number(process.env.TokenAAmount);
  const useVersionedTransaction: boolean = Boolean(process.env.UseVersionedTransaction);
  const fixedSide = process.env.FIXED_SIDE === 'in' ? 'in' : 'out';
  const slippageRate: number = Number(process.env.SlippageRate)
  const fee: number = Number(process.env.Fee)

  const tx = await raydiumSwap.getSwapTransaction(
    process.env.TokenBAddress,
    tokenAAmount,
    poolInfo,
    fee * LAMPORTS_PER_SOL,
    useVersionedTransaction,
    fixedSide,
    slippageRate
  );

  const executeSwap: boolean = Boolean(process.env.ExecuteSwap);
  const maxRetries: number = Number(process.env.MaxRetries);
  /**
   * Depending on the configuration, execute or simulate the swap.
   */
  if (executeSwap) {
    /**
     * Send the transaction to the network and log the transaction ID.
     */
    const txid = useVersionedTransaction
      ? await raydiumSwap.sendVersionedTransaction(tx as VersionedTransaction, maxRetries)
      : await raydiumSwap.sendLegacyTransaction(tx as Transaction, maxRetries);

    console.log(`https://solscan.io/tx/${txid}`);

  } else {
    /**
     * Simulate the transaction and log the result.
     */
    const simRes = useVersionedTransaction
      ? await raydiumSwap.simulateVersionedTransaction(tx as VersionedTransaction)
      : await raydiumSwap.simulateLegacyTransaction(tx as Transaction);

    console.log(simRes);
  }
};

swap();

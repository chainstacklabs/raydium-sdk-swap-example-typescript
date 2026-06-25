import {
  ApiV3PoolInfoStandardItem,
  AmmV4Keys,
  AmmRpcData,
  Raydium,
} from '@raydium-io/raydium-sdk-v2'
import { VersionedTransaction } from '@solana/web3.js'
import BN from 'bn.js'
import { initSdk, connection, txVersion } from './config'

/**
 * Class representing a Raydium swap operation, built on the Raydium SDK v2.
 *
 * The v1 SDK (`@raydium-io/raydium-sdk`) is end-of-life. The v2 SDK fetches pool
 * data from Raydium's API/RPC, so there is no more multi-hundred-MB `mainnet.json`
 * to download and trim — you identify the pool by its id.
 */
class RaydiumSwap {
  raydium!: Raydium

  /** Load the SDK (wallet + node come from the .env via config.ts). */
  async initialize() {
    this.raydium = await initSdk()
  }

  /**
   * Fetch the pool info, keys, and on-chain reserves for an AMM v4 pool by id.
   */
  async getPoolData(poolId: string): Promise<{
    poolInfo: ApiV3PoolInfoStandardItem
    poolKeys: AmmV4Keys
    rpcData: AmmRpcData
  }> {
    const data = await this.raydium.api.fetchPoolById({ ids: poolId })
    const poolInfo = data[0] as ApiV3PoolInfoStandardItem
    const poolKeys = await this.raydium.liquidity.getAmmPoolKeys(poolId)
    const rpcData = await this.raydium.liquidity.getRpcPoolInfo(poolId)
    return { poolInfo, poolKeys, rpcData }
  }

  /**
   * Build a swap of `amountIn` (in human units) of `inputMint` on the given pool.
   * Returns the SDK build result, including `execute()` (sign + optionally send)
   * and the built `transaction`.
   */
  async getSwapTransaction(
    poolId: string,
    inputMint: string,
    amountIn: number,
    slippage: number,
    computeUnitPriceMicroLamports: number
  ) {
    const { poolInfo, poolKeys, rpcData } = await this.getPoolData(poolId)

    if (poolInfo.mintA.address !== inputMint && poolInfo.mintB.address !== inputMint) {
      throw new Error('input mint does not match the pool')
    }

    const baseIn = inputMint === poolInfo.mintA.address
    const [mintIn, mintOut] = baseIn ? [poolInfo.mintA, poolInfo.mintB] : [poolInfo.mintB, poolInfo.mintA]
    const rawAmountIn = new BN(Math.floor(amountIn * 10 ** mintIn.decimals))

    const out = this.raydium.liquidity.computeAmountOut({
      poolInfo: {
        ...poolInfo,
        baseReserve: rpcData.baseReserve,
        quoteReserve: rpcData.quoteReserve,
        status: rpcData.status.toNumber(),
        version: 4,
      },
      amountIn: rawAmountIn,
      mintIn: mintIn.address,
      mintOut: mintOut.address,
      slippage,
    })

    console.log(
      `Swapping ${amountIn} ${mintIn.symbol || mintIn.address} -> ` +
        `~${Number(out.amountOut.toString()) / 10 ** mintOut.decimals} ${mintOut.symbol || mintOut.address} ` +
        `(min ${Number(out.minAmountOut.toString()) / 10 ** mintOut.decimals})`
    )

    return this.raydium.liquidity.swap({
      poolInfo,
      poolKeys,
      amountIn: rawAmountIn,
      amountOut: out.minAmountOut, // out.amountOut is the amount without slippage
      fixedSide: 'in',
      inputMint: mintIn.address,
      txVersion,
      computeBudgetConfig: {
        units: 600_000,
        microLamports: computeUnitPriceMicroLamports,
      },
    })
  }

  /** Simulate the built transaction without sending it. */
  async simulate(transaction: VersionedTransaction) {
    return connection.simulateTransaction(transaction, { sigVerify: false })
  }
}

export default RaydiumSwap

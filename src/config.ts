import { Raydium, TxVersion } from '@raydium-io/raydium-sdk-v2'
import { Connection, Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import 'dotenv/config'

// Use a v0 (versioned) transaction. Use TxVersion.LEGACY for a legacy transaction.
export const txVersion = TxVersion.V0

export const connection = new Connection(process.env.RPC_URL || '', 'confirmed')
export const owner: Keypair = Keypair.fromSecretKey(bs58.decode(process.env.WALLET_PRIVATE_KEY || ''))

let raydium: Raydium | undefined

/**
 * Load (once) and return a Raydium SDK v2 instance bound to your wallet and node.
 * The SDK fetches token-account data lazily as needed.
 */
export const initSdk = async (): Promise<Raydium> => {
  if (raydium) return raydium
  raydium = await Raydium.load({
    owner,
    connection,
    cluster: 'mainnet',
    disableFeatureCheck: true,
    blockhashCommitment: 'finalized',
  })
  return raydium
}

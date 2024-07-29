import fs from 'fs';
import { swapConfig } from './swapConfig';

interface PoolInfo {
    id: string;
    baseMint: string;
    quoteMint: string;
    lpMint: string;
    version: number;
    programId: string;
    authority: string;
    openOrders: string;
    targetOrders: string;
    baseVault: string;
    quoteVault: string;
    withdrawQueue: string;
    lpVault: string;
    marketVersion: number;
    marketProgramId: string;
    marketId: string;
    marketAuthority: string;
    marketBaseVault: string;
    marketQuoteVault: string;
    marketBids: string;
    marketAsks: string;
    marketEventQueue: string;
}

function trimMainnetJson() {
    // Read the local mainnet.json file
    const mainnetData = JSON.parse(fs.readFileSync('../mainnet.json', 'utf-8'));

    // Get the token addresses from swapConfig
    const { tokenAAddress, tokenBAddress } = swapConfig;

    // Find the pool that matches the token pair in both official and unofficial pools
    const relevantPool = [...mainnetData.official, ...(mainnetData.unOfficial || [])].find((pool: PoolInfo) => 
        (pool.baseMint === tokenAAddress && pool.quoteMint === tokenBAddress) ||
        (pool.baseMint === tokenBAddress && pool.quoteMint === tokenAAddress)
    );

    if (!relevantPool) {
        console.error('No matching pool found for the given token pair');
        return;
    }

    // Create a new object with only the necessary information
    const trimmedData = {
        official: [relevantPool]
    };

    // Write the trimmed data to a new file
    fs.writeFileSync('trimmed_mainnet.json', JSON.stringify(trimmedData, null, 2));

    console.log('Trimmed mainnet.json file has been created as trimmed_mainnet.json');
}

trimMainnetJson();

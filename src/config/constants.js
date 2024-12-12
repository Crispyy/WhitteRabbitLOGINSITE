export const SOLANA_CLUSTER_URL = process.env.SOLANA_CLUSTER_URL || 'https://api.mainnet-beta.solana.com';
export const SOLANA_WS_URL = process.env.SOLANA_WS_URL || 'wss://api.mainnet-beta.solana.com';
export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

// Configuration des performances
export const MIN_PROFIT_THRESHOLD = 0.01; // en SOL
export const MAX_SLIPPAGE = 0.5; // 0.5%
export const GAS_ADJUSTMENT = 1.5;
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // millisecondes
export const TRANSACTION_TIMEOUT = 60000; // 60 secondes
export const MEMPOOL_BATCH_SIZE = 100;
export const CONCURRENT_TRANSACTIONS = 5;

// Configuration des DEX supportés
export const SUPPORTED_DEXS = {
  RAYDIUM: {
    programId: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
    minimumOrderSize: 0.1,
  },
  ORCA: {
    programId: '9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP',
    minimumOrderSize: 0.1,
  },
};

// Configuration Firebase
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC6581LD3Sfae9tjs671tn1CDNPZYRQpmA",
  authDomain: "mevbot1-befa8.firebaseapp.com",
  projectId: "mevbot1-befa8",
  storageBucket: "mevbot1-befa8.appspot.com",
  messagingSenderId: "315072366361",
  appId: "1:315072366361:web:518b0c80eb321c19f7a788"
};
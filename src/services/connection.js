import { Connection, Keypair } from '@solana/web3.js';
import { SOLANA_CLUSTER_URL, PRIVATE_KEY } from '../config/constants.js';
import logger from '../utils/logger.js';

export function createConnection() {
  try {
    return new Connection(SOLANA_CLUSTER_URL, 'confirmed');
  } catch (error) {
    logger.error('Failed to create Solana connection:', error);
    throw error;
  }
}

export function loadWallet() {
  try {
    if (!PRIVATE_KEY) {
      throw new Error('Private key not found in environment variables');
    }
    const secretKey = new Uint8Array(JSON.parse(PRIVATE_KEY));
    return Keypair.fromSecretKey(secretKey);
  } catch (error) {
    logger.error('Failed to load wallet:', error);
    throw error;
  }
}
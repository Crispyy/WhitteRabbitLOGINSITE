import { TransactionBuilder } from './builder.js';
import { validateOpportunity } from '../../utils/validation.js';
import { withRetry } from '../../utils/retry.js';
import { 
  MIN_PROFIT_THRESHOLD, 
  MAX_RETRIES, 
  CONCURRENT_TRANSACTIONS,
  TRANSACTION_TIMEOUT 
} from '../../config/constants.js';
import logger from '../../utils/logger.js';

export class TransactionExecutor {
  constructor(connection, wallet) {
    this.connection = connection;
    this.wallet = wallet;
    this.builder = new TransactionBuilder(connection);
    this.activeTransactions = new Set();
  }

  async executeTransaction(opportunity) {
    if (this.activeTransactions.size >= CONCURRENT_TRANSACTIONS) {
      logger.info('Limite de transactions concurrentes atteinte, ignorant l\'opportunité');
      return;
    }

    const transactionId = Date.now().toString();
    this.activeTransactions.add(transactionId);

    try {
      validateOpportunity(opportunity);

      if (!this.isProfitable(opportunity)) {
        logger.info('Opportunité en dessous du seuil de profit, ignorée');
        return;
      }

      const transaction = await this.builder.build(opportunity);
      const signature = await this.sendAndConfirmTransactionWithTimeout(transaction);
      
      logger.info(`Transaction exécutée avec succès: ${signature}`);
      return signature;
    } catch (error) {
      logger.error('Échec de l\'exécution de la transaction:', error);
      throw error;
    } finally {
      this.activeTransactions.delete(transactionId);
    }
  }

  isProfitable(opportunity) {
    return opportunity.expectedProfit >= MIN_PROFIT_THRESHOLD;
  }

  async sendAndConfirmTransactionWithTimeout(transaction) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Transaction timeout')), TRANSACTION_TIMEOUT);
    });

    const transactionPromise = withRetry(async () => {
      const signature = await this.connection.sendTransaction(
        transaction,
        [this.wallet],
        { skipPreflight: true } // Optimisation pour réduire la latence
      );
      
      await this.connection.confirmTransaction(signature, 'confirmed');
      return signature;
    }, MAX_RETRIES);

    return Promise.race([transactionPromise, timeoutPromise]);
  }
}
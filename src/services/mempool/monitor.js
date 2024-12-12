import { OpportunityAnalyzer } from './analyzer.js';
import { MEMPOOL_BATCH_SIZE } from '../../config/constants.js';
import logger from '../../utils/logger.js';

export class MempoolMonitor {
  constructor(connection) {
    this.connection = connection;
    this.subscriptionId = null;
    this.analyzer = new OpportunityAnalyzer();
    this.pendingTransactions = new Set();
    this.processingBatch = false;
  }

  async start(callback) {
    try {
      // Utilisation de WebSocket pour une meilleure performance
      this.subscriptionId = this.connection.onLogs(
        'all',
        (logs) => {
          if (logs.err) return;
          this.addToPendingTransactions(logs);
          this.processBatchIfNeeded(callback);
        },
        'processed'
      );

      logger.info('Surveillance du mempool démarrée avec WebSocket');
    } catch (error) {
      logger.error('Échec du démarrage de la surveillance du mempool:', error);
      throw error;
    }
  }

  stop() {
    if (this.subscriptionId) {
      this.connection.removeOnLogsListener(this.subscriptionId);
      this.subscriptionId = null;
      this.pendingTransactions.clear();
      logger.info('Surveillance du mempool arrêtée');
    }
  }

  addToPendingTransactions(logs) {
    if (this.pendingTransactions.size >= MEMPOOL_BATCH_SIZE) {
      this.pendingTransactions.clear(); // Éviter la surcharge de mémoire
    }
    this.pendingTransactions.add(logs);
  }

  async processBatchIfNeeded(callback) {
    if (this.processingBatch || this.pendingTransactions.size < MEMPOOL_BATCH_SIZE) {
      return;
    }

    this.processingBatch = true;
    try {
      const transactions = Array.from(this.pendingTransactions);
      this.pendingTransactions.clear();

      await Promise.all(
        transactions.map(async (logs) => {
          try {
            const opportunity = await this.analyzer.analyzeLogs(logs.logs);
            if (opportunity) {
              callback(opportunity);
            }
          } catch (error) {
            logger.error('Erreur lors de l\'analyse des logs:', error);
          }
        })
      );
    } finally {
      this.processingBatch = false;
    }
  }
}
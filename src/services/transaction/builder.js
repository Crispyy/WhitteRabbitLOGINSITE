import { Transaction } from '@solana/web3.js';
import logger from '../../utils/logger.js';

export class TransactionBuilder {
  constructor(connection) {
    this.connection = connection;
  }

  async build(opportunity) {
    try {
      const transaction = new Transaction();
      
      // Ajout des instructions de transaction basées sur l'opportunité
      for (const instruction of opportunity.instructions) {
        transaction.add(instruction);
      }

      // Configuration des options de transaction
      const latestBlockhash = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = this.wallet.publicKey;

      return transaction;
    } catch (error) {
      logger.error('Erreur lors de la construction de la transaction:', error);
      throw error;
    }
  }
}
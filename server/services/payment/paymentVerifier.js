import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import logger from '../../../src/utils/logger.js';

class PaymentVerifier {
  constructor() {
    // Configuration de la connexion Solana avec le RPC Mainnet
    this.connection = new Connection(
      'https://dark-solemn-voice.solana-mainnet.quiknode.pro/71a12d5ba2845d173459522303dd4feb2d2403f7',
      {
        wsEndpoint: 'wss://dark-solemn-voice.solana-mainnet.quiknode.pro/71a12d5ba2845d173459522303dd4feb2d2403f7',
        commitment: 'confirmed'
      }
    );
    
    this.PAYMENT_ADDRESS = new PublicKey('3bYnFEXcudZmHHkc86SUdmRTD6Hp5sG77cWnCApJtgeE');
    this.REQUIRED_AMOUNT = 1.0;
    this.TOLERANCE = 0.03;
    this.TIME_WINDOW = 60 * 60; // 1 heure
  }

  async verifyPayment(senderAddressStr) {
    try {
      logger.info(`🔍 Démarrage de la vérification pour ${senderAddressStr}`);

      // Validation de l'adresse
      let senderAddress;
      try {
        senderAddress = new PublicKey(senderAddressStr);
      } catch (error) {
        logger.error('❌ Adresse Solana invalide');
        return false;
      }

      // Récupération des signatures récentes
      const signatures = await this.connection.getSignaturesForAddress(
        senderAddress,
        {
          limit: 20,
          commitment: 'confirmed'
        }
      );

      if (!signatures || signatures.length === 0) {
        logger.info('❌ Aucune transaction récente trouvée');
        return false;
      }

      // Vérification de chaque transaction
      for (const sigInfo of signatures) {
        try {
          const tx = await this.connection.getParsedTransaction(
            sigInfo.signature,
            {
              maxSupportedTransactionVersion: 0,
              commitment: 'confirmed'
            }
          );

          if (!tx || !tx.meta || tx.meta.err) continue;

          // Vérification du transfert
          const isValid = await this.verifyTransfer(tx);
          if (isValid) {
            logger.info(`✅ Paiement valide trouvé: ${this.REQUIRED_AMOUNT} SOL`);
            return true;
          }
        } catch (error) {
          logger.error(`Erreur lors de l'analyse de la transaction:`, error);
          continue;
        }
      }

      logger.info('❌ Aucun paiement valide trouvé');
      return false;

    } catch (error) {
      logger.error('🚨 Erreur lors de la vérification:', error);
      throw error;
    }
  }

  async verifyTransfer(tx) {
    try {
      const preBalances = tx.meta.preBalances;
      const postBalances = tx.meta.postBalances;
      const accountKeys = tx.transaction.message.accountKeys;
      
      // Trouver l'index de l'adresse de paiement
      const paymentAddressIndex = accountKeys.findIndex(
        key => key.pubkey.toString() === this.PAYMENT_ADDRESS.toString()
      );

      if (paymentAddressIndex === -1) return false;

      // Calculer le changement de balance
      const balanceChange = (postBalances[paymentAddressIndex] - preBalances[paymentAddressIndex]) / LAMPORTS_PER_SOL;
      
      // Vérifier si le montant est dans la plage acceptable
      const minAmount = this.REQUIRED_AMOUNT * (1 - this.TOLERANCE);
      const maxAmount = this.REQUIRED_AMOUNT * (1 + this.TOLERANCE);
      
      const isValidAmount = balanceChange >= minAmount && balanceChange <= maxAmount;
      
      if (isValidAmount) {
        logger.info(`💰 Montant transféré: ${balanceChange} SOL (attendu: ${this.REQUIRED_AMOUNT} ±${this.TOLERANCE * 100}%)`);
      }
      
      return isValidAmount;
    } catch (error) {
      logger.error('Erreur lors de la vérification du transfert:', error);
      return false;
    }
  }
}

export const paymentVerifier = new PaymentVerifier();
import crypto from 'crypto';
import logger from '../../../src/utils/logger.js';

export async function generateAccessKey() {
  try {
    // Génère une clé unique de 32 caractères
    const buffer = crypto.randomBytes(16);
    const key = buffer.toString('hex').toUpperCase();
    
    // Format: XXXX-XXXX-XXXX-XXXX (plus lisible)
    const formattedKey = key.match(/.{4}/g).join('-');
    
    logger.info('Nouvelle clé d\'accès générée');
    return formattedKey;
  } catch (error) {
    logger.error('Erreur lors de la génération de la clé:', error);
    throw error;
  }
}
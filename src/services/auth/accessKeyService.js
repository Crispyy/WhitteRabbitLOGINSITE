import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import logger from '../../utils/logger';

// Liste des clés d'accès valides
const VALID_ACCESS_KEYS = new Set([
  'WXRB-2024-0001-AAAA',
  'WXRB-2024-0002-BBBB',
  'WXRB-2024-0003-CCCC',
  'WXRB-2024-0004-DDDD',
  'WXRB-2024-0005-EEEE'
]);

class AccessKeyService {
  async validateAccessKey(key) {
    try {
      // Vérification locale
      if (VALID_ACCESS_KEYS.has(key)) {
        logger.info('Clé d\'accès valide');
        return true;
      }

      // Vérification Firebase
      const keysRef = collection(db, 'access_keys');
      const q = query(keysRef, where('key', '==', key), where('active', '==', true));
      
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      logger.error('Erreur lors de la validation de la clé:', error);
      throw error;
    }
  }
}

export const accessKeyService = new AccessKeyService();
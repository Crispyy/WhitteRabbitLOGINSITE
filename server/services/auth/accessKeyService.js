import { collection, addDoc, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase.js';
import { generateAccessKey } from '../utils/keyGenerator.js';
import logger from '../../../src/utils/logger.js';

class AccessKeyService {
  constructor() {
    this.collection = 'access_keys';
    this.MAX_KEYS = 2000;
  }

  async generateAndSaveKey(userId) {
    try {
      // Vérifier le nombre total de clés
      const totalKeys = await this.getTotalKeys();
      if (totalKeys >= this.MAX_KEYS) {
        throw new Error('Limite de clés atteinte (2000 clés maximum)');
      }

      const key = await generateAccessKey();
      
      await addDoc(collection(db, this.collection), {
        key,
        userId,
        active: true,
        createdAt: new Date().toISOString(),
        lastUsed: null
      });

      logger.info('Nouvelle clé d\'accès générée et sauvegardée');
      return key;
    } catch (error) {
      logger.error('Erreur lors de la génération de la clé:', error);
      throw error;
    }
  }

  async validateAccessKey(key) {
    try {
      const q = query(
        collection(db, this.collection),
        where('key', '==', key),
        where('active', '==', true)
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return false;

      // Mettre à jour la date de dernière utilisation
      const docRef = snapshot.docs[0].ref;
      await docRef.update({
        lastUsed: new Date().toISOString()
      });

      return true;
    } catch (error) {
      logger.error('Erreur lors de la validation de la clé:', error);
      throw error;
    }
  }

  async getTotalKeys() {
    try {
      const q = query(collection(db, this.collection));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      logger.error('Erreur lors du comptage des clés:', error);
      throw error;
    }
  }

  async getActiveKeys() {
    try {
      const q = query(
        collection(db, this.collection),
        where('active', '==', true)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error('Erreur lors de la récupération des clés actives:', error);
      throw error;
    }
  }

  async deactivateKey(key) {
    try {
      const q = query(
        collection(db, this.collection),
        where('key', '==', key)
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return false;

      const docRef = snapshot.docs[0].ref;
      await docRef.update({
        active: false,
        deactivatedAt: new Date().toISOString()
      });

      logger.info(`Clé d'accès désactivée: ${key}`);
      return true;
    } catch (error) {
      logger.error('Erreur lors de la désactivation de la clé:', error);
      throw error;
    }
  }

  async getKeyStats() {
    try {
      const totalKeys = await this.getTotalKeys();
      const activeKeys = (await this.getActiveKeys()).length;
      
      return {
        total: totalKeys,
        active: activeKeys,
        available: this.MAX_KEYS - totalKeys,
        maxKeys: this.MAX_KEYS
      };
    } catch (error) {
      logger.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}

export const accessKeyService = new AccessKeyService();
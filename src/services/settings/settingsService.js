import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export class SettingsService {
  constructor() {
    this.collection = 'settings';
  }

  async getUserSettings(userId) {
    try {
      const docRef = doc(db, this.collection, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      
      // Paramètres par défaut
      return {
        minProfitThreshold: 0.01,
        gasLimit: 0.1
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres:', error);
      throw new Error('Impossible de récupérer les paramètres');
    }
  }

  async updateSettings(userId, settings) {
    try {
      const docRef = doc(db, this.collection, userId);
      await setDoc(docRef, settings, { merge: true });
      return settings;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      throw new Error('Impossible de mettre à jour les paramètres');
    }
  }
}

export const settingsService = new SettingsService();
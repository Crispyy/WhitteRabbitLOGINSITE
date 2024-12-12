import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export class TransactionService {
  constructor() {
    this.collection = collection(db, 'transactions');
  }

  async saveTransaction(transaction) {
    try {
      const docRef = await addDoc(this.collection, {
        ...transaction,
        timestamp: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la transaction:', error);
      throw new Error('Impossible d\'enregistrer la transaction');
    }
  }

  async getTransactionsByUser(userId) {
    try {
      const q = query(
        this.collection,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      throw new Error('Impossible de récupérer les transactions');
    }
  }

  async getStats(userId) {
    try {
      const transactions = await this.getTransactionsByUser(userId);
      
      const totalProfit = transactions.reduce((sum, tx) => sum + (tx.profit || 0), 0);
      const successCount = transactions.filter(tx => tx.status === 'success').length;
      const successRate = transactions.length > 0 
        ? (successCount / transactions.length) * 100 
        : 0;

      return {
        totalProfit,
        successRate,
        totalTransactions: transactions.length,
        transactions: transactions.slice(0, 10) // Dernières 10 transactions
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      throw new Error('Impossible de calculer les statistiques');
    }
  }
}

export const transactionService = new TransactionService();
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { transactionService } from '../services/transaction/transactionService';

export function useTransactions() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProfit: 0,
    successRate: 0,
    totalTransactions: 0,
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      try {
        setLoading(true);
        const stats = await transactionService.getStats(user.uid);
        setStats(stats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  return { stats, loading, error };
}
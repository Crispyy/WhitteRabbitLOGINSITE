import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
});

export const authAPI = {
  validateKey: async (key) => {
    const response = await api.post('/auth/validate', { key });
    return response.data;
  }
};

export const statsAPI = {
  getPerformance: async () => {
    const response = await api.get('/stats/performance');
    return response.data;
  },
  
  getTransactions: async () => {
    const response = await api.get('/stats/transactions');
    return response.data;
  }
};
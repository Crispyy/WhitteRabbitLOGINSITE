import React, { createContext, useContext, useState, useEffect } from 'react';
import { accessKeyService } from '../services/auth/accessKeyService';
import logger from '../utils/logger';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('accessKey');
    if (storedKey) {
      validateKey(storedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const validateKey = async (key) => {
    try {
      setError(null);
      const isValid = await accessKeyService.validateAccessKey(key);
      
      if (isValid) {
        setUser({ accessKey: key });
        localStorage.setItem('accessKey', key);
        logger.info('Clé d\'accès validée avec succès');
      } else {
        setError('Clé d\'accès invalide');
        localStorage.removeItem('accessKey');
        logger.error('Clé d\'accès invalide');
      }
    } catch (error) {
      setError('Erreur lors de la validation de la clé');
      localStorage.removeItem('accessKey');
      logger.error('Erreur lors de la validation:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (key) => {
    setLoading(true);
    await validateKey(key);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessKey');
    logger.info('Déconnexion effectuée');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
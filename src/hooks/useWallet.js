import { useState, useCallback } from 'react';
import { formatAddress } from '../utils/format';

export const useWallet = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    try {
      setConnecting(true);
      setError(null);

      if (!window.solana || !window.solana.isPhantom) {
        throw new Error('Veuillez installer Phantom Wallet');
      }

      const response = await window.solana.connect();
      setPublicKey(response.publicKey.toString());
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (window.solana) {
      window.solana.disconnect();
    }
    setPublicKey(null);
  }, []);

  return {
    publicKey,
    connecting,
    error,
    connect,
    disconnect,
    formattedAddress: publicKey ? formatAddress(publicKey) : ''
  };
};
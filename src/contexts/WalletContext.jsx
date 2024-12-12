import React, { createContext, useContext, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { SOLANA_CLUSTER_URL } from '../config/constants';

const WalletContext = createContext({});

export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState(null);
  const connection = new Connection(SOLANA_CLUSTER_URL);

  const value = {
    publicKey,
    setPublicKey,
    connection
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
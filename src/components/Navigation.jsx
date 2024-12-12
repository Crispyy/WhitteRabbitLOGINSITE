import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';

export default function Navigation() {
  const location = useLocation();
  const { publicKey, setPublicKey } = useWallet();

  const isActive = (path) => location.pathname === path;

  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        setPublicKey(response.publicKey.toString());
      } else {
        alert('Veuillez installer Phantom Wallet');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              WHITE RABBITE
            </h1>
          </div>
          
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/analytics')
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Analytique
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/settings')
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Paramètres
            </Link>
          </div>

          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            {publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : 'Connecter Portefeuille'}
          </button>
        </div>
      </div>
    </nav>
  );
}
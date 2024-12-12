import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { publicKey } = useWallet();
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    balance: '0 SOL',
    usdBalance: '$0 USD',
    totalProfit: '8.3 SOL',
    successRate: '94.2%',
    recentOpportunities: [
      {
        route: 'USDC → SOL → RAY',
        profit: '0.12 SOL',
        time: 'il y a 2 min',
        status: 'Exécuté'
      },
      {
        route: 'SOL → USDT → RAY',
        profit: '0.08 SOL',
        time: 'il y a 5 min',
        status: 'Exécuté'
      }
    ]
  });

  const toggleBot = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord MEV</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Solde du Portefeuille */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Solde du Portefeuille</h3>
            <p className="text-2xl font-bold text-white mb-1">{stats.balance}</p>
            <p className="text-sm text-gray-400">{stats.usdBalance}</p>
          </div>

          {/* Statut du Bot */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Statut du Bot</h3>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${isRunning ? 'text-green-500' : 'text-red-500'}`}>
                {isRunning ? 'Actif' : 'Arrêté'}
              </span>
              <button
                onClick={toggleBot}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isRunning 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isRunning ? 'Arrêter' : 'Démarrer'}
              </button>
            </div>
          </div>

          {/* Profit Total */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Profit Total</h3>
            <p className="text-2xl font-bold text-white">{stats.totalProfit}</p>
          </div>

          {/* Taux de Réussite */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Taux de Réussite</h3>
            <p className="text-2xl font-bold text-white">{stats.successRate}</p>
          </div>
        </div>

        {/* Opportunités Récentes */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <h2 className="text-xl font-bold mb-6 text-purple-400">Opportunités Récentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-4">Route</th>
                  <th className="pb-4">Profit</th>
                  <th className="pb-4">Temps</th>
                  <th className="pb-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOpportunities.map((op, index) => (
                  <tr key={index} className="border-t border-gray-700/50">
                    <td className="py-4 text-purple-400">{op.route}</td>
                    <td className="py-4">{op.profit}</td>
                    <td className="py-4 text-gray-400">{op.time}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                        {op.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
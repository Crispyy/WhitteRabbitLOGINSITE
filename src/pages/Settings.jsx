import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export default function Settings() {
  const { publicKey } = useWallet();
  const [settings, setSettings] = useState({
    minProfitThreshold: 0.01,
    gasLimit: 0.1,
    slippageTolerance: 0.5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sauvegarder les paramètres
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Seuil de Profit Minimum (SOL)
              </label>
              <input
                type="number"
                step="0.001"
                value={settings.minProfitThreshold}
                onChange={(e) => setSettings({
                  ...settings,
                  minProfitThreshold: parseFloat(e.target.value)
                })}
                className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-400">
                Profit minimum requis pour exécuter une transaction
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Limite de Gas (SOL)
              </label>
              <input
                type="number"
                step="0.001"
                value={settings.gasLimit}
                onChange={(e) => setSettings({
                  ...settings,
                  gasLimit: parseFloat(e.target.value)
                })}
                className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-400">
                Montant maximum de gas à utiliser par transaction
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tolérance de Slippage (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.slippageTolerance}
                onChange={(e) => setSettings({
                  ...settings,
                  slippageTolerance: parseFloat(e.target.value)
                })}
                className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-400">
                Pourcentage maximum de variation de prix accepté
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Sauvegarder les Paramètres
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
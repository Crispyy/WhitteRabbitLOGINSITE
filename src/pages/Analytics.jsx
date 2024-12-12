import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Profit (SOL)',
        data: [0.2, 0.5, 1.2, 2.1, 3.8, 8.3],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const protocolData = {
    labels: ['Raydium', 'Orca', 'Jupiter'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(147, 51, 234, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
        borderColor: [
          'rgb(147, 51, 234)',
          'rgb(236, 72, 153)',
          'rgb(59, 130, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytique</h1>
        
        <div className="space-y-6">
          {/* Performance Globale */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-4 text-purple-400">Performance Globale</h2>
            <div className="h-[300px]">
              <Line data={performanceData} options={options} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Distribution par Protocol */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-4 text-purple-400">Distribution par Protocol</h2>
              <div className="h-[300px] flex items-center justify-center">
                <Pie data={protocolData} options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#fff',
                      },
                    },
                  },
                }} />
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-6 text-purple-400">Statistiques</h2>
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">ROI Moyen</p>
                  <p className="text-2xl font-bold">156%</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Temps Moyen par Transaction</p>
                  <p className="text-2xl font-bold">2.3s</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Coût Moyen du Gas</p>
                  <p className="text-2xl font-bold">0.000435 SOL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
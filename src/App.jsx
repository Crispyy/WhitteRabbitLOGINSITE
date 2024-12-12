import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-900">
                    <Navigation />
                    <div className="container mx-auto px-4 py-8">
                      <Dashboard />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-900">
                    <Navigation />
                    <div className="container mx-auto px-4 py-8">
                      <Analytics />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <div className="min-h-screen bg-gray-900">
                    <Navigation />
                    <div className="container mx-auto px-4 py-8">
                      <Settings />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}
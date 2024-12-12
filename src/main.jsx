import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import App from './App';
import './index.css';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6581LD3Sfae9tjs671tn1CDNPZYRQpmA",
  authDomain: "mevbot1-befa8.firebaseapp.com",
  projectId: "mevbot1-befa8",
  storageBucket: "mevbot1-befa8.appspot.com",
  messagingSenderId: "315072366361",
  appId: "1:315072366361:web:518b0c80eb321c19f7a788"
};

// Initialisation de Firebase
initializeApp(firebaseConfig);

// Rendu de l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import logger from '../../src/utils/logger.js';

const firebaseConfig = {
  apiKey: "AIzaSyC6581LD3Sfae9tjs671tn1CDNPZYRQpmA",
  authDomain: "mevbot1-befa8.firebaseapp.com",
  projectId: "mevbot1-befa8",
  storageBucket: "mevbot1-befa8.appspot.com",
  messagingSenderId: "315072366361",
  appId: "1:315072366361:web:518b0c80eb321c19f7a788"
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // En développement, utiliser l'émulateur Firestore
  if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080);
  }
  
  logger.info('Firebase initialisé avec succès');
} catch (error) {
  logger.error('Erreur lors de l\'initialisation de Firebase:', error);
  // Créer une version mock de Firestore pour éviter les erreurs
  db = {
    collection: () => ({
      add: async () => ({ id: 'mock-id' }),
      doc: () => ({
        set: async () => {},
        get: async () => ({
          exists: () => true,
          data: () => ({})
        })
      })
    })
  };
}

export { db };
export default app;
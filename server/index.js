import express from 'express';
import cors from 'cors';
import { ENV } from './config/environment.js';
import { setupRoutes } from './routes/index.js';
import { initializeTelegramBot } from './telegram/index.js';
import logger from './utils/logger.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
setupRoutes(app);

// Initialisation du bot Telegram
const bot = initializeTelegramBot();

// Démarrage du serveur
app.listen(ENV.PORT, () => {
  logger.info(`Serveur démarré sur le port ${ENV.PORT}`);
});

// Gestion de l'arrêt gracieux
const gracefulShutdown = () => {
  logger.info('Arrêt gracieux...');
  bot?.stop();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
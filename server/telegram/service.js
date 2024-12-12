import TelegramBot from 'node-telegram-bot-api';
import { handleStart, handleVerify, handleHelp } from './handlers.js';
import logger from '../utils/logger.js';

export class TelegramBotService {
  constructor(token) {
    if (!token) {
      throw new Error('Token Telegram manquant');
    }

    try {
      this.bot = new TelegramBot(token, { 
        polling: true,
        // Ajout des options de polling pour plus de stabilité
        pollingOptions: {
          interval: 300,
          autoStart: true,
          params: {
            timeout: 10
          }
        }
      });

      this.initializeCommands();
      logger.info('Bot Telegram initialisé avec succès');
    } catch (error) {
      logger.error('Erreur lors de l\'initialisation du bot:', error);
      throw error;
    }
  }

  initializeCommands() {
    // Gestion des erreurs de polling
    this.bot.on('polling_error', (error) => {
      logger.error('Erreur de polling Telegram:', error);
      // Redémarrage du polling en cas d'erreur
      if (error.code === 'ETELEGRAM') {
        logger.info('Tentative de redémarrage du polling...');
        this.bot.stopPolling();
        setTimeout(() => {
          this.bot.startPolling();
        }, 5000);
      }
    });

    this.bot.onText(/\/start/, handleStart(this.bot));
    this.bot.onText(/\/verify (.+)/, handleVerify(this.bot));
    this.bot.onText(/\/help/, handleHelp(this.bot));
  }

  stop() {
    if (this.bot) {
      this.bot.stopPolling();
      logger.info('Bot Telegram arrêté');
    }
  }
}
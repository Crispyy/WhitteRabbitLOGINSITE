import TelegramBot from 'node-telegram-bot-api';
import { PublicKey } from '@solana/web3.js';
import { TELEGRAM_CONFIG } from './config.js';
import { MESSAGES } from './messages.js';
import { paymentVerifier } from '../services/payment/paymentVerifier.js';
import { accessKeyService } from '../services/auth/accessKeyService.js';
import logger from '../../src/utils/logger.js';

class TelegramBotService {
  constructor() {
    if (!TELEGRAM_CONFIG.botToken) {
      logger.error('Token Telegram manquant');
      return;
    }

    try {
      this.bot = new TelegramBot(TELEGRAM_CONFIG.botToken, { polling: true });
      this.initializeCommands();
      logger.info('Bot Telegram initialisé');
    } catch (error) {
      logger.error('Erreur d\'initialisation du bot:', error);
    }
  }

  initializeCommands() {
    if (!this.bot) return;

    // Commande /start
    this.bot.onText(/\/start/, async (msg) => {
      try {
        const chatId = msg.chat.id;
        
        // Envoi du logo
        await this.bot.sendPhoto(chatId, 'https://i.imgur.com/1G2yr99.png', {
          caption: '🌟 White Rabbit MEV Bot 🌟'
        });

        // Envoi du message de bienvenue
        await this.bot.sendMessage(chatId, MESSAGES.start, {
          parse_mode: 'Markdown'
        });
        
        logger.info(`Commande /start exécutée pour ${chatId}`);
      } catch (error) {
        logger.error('Erreur commande /start:', error);
      }
    });

    // Commande /verify
    this.bot.onText(/\/verify (.+)/, async (msg, match) => {
      try {
        const chatId = msg.chat.id;
        const address = match[1];

        // Validation de l'adresse
        if (!this.isValidSolanaAddress(address)) {
          await this.bot.sendMessage(chatId, MESSAGES.invalidAddress);
          return;
        }

        await this.bot.sendMessage(chatId, MESSAGES.verificationStarted);

        // Vérification du paiement
        const isValid = await paymentVerifier.verifyPayment(address);
        
        if (isValid) {
          // Génération de la clé d'accès
          const accessKey = await accessKeyService.generateAndSaveKey(chatId.toString());
          await this.bot.sendMessage(
            chatId, 
            MESSAGES.paymentSuccess.replace('%s', accessKey),
            { parse_mode: 'Markdown' }
          );
        } else {
          await this.bot.sendMessage(chatId, MESSAGES.paymentNotFound);
        }
      } catch (error) {
        logger.error('Erreur commande /verify:', error);
        await this.bot.sendMessage(msg.chat.id, MESSAGES.error);
      }
    });

    // Commande /help
    this.bot.onText(/\/help/, async (msg) => {
      try {
        await this.bot.sendMessage(msg.chat.id, MESSAGES.help, {
          parse_mode: 'Markdown'
        });
      } catch (error) {
        logger.error('Erreur commande /help:', error);
      }
    });
  }

  isValidSolanaAddress(address) {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }
}

const botService = new TelegramBotService();
export default botService;
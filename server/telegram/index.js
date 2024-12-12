import { TelegramBotService } from './service.js';
import { ENV } from '../config/environment.js';
import logger from '../utils/logger.js';

let botInstance = null;

export function initializeTelegramBot() {
  try {
    if (!ENV.TELEGRAM_BOT_TOKEN) {
      throw new Error('Token Telegram manquant');
    }

    botInstance = new TelegramBotService(ENV.TELEGRAM_BOT_TOKEN);
    return botInstance;
  } catch (error) {
    logger.error('Erreur d\'initialisation du bot Telegram:', error);
    return null;
  }
}

export function getBotInstance() {
  return botInstance;
}
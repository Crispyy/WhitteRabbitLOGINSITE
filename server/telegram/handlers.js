import { PublicKey } from '@solana/web3.js';
import { MESSAGES } from './messages.js';
import { paymentVerifier } from '../services/payment/paymentVerifier.js';
import { accessKeyService } from '../services/auth/accessKeyService.js';
import logger from '../utils/logger.js';

export const handleStart = (bot) => async (msg) => {
  try {
    const chatId = msg.chat.id;
    
    await bot.sendPhoto(chatId, 'https://i.imgur.com/1G2yr99.png', {
      caption: '🌟 White Rabbit MEV Bot 🌟'
    });

    await bot.sendMessage(chatId, MESSAGES.start, {
      parse_mode: 'Markdown'
    });
    
    logger.info(`Commande /start exécutée pour ${chatId}`);
  } catch (error) {
    logger.error('Erreur commande /start:', error);
  }
};

export const handleVerify = (bot) => async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const address = match[1];

    if (!isValidSolanaAddress(address)) {
      await bot.sendMessage(chatId, MESSAGES.invalidAddress);
      return;
    }

    await bot.sendMessage(chatId, MESSAGES.verificationStarted);
    const isValid = await paymentVerifier.verifyPayment(address);
    
    if (isValid) {
      const accessKey = await accessKeyService.generateAndSaveKey(chatId.toString());
      await bot.sendMessage(
        chatId, 
        MESSAGES.paymentSuccess.replace('%s', accessKey),
        { parse_mode: 'Markdown' }
      );
    } else {
      await bot.sendMessage(chatId, MESSAGES.paymentNotFound);
    }
  } catch (error) {
    logger.error('Erreur commande /verify:', error);
    await bot.sendMessage(msg.chat.id, MESSAGES.error);
  }
};

export const handleHelp = (bot) => async (msg) => {
  try {
    await bot.sendMessage(msg.chat.id, MESSAGES.help, {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    logger.error('Erreur commande /help:', error);
  }
};

function isValidSolanaAddress(address) {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
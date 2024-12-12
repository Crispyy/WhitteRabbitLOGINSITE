import { ENV } from '../config/environment.js';

export const TELEGRAM_CONFIG = {
  botToken: ENV.TELEGRAM_BOT_TOKEN,
  paymentAddress: '3bYnFEXcudZmHHkc86SUdmRTD6Hp5sG77cWnCApJtgeE',
  requiredAmount: 1.0,
  tolerance: 0.03,
  timeWindow: 3600
};
import logger from './logger.js';
import { RETRY_DELAY } from '../config/constants.js';

export async function withRetry(operation, maxRetries) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      retries++;
      
      if (retries === maxRetries) {
        throw error;
      }
      
      logger.warn(`Opération échouée, nouvelle tentative (${retries}/${maxRetries}): ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}
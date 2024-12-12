import 'dotenv/config';
import { createConnection, loadWallet } from './services/connection.js';
import { MempoolMonitor } from './services/mempool/monitor.js';
import { TransactionExecutor } from './services/transaction/executor.js';
import logger from './utils/logger.js';

async function main() {
  try {
    // Initialisation de la connexion et du wallet
    const connection = createConnection();
    const wallet = loadWallet();
    
    // Initialisation des services
    const executor = new TransactionExecutor(connection, wallet);
    const mempool = new MempoolMonitor(connection);
    
    // Démarrage de la surveillance du mempool
    await mempool.start(async (opportunity) => {
      try {
        await executor.executeTransaction(opportunity);
      } catch (error) {
        logger.error('Échec de l\'exécution de l\'opportunité:', error);
      }
    });

    logger.info('Bot MEV démarré avec succès');

    // Gestion de l'arrêt
    process.on('SIGINT', () => {
      mempool.stop();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Échec du démarrage du bot MEV:', error);
    process.exit(1);
  }
}

main();
import express from 'express';
import { accessKeyService } from '../services/auth/accessKeyService.js';
import logger from '../utils/logger.js';

export function setupRoutes(app) {
  const router = express.Router();

  // Route de santé
  router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Route de validation des clés
  router.post('/validate-key', async (req, res) => {
    try {
      const { key } = req.body;
      const isValid = await accessKeyService.validateAccessKey(key);
      res.json({ valid: isValid });
    } catch (error) {
      logger.error('Erreur de validation de clé:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

  app.use('/api', router);
}
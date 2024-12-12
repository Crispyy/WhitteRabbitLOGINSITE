export const MESSAGES = {
  start: `🌟 Bienvenue sur White Rabbit MEV Bot! 🌟\n\n` +
    `Pour obtenir votre clé d'accès, suivez ces étapes:\n\n` +
    `1. Envoyez exactement 1 SOL (±3%) à cette adresse:\n` +
    `\`3bYnFEXcudZmHHkc86SUdmRTD6Hp5sG77cWnCApJtgeE\`\n\n` +
    `2. Une fois le paiement effectué, utilisez la commande:\n` +
    `/verify <votreadressesolana>\n\n` +
    `3. Remplacez <votreadressesolana> par l'adresse depuis laquelle vous avez envoyé les SOL\n\n` +
    `⚠️ Important:\n` +
    `- Le montant doit être entre 0.97 et 1.03 SOL\n` +
    `- Attendez au moins 2 confirmations avant de vérifier\n\n` +
    `Pour plus d'aide, tapez /help`,
    
  help: `📚 Commandes disponibles:\n\n` +
    `/start - Affiche les instructions de paiement\n` +
    `/verify <adresse> - Vérifie votre paiement\n` +
    `/status - Vérifie l'état de votre clé\n` +
    `/help - Affiche ce message\n\n` +
    `Pour toute assistance: @WhiteRabbitSupport`,
    
  invalidAddress: '❌ Adresse Solana invalide. Veuillez vérifier le format.',
  verificationStarted: '🔍 Vérification en cours...',
  paymentSuccess: '✅ Paiement vérifié! Voici votre clé d\'accès:\n\n`%s`\n\nNe la partagez avec personne!',
  paymentNotFound: '❌ Aucun paiement trouvé depuis cette adresse dans la dernière heure.',
  invalidAmount: '❌ Montant incorrect. Le paiement doit être de 1 SOL (±3%).',
  error: '❌ Une erreur est survenue. Veuillez réessayer plus tard.'
};
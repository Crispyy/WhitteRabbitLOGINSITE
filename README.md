# White Rabbit MEV Bot

Bot MEV pour Solana avec interface web et système de clés d'accès.

## 🚀 Fonctionnalités

- Interface web moderne avec authentification par clé d'accès
- Bot Telegram pour la gestion des paiements et la distribution des clés
- Monitoring du mempool Solana en temps réel
- Détection et exécution d'opportunités MEV
- Tableau de bord avec statistiques en temps réel
- Analytiques détaillées des performances

## 🛠️ Technologies

- Frontend: React.js, TailwindCSS
- Backend: Node.js, Express
- Blockchain: Solana Web3.js
- Base de données: Firebase
- Bot: Telegram Bot API

## ⚙️ Installation

1. Cloner le dépôt :
\`\`\`bash
git clone https://github.com/votre-username/white-rabbit-mev.git
cd white-rabbit-mev
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Configurer les variables d'environnement :
\`\`\`bash
cp .env.example .env
\`\`\`

4. Démarrer le projet :
\`\`\`bash
npm run dev
\`\`\`

## 📝 Configuration

Créez un fichier \`.env\` à la racine du projet avec les variables suivantes :

\`\`\`env
# Solana
SOLANA_CLUSTER_URL=votre_rpc_url
SOLANA_WS_URL=votre_ws_url

# Firebase
FIREBASE_API_KEY=votre_api_key
FIREBASE_AUTH_DOMAIN=votre_domain
FIREBASE_PROJECT_ID=votre_project_id
FIREBASE_STORAGE_BUCKET=votre_bucket
FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
FIREBASE_APP_ID=votre_app_id

# Telegram Bot
TELEGRAM_BOT_TOKEN=votre_bot_token
\`\`\`

## 🔒 Sécurité

- Ne jamais commiter les fichiers .env
- Protéger les clés d'API et tokens
- Utiliser des variables d'environnement pour les informations sensibles

## 📄 Licence

MIT
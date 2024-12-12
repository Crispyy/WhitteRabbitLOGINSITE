#!/bin/bash

# Variables
APP_NAME="white-rabbit-mev"
FRONTEND_DIR="./client"
BACKEND_DIR="./server"

# Construction du frontend
echo "🏗️ Construction du frontend..."
cd $FRONTEND_DIR
npm run build

# Déploiement du frontend sur Netlify/Vercel
echo "🚀 Déploiement du frontend..."
npx netlify deploy --prod --dir=dist

# Construction et déploiement du backend
echo "🏗️ Préparation du backend..."
cd ../$BACKEND_DIR
npm run build

# PM2 pour la gestion des processus
echo "🚀 Démarrage des services..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start

echo "✅ Déploiement terminé !"
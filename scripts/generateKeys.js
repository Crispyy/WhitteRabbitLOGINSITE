import crypto from 'crypto';
import fs from 'fs';

// Configuration
const TOTAL_KEYS = 2000;
const KEY_LENGTH = 24; // 24 caractères pour 6 groupes de 4
const OUTPUT_FILE = 'access_keys.txt';

// Fonction pour générer une clé unique
function generateKey() {
  const buffer = crypto.randomBytes(KEY_LENGTH / 2);
  const key = buffer.toString('hex').toUpperCase();
  return key.match(/.{4}/g).join('-'); // Format: XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
}

// Fonction pour générer toutes les clés
function generateAllKeys() {
  console.log('🔑 Début de la génération des clés...');
  const keys = new Set(); // Utiliser un Set pour éviter les doublons

  while (keys.size < TOTAL_KEYS) {
    const key = generateKey();
    keys.add(key);
    
    if (keys.size % 100 === 0) {
      console.log(`📊 Progression: ${keys.size}/${TOTAL_KEYS} clés générées`);
    }
  }

  // Convertir en tableau et ajouter les numéros
  const keysArray = Array.from(keys);
  const formattedKeys = keysArray.map((key, index) => {
    return `${(index + 1).toString().padStart(4, '0')}. ${key}`;
  });

  // Sauvegarder dans un fichier
  fs.writeFileSync(OUTPUT_FILE, formattedKeys.join('\n'));

  console.log(`\n✅ Génération terminée !`);
  console.log(`📁 ${TOTAL_KEYS} clés ont été sauvegardées dans ${OUTPUT_FILE}`);
  
  // Afficher quelques exemples
  console.log('\n📝 Exemples de clés générées:');
  for (let i = 0; i < 5; i++) {
    console.log(formattedKeys[i]);
  }
}

// Exécuter la génération
generateAllKeys();
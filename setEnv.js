const fs = require('fs');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear el contenido del archivo environment.ts dinámicamente
const envConfig = `export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}",
    measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}",
    databaseURL: "${process.env.FIREBASE_DATABASE_URL}"
  }
};`;

// Escribir el archivo environment.ts en la carpeta src/environments
fs.writeFileSync('./src/environments/environment.ts', envConfig, { encoding: 'utf8' });

console.log('Environment file generated successfully');

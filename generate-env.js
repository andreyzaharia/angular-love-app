const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });

const envConfig = `export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}'
  }
};`;

fs.writeFileSync(path.join(__dirname, 'src/environments/environments.prod.ts'), envConfig);

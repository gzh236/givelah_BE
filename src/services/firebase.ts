require("dotenv").config();

// const serviceAccount = require("../../google-credentials.json");

import { initializeApp } from "firebase/app";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID!,
  private_key: process.env.PRIVATE_KEY,
};

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const app = initializeApp(firebaseConfig);

export default admin;

require("dotenv").config();

import { initializeApp } from "firebase/app";
import * as admin from "firebase-admin";
const serviceAccount: string = process.env.GOOGLE_CREDS!;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GOOGLE_PROJ_ID}.firebaseio.com`,
});

const app = initializeApp(firebaseConfig);

export default admin;

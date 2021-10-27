require("dotenv").config();

import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const app = initializeApp(firebaseConfig);

export default admin;

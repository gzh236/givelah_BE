require("dotenv").config();

// const serviceAccount = require("../../google-credentials.json");

import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

export default admin;

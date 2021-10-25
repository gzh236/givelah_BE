"use strict";
exports.__esModule = true;
require("dotenv").config();
// const serviceAccount = require("../../google-credentials.json");
var admin = require("firebase-admin");
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    private_key: process.env.PRIVATE_KEY
};
admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: JSON.parse(process.env.PRIVATE_KEY),
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL
    }),
    databaseURL: "https://" + firebaseConfig.projectId + ".firebaseio.com"
});
console.log(JSON.parse(process.env.PRIVATE_KEY));
exports["default"] = admin;

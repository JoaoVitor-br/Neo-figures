// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

// Read values first from process.env, then from Expo config extras (for managed app),
// falling back to undefined if not set. Put your secrets in a local .env or in
// Expo's `extra` config — never commit `.env` to git.
const EXTRAS = (Constants && (Constants.expoConfig?.extra || Constants.manifest?.extra)) || {};

const cfg = (key) => process.env[key] ?? EXTRAS[key];

const firebaseConfig = {
  apiKey: cfg('FIREBASE_API_KEY'),
  authDomain: cfg('FIREBASE_AUTH_DOMAIN'),
  projectId: cfg('FIREBASE_PROJECT_ID'),
  storageBucket: cfg('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: cfg('FIREBASE_MESSAGING_SENDER_ID'),
  appId: cfg('FIREBASE_APP_ID'),
  measurementId: cfg('FIREBASE_MEASUREMENT_ID'),
};

// Warn if any expected env var is missing (helps debugging without embedding secrets)
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];
const missing = requiredVars.filter((k) => !cfg(k));
if (missing.length) {
  // eslint-disable-next-line no-console
  console.warn('Missing Firebase env vars:', missing.join(', '));
}

const app = initializeApp(firebaseConfig);
export const autenticacao = getAuth(app);
export const bancoDados = getFirestore(app);
export const armazenamento = getStorage(app);

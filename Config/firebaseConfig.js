// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4kQkwK86RX-5XpLkduZ4xTZNnMNvbHjQ",
  authDomain: "neo-figure.firebaseapp.com",
  projectId: "neo-figure",
  storageBucket: "neo-figure.firebasestorage.app",
  messagingSenderId: "634258246445",
  appId: "1:634258246445:web:4059af830bd38333c321a4",
  measurementId: "G-HN8XF7FVL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const autenticacao = getAuth(app);
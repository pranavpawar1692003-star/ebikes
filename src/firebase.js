// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB09I_H6UPfR2nb7Z068tAW6TUUavJCf4Q",
  authDomain: "e-bike-61ec0.firebaseapp.com",
  projectId: "e-bike-61ec0",
  storageBucket: "e-bike-61ec0.firebasestorage.app",
  messagingSenderId: "502901145384",
  appId: "1:502901145384:web:5996231286f7a8eb8dda1d",
  measurementId: "G-R19S5PCX3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };

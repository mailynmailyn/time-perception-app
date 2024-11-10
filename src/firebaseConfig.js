// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Import Firestore
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWtkQ3kCIPUZF-BARsYvLTuGMXWwXzKe8",
    authDomain: "time-perception-app.firebaseapp.com",
    projectId: "time-perception-app",
    storageBucket: "time-perception-app.appspot.com",
    messagingSenderId: "643918146853",
    appId: "1:643918146853:web:8919c718985d5410b83ecc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Create Firestore instance

const auth = getAuth(app);

// Export both app and db
export { app, db, auth }; // Export both the app and db

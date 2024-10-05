// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyALqvixEUkq8xa5wQbcC6_oWKHeLmiXDKg",
    authDomain: "week7-chuying.firebaseapp.com",
    projectId: "week7-chuying",
    storageBucket: "week7-chuying.appspot.com",
    messagingSenderId: "141890171990",
    appId: "1:141890171990:web:628fd787c48ec0fd24f7f7"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig); // Correctly initialize the Firebase app

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export initialized instances
export default db;
export { auth, db };

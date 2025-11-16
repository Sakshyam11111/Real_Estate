import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSqnqAzgbvFPdn2evT-nWOxwbteLdEVPw",
  authDomain: "real-estate-860d0.firebaseapp.com",
  projectId: "real-estate-860d0",
  storageBucket: "real-estate-860d0.firebasestorage.app",
  messagingSenderId: "65491764414",
  appId: "1:65491764414:web:cc43284ebebdbd3a12caef",
  measurementId: "G-NY7C22D2VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Create a context
const FirebaseContext = createContext();

// Create a provider component
export const FirebaseProvider = ({ children }) => {
  // You can add more Firebase services here if needed
  const value = {
    auth,
    db
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
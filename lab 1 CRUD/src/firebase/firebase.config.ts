// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADX_hE21uqK9gAzwX_WOtWku4GrCg2IGI",
  authDomain: "todos-b5478.firebaseapp.com",
  projectId: "todos-b5478",
  storageBucket: "todos-b5478.firebasestorage.app",
  messagingSenderId: "311324570809",
  appId: "1:311324570809:web:6decf6d4e4f588684ed768"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore (app);

export { db };
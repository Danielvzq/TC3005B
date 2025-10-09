import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHyzO7Mp1hhhWVrlMgCRoqlHRGaL9VIyI",
  authDomain: "primer-proyecto-c76f2.firebaseapp.com",
  projectId: "primer-proyecto-c76f2",
  storageBucket: "primer-proyecto-c76f2.firebasestorage.app",
  messagingSenderId: "161463356583",
  appId: "1:161463356583:web:9ca114c2e58bff0a3d5f82"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
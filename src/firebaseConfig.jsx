import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCVOUnt-VVUAQvvjQWfag066kpD1_ao21c",
  authDomain: "ledgerbook-7e18a.firebaseapp.com",
  projectId: "ledgerbook-7e18a",
  storageBucket: "ledgerbook-7e18a.firebasestorage.app",
  messagingSenderId: "846523479616",
  appId: "1:846523479616:web:4f07102f8dcc78a545d1a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

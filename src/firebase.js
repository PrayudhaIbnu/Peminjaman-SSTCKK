// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4rWQA_ypfCywUvLUskqQ0PEfGIclpc18",
  authDomain: "api-sstckk.firebaseapp.com",
  projectId: "api-sstckk",
  storageBucket: "api-sstckk.appspot.com",
  messagingSenderId: "730783639703",
  appId: "1:730783639703:web:310cc388f534dffbcfe1d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

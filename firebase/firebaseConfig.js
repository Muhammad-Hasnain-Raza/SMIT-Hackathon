import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore,collection, addDoc, setDoc, doc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhM0eqKygtbb2KhSzaMtNj2rHPB8r01t4",
    authDomain: "login-signup-66f69.firebaseapp.com",
    projectId: "login-signup-66f69",
    storageBucket: "login-signup-66f69.appspot.com",
    messagingSenderId: "210143771899",
    appId: "1:210143771899:web:48533eb8e93de35895445e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc, setDoc, doc, updateDoc, query, where, getDocs };

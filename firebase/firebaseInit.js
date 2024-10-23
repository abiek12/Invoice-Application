import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEOHKGhp_8ClzdWe35jl_6TSjL7EDHo4I",
    authDomain: "invoice-app-7e2af.firebaseapp.com",
    projectId: "invoice-app-7e2af",
    storageBucket: "invoice-app-7e2af.appspot.com",
    messagingSenderId: "221962979381",
    appId: "1:221962979381:web:0acdcb552c74f87673897c",
    measurementId: "G-EJ4ECEW531"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export { firebaseApp, db };
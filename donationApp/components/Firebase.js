import  {getFirestore} from  'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";




const firebaseConfig = {
    apiKey: "AIzaSyD_RB0NmhSvprCJK9OM7N0Rxew3yGX_HsQ",
    authDomain: "donation-app-2023.firebaseapp.com",
    projectId: "donation-app-2023",
    storageBucket: "donation-app-2023.appspot.com",
    messagingSenderId: "37296521358",
    appId: "1:37296521358:web:02729d90bd0386bd8549df",
    measurementId: "G-N47H1FXDWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore;
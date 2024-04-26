// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsK0j0ezalAS1lhbYCICzpDKnnpOnClQ8",
  authDomain: "rnauth-a0d57.firebaseapp.com",
  projectId: "rnauth-a0d57",
  storageBucket: "rnauth-a0d57.appspot.com",
  messagingSenderId: "254619080949",
  appId: "1:254619080949:web:cbad8585f7abf4392c0dbc"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
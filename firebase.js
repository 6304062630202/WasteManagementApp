// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIN1lAfPifOoA0DVZeqYuso37__rJaIgc",
  authDomain: "wasteapp-41f34.firebaseapp.com",
  projectId: "wasteapp-41f34",
  storageBucket: "wasteapp-41f34.appspot.com",
  messagingSenderId: "927694713216",
  appId: "1:927694713216:web:94c28e18abda979b5a5165",
  measurementId: "G-B8YWSD37KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
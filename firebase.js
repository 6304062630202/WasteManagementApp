import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage };  

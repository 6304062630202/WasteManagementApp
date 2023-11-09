// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4Ml4JZc3mqGloE_o_HTjxWg3l9f-ffrE",
  authDomain: "wastemanagement-36c59.firebaseapp.com",
  projectId: "wastemanagement-36c59",
  storageBucket: "wastemanagement-36c59.appspot.com",
  messagingSenderId: "658415510925",
  appId: "1:658415510925:web:07c384d66913e0c1de09c4"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth }
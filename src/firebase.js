// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjXNg1t2dOL4JOu1qK5QIEwzmzpe8PetY",
  authDomain: "nosql-2886e.firebaseapp.com",
  databaseURL: "https://nosql-2886e-default-rtdb.firebaseio.com",
  projectId: "nosql-2886e",
  storageBucket: "nosql-2886e.firebasestorage.app",
  messagingSenderId: "876874552636",
  appId: "1:876874552636:web:7ac6cb81fea9c4d54cfa39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBOEqr3ND5U7scSKYjGVdGHtTlobwPNb5I",
  authDomain: "sharedvalues-b1ae0.firebaseapp.com",
  databaseURL: "https://sharedvalues-b1ae0-default-rtdb.firebaseio.com",
  projectId: "sharedvalues-b1ae0",
  storageBucket: "sharedvalues-b1ae0.firebasestorage.app",
  messagingSenderId: "65510776734",
  appId: "1:65510776734:web:16f7a259544d59f0b3c08f",
  measurementId: "G-8RX6MNBM3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore();
export const db = getDatabase(app); // Initialize the Realtime Database
export const storage = getStorage(app); // Initialize Firebase Storage

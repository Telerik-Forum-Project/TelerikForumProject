// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDILU8GuhT-fKVwnsjpl58CE4TsdgNS8Sg",
  authDomain: "wellbeing-forum-telerk.firebaseapp.com",
  projectId: "wellbeing-forum-telerk",
  storageBucket: "wellbeing-forum-telerk.appspot.com",
  messagingSenderId: "402944250987",
  appId: "1:402944250987:web:cf707ed780bdadf3950d2e",
  databaseURL: 'https://wellbeing-forum-telerk-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
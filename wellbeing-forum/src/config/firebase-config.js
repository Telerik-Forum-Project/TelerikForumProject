// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDILU8GuhT-fKVwnsjpl58CE4TsdgNS8Sg",
  authDomain: "wellbeing-forum-telerk.firebaseapp.com",
  projectId: "wellbeing-forum-telerk",
  storageBucket: "wellbeing-forum-telerk.appspot.com",
  messagingSenderId: "402944250987",
  appId: "1:402944250987:web:cf707ed780bdadf3950d2e",
  databaseURL: 'https://wellbeing-forum-telerk-default-rtdb.europe-west1.firebasedatabase.app/'
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);
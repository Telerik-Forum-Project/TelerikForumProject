import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDataBase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBMLZtke_5jTEWWN53XuYRuyekCUDWtWeA",
  authDomain: "telerikforumproject.firebaseapp.com",
  projectId: "telerikforumproject",
  storageBucket: "telerikforumproject.appspot.com",
  messagingSenderId: "654185871956",
  appId: "1:654185871956:web:d571aa3c8c4749bb524bc1",
  databaseURL: "https://telerikforumproject-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDataBase(app);
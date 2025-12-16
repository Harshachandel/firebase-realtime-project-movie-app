import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPxZNC_cZ0b5XMw3ydvm_89sZTkqHJKVA",
  authDomain: "authentication-project1-8c06a.firebaseapp.com",
  projectId: "authentication-project1-8c06a",
  storageBucket: "authentication-project1-8c06a.appspot.com",
  messagingSenderId: "1046478929078",
  appId: "1:1046478929078:web:3c50341c580c3176c77a17",
  databaseURL:
    "https://authentication-project1-8c06a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

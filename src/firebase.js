// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhqecX0gBkDqq6KiSn0OHzlbuhV-1sxsY",
  authDomain: "proyectofinal-e9e1e.firebaseapp.com",
  projectId: "proyectofinal-e9e1e",
  storageBucket: "proyectofinal-e9e1e.appspot.com",
  messagingSenderId: "371607421166",
  appId: "1:371607421166:web:f96aac0b5cd434164a73ff",
  measurementId: "G-LVE6WH9R2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app)
export const auth= getAuth(app)
export const storage=getStorage(app)
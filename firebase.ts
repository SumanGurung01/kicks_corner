// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl6mZDsEKh8Zvr0NDhwR0MiaHCKGIXuR0",
  authDomain: "kicks-corner.firebaseapp.com",
  projectId: "kicks-corner",
  storageBucket: "kicks-corner.appspot.com",
  messagingSenderId: "192692668781",
  appId: "1:192692668781:web:280d6e2de354e7a36ab264",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

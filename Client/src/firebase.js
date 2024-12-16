// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-8d262.firebaseapp.com",
  projectId: "blog-mern-8d262",
  storageBucket: "blog-mern-8d262.firebasestorage.app",
  messagingSenderId: "866191437734",
  appId: "1:866191437734:web:88b296964171b797046967",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

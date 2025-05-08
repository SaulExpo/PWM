import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVoUOYXHjElTc0hHnin2y69EcPoQVNcJI",
  authDomain: "queteparece-365be.firebaseapp.com",
  projectId: "queteparece-365be",
  storageBucket: "queteparece-365be.firebasestorage.app",
  messagingSenderId: "639994562420",
  appId: "1:639994562420:web:8f31edfed6eb86f532ce21",
  measurementId: "G-61Y18XFEEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);// Para autenticación de Firebase
const db = getFirestore(app, "(default)");

export {db, auth};

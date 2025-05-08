import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVoUOYXHjElTc0hHnin2y69EcPoQVNcJI",
  authDomain: "queteparece-365be.firebaseapp.com",
  projectId: "queteparece-365be",
  storageBucket: "queteparece-365be.firebasestorage.app",
  messagingSenderId: "639994562420",
  appId: "1:639994562420:web:8f31edfed6eb86f532ce21",
  measurementId: "G-61Y18XFEEY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};

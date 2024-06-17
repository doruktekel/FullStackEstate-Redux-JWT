// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2692d.firebaseapp.com",
  projectId: "mern-estate-2692d",
  storageBucket: "mern-estate-2692d.appspot.com",
  messagingSenderId: "444515155415",
  appId: "1:444515155415:web:97ed92c647bd15ff075f92",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

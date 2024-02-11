// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyaNWY8d0UirP4m5NWb5KTO620ddgSroM",
  authDomain: "cinema-elx-54321.firebaseapp.com",
  projectId: "cinema-elx-54321",
  storageBucket: "cinema-elx-54321.appspot.com",
  messagingSenderId: "281582959180",
  appId: "1:281582959180:web:7965bf58a5473caf5752e9",
  measurementId: "G-JVHZENEXTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
// const analytics = getAnalytics(app);

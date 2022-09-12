// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC484LvIrfq46__ixFhrzJS1FTWcxCVnFc",
  authDomain: "netflix-clone-30071.firebaseapp.com",
  projectId: "netflix-clone-30071",
  storageBucket: "netflix-clone-30071.appspot.com",
  messagingSenderId: "356431370965",
  appId: "1:356431370965:web:97d73e60701aaeb840205c",
  measurementId: "G-GMD9BC1BB0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() //check
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
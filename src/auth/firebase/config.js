// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCWzdkhZSmf_joKrYmND43S7GyVInnOoFM',
    authDomain: 'react-5639a.firebaseapp.com',
    projectId: 'react-5639a',
    storageBucket: 'react-5639a.appspot.com',
    messagingSenderId: '142596927556',
    appId: '1:142596927556:web:062413e3ae2925842b8c11'
    
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )


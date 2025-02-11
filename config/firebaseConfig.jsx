// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVffxqKAmb_uRUD_3t1pppNgg2f99oU2w",
  authDomain: "learnova-01.firebaseapp.com",
  projectId: "learnova-01",
  storageBucket: "learnova-01.firebasestorage.app",
  messagingSenderId: "1075369665968",
  appId: "1:1075369665968:web:80976320d311f699736275",
  measurementId: "G-FW27S1Y9PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app)
const analytics = getAnalytics(app);
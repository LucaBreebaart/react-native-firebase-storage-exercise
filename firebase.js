import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCcSQCP7zfCiH_w-3m0zHaIIrVyfbFCjiI",
    authDomain: "class-work-4f8d5.firebaseapp.com",
    projectId: "class-work-4f8d5",
    storageBucket: "class-work-4f8d5.appspot.com",
    messagingSenderId: "197991584859",
    appId: "1:197991584859:web:f7ff6e0bba462fd5c21b7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_mUIz6C8Xz2WaGQaivYEYNhqomEOR5fM",
  authDomain: "studyplan-57d65.firebaseapp.com",
  projectId: "studyplan-57d65",
  storageBucket: "studyplan-57d65.firebasestorage.app",
  messagingSenderId: "571844476561",
  appId: "1:571844476561:web:952b72808858645fe88930",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Optionally, if you want to use Firestore
const db = getFirestore(app);

export { auth, db };

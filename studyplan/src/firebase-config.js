// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_mUIz6C8Xz2WaGQaivYEYNhqomEOR5fM",
  authDomain: "studyplan-57d65.firebaseapp.com",
  projectId: "studyplan-57d65",
  storageBucket: "studyplan-57d65.appspot.com", // Corrected invalid storageBucket URL
  messagingSenderId: "571844476561",
  appId: "1:571844476561:web:952b72808858645fe88930",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Optionally, initialize Google Auth Provider if needed
const googleAuthProvider = new GoogleAuthProvider();

// Export modules for use in your app
export { app, auth, db, googleAuthProvider };

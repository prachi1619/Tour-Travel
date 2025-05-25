import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCrlKCmO9P1gpPdvB1ZiUg0BiLs_llg3uY",
  // apiKey: "AIzaSyDm6InoH03YoPzVrNAzCkkAbudWEAD6l6c",/
  authDomain: "tour-travel-72599.firebaseapp.com",
  projectId: "tour-travel-72599",
  storageBucket: "tour-travel-72599.appspot.com",
  messagingSenderId: "808928038121",
  appId: "1:808928038121:web:1e23bfe84fca3df87d7478",
  measurementId: "G-PWE273LNTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Storage with proper configuration
const storage = getStorage(app);

// Ensure storage is properly initialized before exporting
if (!storage) {
  throw new Error('Firebase Storage not initialized properly');
}

export { storage };
export default app; 
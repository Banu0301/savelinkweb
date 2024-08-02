















import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEfAgRsxXbUnD46L8tbw2SbtKhfP3pYVc",
    authDomain: "smart-link-organizer.firebaseapp.com",
    projectId: "smart-link-organizer",
    storageBucket: "smart-link-organizer.appspot.com",
    messagingSenderId: "777643642125",
    appId: "1:777643642125:web:3b7517adb60c225e3ef444",
    measurementId: "G-C7T5WP09SC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export { auth, db, signInWithGoogle, signOutUser };

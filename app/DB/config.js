import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAqs2BhFtfYZVabLOA0IeNWj2f6N31Tjo",
  authDomain: "carclinicapi-9d12c.firebaseapp.com",
  projectId: "carclinicapi-9d12c",
  storageBucket: "carclinicapi-9d12c.appspot.com",
  messagingSenderId: "768540582254",
  appId: "1:768540582254:web:7265916ed95bbb52dd217f",
  measurementId: "G-WFGJWY47XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

console.log('firebase initialized!', app);

export {
  app,
  storage,
  firestore,
  auth
};

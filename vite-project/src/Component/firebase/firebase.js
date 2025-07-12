// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUovvtuYVTcf9ZM29yeJ5zZQxZGg7GYfA",
  authDomain: "odoo-e8071.firebaseapp.com",
  projectId: "odoo-e8071",
  storageBucket: "odoo-e8071.appspot.com",
  messagingSenderId: "550242062483",
  appId: "1:550242062483:web:2cf3fd8d1e4ef203cf7d66",
  measurementId: "G-B58D4J2YV5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkyLVj_hU0u1SsEtjD0FJ9NxykQYOLxs8",
  authDomain: "eco-track-d9445.firebaseapp.com",
  projectId: "eco-track-d9445",
  storageBucket: "eco-track-d9445.firebasestorage.app",
  messagingSenderId: "123635369992",
  appId: "1:123635369992:web:be46b7f7a39ac57a4b69bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
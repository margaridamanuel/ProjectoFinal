import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAy6lQ4NKdqI9cKWOP8eZxzCvgn_okNw8w",
  authDomain: "turismoangola-f67dc.firebaseapp.com",
  projectId: "turismoangola-f67dc",
  storageBucket: "turismoangola-f67dc.firebasestorage.app",
  messagingSenderId: "541530181053",
  appId: "1:541530181053:web:bc6342e57e4a60978d56d4",
  measurementId: "G-1NG52JSDP7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ exportar auth
export { auth };

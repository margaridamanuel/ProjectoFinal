// login.js
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector("#loginEmail").value;
  const password = loginForm.querySelector("#loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    if (role === "admin") window.location.href = "admin.html";
    else window.location.href = "book.html";
  } catch (err) {
    alert("Erro no login: " + err.message);
  }
});

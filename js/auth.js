import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Login
const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

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

// Registro
const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = registerForm.firstName.value;
  const lastName = registerForm.lastName.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setDoc(doc(db, "Users", userCredential.user.uid), {
      firstName,
      lastName,
      role: "user",
    });
    alert("Conta criada com sucesso! Faça login.");
    registerForm.reset();
  } catch (err) {
    alert("Erro no registro: " + err.message);
  }
});

// Monitorar login para exibir nome
const userDisplay = document.getElementById("userDisplay");
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const { firstName, lastName } = userDoc.data();
      if (userDisplay) userDisplay.textContent = `${firstName} ${lastName}`;
    }
  } else {
    if (userDisplay) userDisplay.textContent = "";
  }
});

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "home.html";
});

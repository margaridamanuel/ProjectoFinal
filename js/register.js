// register.js
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = registerForm.querySelector("#registerNome").value;
  const email = registerForm.querySelector("#registerEmail").value;
  const password = registerForm.querySelector("#registerPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: nome });

    await setDoc(doc(db, "Users", user.uid), {
      nome: nome,
      role: "user",
    });

    alert("Conta criada com sucesso!");
    window.location.href = "book.html";
  } catch (err) {
    alert("Erro no registro: " + err.message);
  }
});

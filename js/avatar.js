const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//////////////////////////////////////
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const avatarDiv = document.getElementById("userAvatar");
  const avatarCircle = document.getElementById("avatarCircle");
  const usernameSpan = document.getElementById("username");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      avatarDiv.style.display = "none"; // Esconde avatar
      return;
    }

    // Mostra avatar
    avatarDiv.style.display = "flex";

    // Nome completo ou email
    const nomeCompleto = user.displayName || user.email || "Usuário";
    usernameSpan.textContent = nomeCompleto;

    // Calcula iniciais
    const nomes = nomeCompleto.trim().split(" ");
    let iniciais = nomes[0][0];
    if (nomes.length > 1) {
      iniciais += nomes[nomes.length - 1][0];
    }

    avatarCircle.textContent = iniciais.toUpperCase();
  });
});

// reservas.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("bookingForm");
const userLabel = document.getElementById("userLabel");

// Bloqueia formulário até login
form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    form
      .querySelectorAll("input, button")
      .forEach((el) => (el.disabled = false));

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    const nome = userDoc.exists() ? userDoc.data().nome : user.email;
    if (userLabel) userLabel.textContent = `Olá, ${nome}`;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("Você precisa estar logado para reservar!");
    window.location.href = "login.html";
    return;
  }

  try {
    await addDoc(collection(db, "reservas"), {
      nome: form.name.value,
      email: form.email.value,
      telefone: form.phone.value,
      endereco: form.address.value,
      destino: form.destino.value,
      viajantes: form.numero_viajentes.value,
      chegada: form.data_chegada.value,
      partida: form.data_partida.value,
      userId: auth.currentUser.uid,
      timestamp: new Date(),
    });
    alert("Reserva realizada com sucesso!");
    form.reset();
    window.location.href = "obrigado.html";
  } catch (err) {
    alert("Erro ao enviar: " + err.message);
  }
});

// Menu Mobile Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#menu-btn");
  const navbar = document.querySelector(".header .navbar");

  if (menu && navbar) {
    menu.addEventListener("click", () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
    });
  }
});

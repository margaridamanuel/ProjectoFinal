// admin.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (user.email !== "admin@turismo.com") {
    alert("Acesso restrito ao administrador.");
    window.location.href = "home.html";
  }
});

const tabela = document.querySelector("#reservasTable tbody");

function carregarReservas() {
  onSnapshot(collection(db, "reservas"), (snapshot) => {
    tabela.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const r = docSnap.data();
      tabela.innerHTML += `
        <tr>
          <td>${r.nome || ""}</td>
          <td>${r.email || ""}</td>
          <td>${r.telefone || ""}</td>
          <td>${r.endereco || ""}</td>
          <td>${r.destino || ""}</td>
          <td>${r.viajantes || ""}</td>
          <td>${r.chegada || ""}</td>
          <td>${r.partida || ""}</td>
          <td>
            <button onclick="editarReserva('${docSnap.id}')">Editar</button>
            <button onclick="excluirReserva('${docSnap.id}')">Excluir</button>
          </td>
        </tr>
      `;
    });
  });
}
carregarReservas();

window.editarReserva = async (id) => {
  const novoNome = prompt("Novo nome:");
  const novoDestino = prompt("Novo destino:");
  const novaChegada = prompt("Nova data de chegada:");
  const novaPartida = prompt("Nova data de partida:");
  await updateDoc(doc(db, "reservas", id), {
    nome: novoNome,
    destino: novoDestino,
    chegada: novaChegada,
    partida: novaPartida,
  });
};

window.excluirReserva = async (id) => {
  if (confirm("Tem certeza que deseja excluir?")) {
    await deleteDoc(doc(db, "reservas", id));
  }
};

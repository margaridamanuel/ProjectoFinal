import { db } from "./firebase.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function testarConexao() {
  await addDoc(collection(db, "teste_conexao"), {
    mensagem: "Firebase conectado com sucesso",
    data: new Date(),
  });

  console.log("Ligação ao Firebase OK");
}

testarConexao();

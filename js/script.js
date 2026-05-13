import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Inicializar Swiper para a Home

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".home-slider", {
    loop: true, // slides infinitos
    autoplay: {
      delay: 4000, // troca a cada 4 segundos
      disableOnInteraction: false,
    },
    effect: "slide", // deslizamento normal
  });
});

// Load More para Destinos

let loadMoreBtn = document.querySelector(".home-packeges .load-more .btn");
let currentItem = 3; // mostrar inicialmente 3 itens

if (loadMoreBtn) {
  loadMoreBtn.onclick = () => {
    let boxes = document.querySelectorAll(".home-packeges .box-container .box");
    for (let i = currentItem; i < boxes.length; i++) {
      boxes[i].style.display = "inline-block";
    }
    currentItem += 3;
    if (currentItem >= boxes.length) {
      loadMoreBtn.style.display = "none";
    }
  };
}

// avatar
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("userAvatar").style.display = "flex";

    const nomeCompleto = user.displayName || user.email;

    document.getElementById("username").textContent = nomeCompleto;

    // Função para gerar iniciais
    function gerarIniciais(nome) {
      const nomes = nome.trim().split(" ");
      if (nomes.length === 1) {
        return nomes[0][0];
      } else {
        return nomes[0][0] + nomes[nomes.length - 1][0];
      }
    }

    const iniciais = gerarIniciais(nomeCompleto);
    document.getElementById("avatarCircle").textContent = iniciais;
  } else {
    document.getElementById("userAvatar").style.display = "none";
  }
});

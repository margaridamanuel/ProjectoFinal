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

let loadMoreBtn = document.querySelector(".packages .load-more .btn");
let boxes = document.querySelectorAll(".packages .box-container .box");

let currentItem = 3;
loadMoreBtn.onclick = () => {
  let boxes = document.querySelectorAll(".packages .box-container .box");
  for (let i = currentItem; i < currentItem + 3; i++) {
    if (boxes[i]) boxes[i].style.display = "inline-block";
  }
  currentItem += 3;
  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};

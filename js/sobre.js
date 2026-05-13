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

// Inicializar Swiper para a sobre
const reviewSwiper = new Swiper(".reviews-slider", {
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  slidesPerView: 1,
  spaceBetween: 20,
});

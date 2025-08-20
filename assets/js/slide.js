const swiper = new Swiper(".mySwiper", {
  //*bu niye compile error verir
  
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    500: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

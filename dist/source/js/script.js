// const carousel = document.querySelector(".carousel");
// const filmes = document.querySelectorAll(".filme");
// const dots = document.querySelectorAll(".dot");

// let currentIndex = 0;

// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     showFilmes(index * 3);
//   });
// });

// function showFilmes(startIndex) {
//   currentIndex = startIndex;
//   updateCarousel();
// }

// function updateCarousel() {
//   const newTransformValue = -currentIndex * 1;
//   carousel.style.transform = `translateX(${newTransformValue}px)`;

//   filmes.forEach((filme, index) => {
//     const isVisible = index >= currentIndex && index < currentIndex + 3;
//     filme.style.display = isVisible ? "flex" : "none";
//   });
// }

// updateCarousel();

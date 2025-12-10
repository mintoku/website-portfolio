
document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll("#name-wordle .flip");

  tiles.forEach((flip, index) => {
    setTimeout(() => {
      flip.classList.add("reveal");
    }, index * 350); // 0ms, 200ms, 400ms, ...
  });
});

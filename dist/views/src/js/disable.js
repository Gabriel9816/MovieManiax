const check = document.querySelector("#assistidoCheck");
const avaliacao = document.querySelectorAll("#avaliacao");
const icone = document.querySelector("#status");

check.addEventListener("click", (event) => {
  if (check.checked) {
    avaliacao.forEach((element) => {
      element.disabled = false;
    });
    icone.classList.remove("bx-badge-check");
    icone.classList.add("bxs-badge-check");
  } else {
    avaliacao.forEach((element) => {
      element.disabled = true;
    });
    icone.classList.remove("bxs-badge-check");
    icone.classList.add("bx-badge-check");
  }
});

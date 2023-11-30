const form = document.querySelector(".add");

const nome = document.querySelector(".texto");
const sinopse = document.querySelector(".texto-grande");
const ano = document.querySelector(".ano");
const capa = document.querySelector("#imagem-filme");
const categoria = document.querySelector("#generos-selecionados");
const duracao = document.querySelector(".horas");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/filmes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      sinopse: sinopse.value,
      capa: capa.value,
      ano: ano.value,
      categoria: categoria.innerHTML,
      duracao: duracao.value,
    }),
  }).then(() => {
    window.location.href = "/home";
  });
});

const form = document.querySelector("#cadasFilme");

const nome = document.querySelector("#nome");
const ano = document.querySelector("#ano");
const capa = document.querySelector("#capa");
const categoria = document.querySelector("#categoria");
const duracao = document.querySelector("#duracao");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/filmes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      capa: capa.value,
      ano: ano.value,
      categoria: categoria.value,
      duracao: duracao.value,
    }),
  }).then(() => {
    window.location.href = "/home";
  });
});

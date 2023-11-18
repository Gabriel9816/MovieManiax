const form = document.querySelector("#addComent");

const text = document.querySelector("#text");
const img = document.querySelector("#img");
const filme = document.querySelector("#filme");
const usuario = document.querySelector("#usuario");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/comentarios/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text.value,
      img: img.value,
      filme: filme.value,
      usuario: usuario.value,
    }),
  });
});

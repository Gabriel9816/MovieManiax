const form = document.querySelector("#form");

const nome = document.querySelector("#user");
const email = document.querySelector("#email");
const senha = document.querySelector("#password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/cadastro/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    }),
  }).then(() => {
    window.location.href = "/login";
  });
});

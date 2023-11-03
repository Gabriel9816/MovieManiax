const form = document.querySelector("#cadasUser");

const nome = document.querySelector("#user");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const res = await fetch("/cadastro/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      senha: senha.value,
    }),
  });
});

const UsuarioModel = require("../../models/usuario");

const form = document.querySelector("#cadasUser");

const usuarioModel = new UsuarioModel();

const nome = document.querySelector("#user");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nomeValue = nome.value;
  const emailValue = email.value;
  const senhaValue = senha.value;

  console.log(nomeValue, emailValue, senhaValue);
});

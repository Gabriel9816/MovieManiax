const express = require("express");
const UsuarioModel = require("./models/usuario");

const app = express();

//Rotas paginas

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/cadastro.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/views/visualizacao.html");
});

app.use("/source", express.static(__dirname + "/views/src"));
app.use("/controllers", express.static(__dirname + "/controllers"));
app.use(express.json());

//Rotas CRUD

app.post("/cadastro/add", async (req, res) => {
  const usuarioModel = new UsuarioModel();

  await usuarioModel.add(req.body.nome, req.body.email, req.body.senha);

  window.location.href = "/login";
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});

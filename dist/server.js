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

  res.json({
    success: true,
    message: "Usuário criado com sucesso!",
  });
});

app.post("/login/enter", async (req, res) => {
  const usuarioModel = new UsuarioModel();
  await usuarioModel.login(req.body.email, req.body.senha);

  res.json({
    success: true,
    message: "Usuário logado com sucesso!",
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080!");
});

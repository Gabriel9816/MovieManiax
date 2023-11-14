const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const UsuarioModel = require("./models/usuario");

const app = express();

app.use("/source", express.static(__dirname + "/views/src"));
app.use("/controllers", express.static(__dirname + "/controllers"));
app.use(express.json());
app.use(cookieParser());

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
  autentication(req, res, req.cookies.token);
  console.log(req.cookies.token);
  res.sendFile(__dirname + "/views/visualizacao.html");
});

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
  const user = await usuarioModel.login(req.body.email, req.body.senha);

  if (!user) {
    return res.json({
      success: false,
      message: "Email ou senha inválidos!",
    });
  }

  const token = jwt.sign(user, "secret", {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.json({
    success: true,
    message: "Usuário logado com sucesso!",
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080!");
});

function autentication(req, res, token) {
  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}

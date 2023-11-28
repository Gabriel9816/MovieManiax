const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const UsuarioModel = require("./models/usuario");
const FilmeModel = require("./models/filme");

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

//Configs
// --------------------------------------------------------------------

app.use("/source", express.static(__dirname + "/views/src"));
app.use("/controllers", express.static(__dirname + "/controllers"));
app.use(express.json());
app.use(cookieParser());

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

//----------------------------------------------------------------------
// Rotas Paginas
//----------------------------------------------------------------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// app.get("/teste", async (req, res) => {
//   const FilmeModel = new FilmeModel();

//   FilmeModel.getAllFilme().then((filmes) => {
//     res.render("teste", {
//       filmes: filmes,
//     });

//     console.log(filmes);
//   });
// });

app.get("/filmes/add", (req, res) => {
  res.sendFile(__dirname + "/views/insertfilme.html");
});

app.get("/filmes/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/superusuario.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/cadastro.html");
});

app.get("/home", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/visualizacao.html");
});

app.get("/perfil", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/perfil.html");
});

app.get("/filmes", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/popular.html");
});

app.get("/filmes/detalhes", (req, res) => {
  res.sendFile(__dirname + "/views/assistido.html");
});

app.get("/sair", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("id");
  res.redirect("/");
});

//Rotas CRUD
// ------------------------------------------------------------------------

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

  res.cookie("id", user.id, {
    httpOnly: true,
    secure: true,
  });

  res.json({
    success: true,
    message: "Usuário logado com sucesso!",
  });
});

app.post("/addcapa", upload.single("imagem"), async (req, res) => {
  const filme = new FilmeModel();

  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const image = req.file.buffer.toString("base64");

  await filme.cadastrarFilme(titulo, sinopse, duracao, image);
});

// ----------------------------------------------------------------------------

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

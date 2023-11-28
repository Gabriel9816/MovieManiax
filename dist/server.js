const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");

//----------------------------------------------------------------------
//Models

const UsuarioModel = require("./models/usuario");
const FilmeModel = require("./models/filme");

//----------------------------------------------------------------------
//Rotas
// --------------------------------------------------------------------

const index = require("./routes/index");
const filmes = require("./routes/filmes");
const login = require("./routes/login");

//----------------------------------------------------------------------
//Configs
// --------------------------------------------------------------------

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use("/source", express.static(__dirname + "/views/src"));
app.use("/controllers", express.static(__dirname + "/controllers"));
app.use(express.json());
app.use(cookieParser());

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

//----------------------------------------------------------------------
// Rotas Paginas
//----------------------------------------------------------------------

app.get("/", index);
app.get("/login", login);
app.get("/filmes", filmes);

// app.get("/teste", async (req, res) => {
//   const FilmeModel = new FilmeModel();

//   FilmeModel.getAllFilme().then((filmes) => {
//     res.render("teste", {
//       filmes: filmes,
//     });

//     console.log(filmes);
//   });
// });

app.get("/cadastro", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "views", "cadastro.html"));
});

app.get("/filmes/add", (req, res) => {
  res.sendFile(__dirname + "/views/insertfilme.html");
});

app.get("/filmes/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/superusuario.html");
});

app.get("/home", (req, res) => {
  autentication(req, res, req.cookies.token);
  //res.sendFile(__dirname + "/views/visualizacao.html");
  res.render("visualizacao");
});

app.get("/perfil", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/perfil.html");
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

app.post("/addcapa", upload.single("imagem"), async (req, res) => {
  const filme = new FilmeModel();

  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const image = req.file.buffer.toString("base64");

  await filme.cadastrarFilme(titulo, sinopse, duracao, image);
});

app.post("/cadastro/add", async (req, res) => {
  const usuarioModel = new UsuarioModel();
  await usuarioModel.add(req.body.nome, req.body.email, req.body.senha);

  res.json({
    success: true,
    message: "Usuário criado com sucesso!",
  });
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

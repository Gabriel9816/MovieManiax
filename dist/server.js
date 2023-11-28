const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//middleware pra gerenciar upload de arquivos, pra ver se sobe as capas de filmes
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

app.get("/", (req, res) => {
  res.render("teste");
});

//https://www.youtube.com/watch?v=_Xwf-Q3F-Gs mt bom indiano
app.post("/addcapa", upload.single("imagem"), (req, res) => {
  //placeholder pros campos
  titulo = req.body.titulo;
  sinopse = req.body.sinopse;
  duracao = req.body.duracao;
  image = req.file.buffer.toString("base64");

  //isso aqui deve ter q mudar
  preenchedb = "INSERT INTO n sei VALUES(?,?,?,?)";
  //fiz o if mas n sei se precisa
  db.query(
    preenchedb[(titulo, sinopse, duracao, buffer)],
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
});

/*app.post("/upload", async (req, res) => {
  const filme = new FilmeModel();
  await filme.cadastrarFilme(
    "Avatar: O Caminho da Agua",
    "Sinopse 2",
    "120",
    req.body.imagem
  );
  res.json({
    success: true,
    message: "Filme cadastrado com sucesso!",
  });
});*/

//tentando listar
app.get("/teste", async (req, res) => {
  const FilmeModel = new FilmeModel();

  FilmeModel.getAllFilme().then((filmes) => {
    res.render("teste", {
      filmes: filmes,
    });

    console.log(filmes);
  });
});

app.get("/cadastrafilme", (req, res) => {
  res.sendFile(__dirname + "/views/insertfilme.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/views/cadastro.html");
});

app.get("/home", (req, res) => {
  res.render();
});

//Esboco para rota perfil

app.get("/perfil", (req, res) => {
  const usuarioModel = new UsuarioModel();

  usuarioModel.getUsuarioById(req.cookies.id).then((users) => {
    res.render("teste", {
      users: users,
    });
  });
});

app.get("/filmes", (req, res) => {
  console.log("Filmes");
});

app.get("/assistido", (req, res) => {
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

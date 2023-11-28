const express = require("express");
const cookieParser = require("cookie-parser");

//---------------------------------------------------------------------
//Rotas
// --------------------------------------------------------------------

const index = require("./routes/index");
const filmes = require("./routes/filmes");
const login = require("./routes/login");
const cadastro = require("./routes/cadastro");
const common = require("./routes/common");

//---------------------------------------------------------------------
//Configs
// --------------------------------------------------------------------

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
app.get("/cadastro", cadastro);
app.get("/filmes", filmes);
app.get("/home", common);

//----------------------------------------------------------------------

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080!");
});

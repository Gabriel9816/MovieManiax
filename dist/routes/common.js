const express = require("express");
const cookieParser = require("cookie-parser");
const autentication = require("../middlewares/authentication");
const router = express.Router();
const FilmeModel = require("../models/filme");
const UsuarioModel = require("../models/usuario");
const FilmesUsuarioModel = require("../models/filmesusuario");
const getTempoAssistido = require("../middlewares/tempoAssitido");

//-----------------------------------------------------------------------
//Models
//-----------------------------------------------------------------------

const filmeModel = new FilmeModel();
const usuarioModel = new UsuarioModel();
const filmesUsuarioModel = new FilmesUsuarioModel();

//-----------------------------------------------------------------------
//Rotas GET
//-----------------------------------------------------------------------

router.get("/", async (req, res) => {
  autentication(req, res, req.cookies.token);
  const filmes = await filmeModel.getThreeFilme();
  res.render("visualizacao", {
    filmes: filmes,
  });
});

router.get("/perfil", async (req, res) => {
  autentication(req, res, req.cookies.token);
  const id = req.cookies.id;

  const user = await usuarioModel.getUsuarioById(id);
  const count = await filmesUsuarioModel.getCountFilmesByUserId(id);
  const tempo = await getTempoAssistido(id);
  const filmes = await filmesUsuarioModel.getAllFilmsByUserId(id);

  res.render("perfil", {
    user: user[0],
    count: count[0],
    tempo: tempo,
    filmes: filmes,
  });
});

router.get("/sair", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("id");
  res.redirect("/");
});

module.exports = router;

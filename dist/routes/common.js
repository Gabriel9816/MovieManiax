const express = require("express");
const cookieParser = require("cookie-parser");
const autentication = require("../middlewares/authentication");
const router = express.Router();
const path = require("node:path");
const FilmeModel = require("../models/filme");

const filmeModel = new FilmeModel();

router.get("/", async (req, res) => {
  autentication(req, res, req.cookies.token);

  const filmes = await filmeModel.getThreeFilme();

  res.render("visualizacao", {
    filmes: filmes,
  });
});

router.get("/perfil", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(path.resolve(__dirname, "..", "views", "perfil.html"));
});

router.get("/sair", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("id");
  res.redirect("/");
});

module.exports = router;

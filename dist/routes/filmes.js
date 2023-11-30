const express = require("express");
const router = express.Router();
const path = require("node:path");
const FilmeModel = require("../models/filme");
const autentication = require("../middlewares/authentication");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.render("popular");
});

router.post("/add", upload.single("imagem"), async (req, res) => {
  const filme = new FilmeModel();

  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const image = req.file.buffer.toString("base64");

  await filme.cadastrarFilme(titulo, sinopse, duracao, image);
});

router.get("/detalhes/:id", (req, res) => {
  autentication(req, res, req.cookies.token);
  //console.log(req.params.id);
  res.sendFile(path.resolve(__dirname, "..", "views", "assistido.html"));
});

module.exports = router;

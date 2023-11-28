const express = require("express");
const router = express.Router();
const path = require("node:path");
const FilmeModel = require("../models/filme");
const autentication = require("../middlewares/authentication");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/filmes", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.render("assistido");
});

router.get("/cadastro", upload.single("imagem"), async (req, res) => {
  //res.sendFile(__dirname + "/views/superusuario.html");
  res.sendFile(__dirname + "/views/insertfilme.html");

  // const filme = new FilmeModel();

  // const titulo = req.body.titulo;
  // const sinopse = req.body.sinopse;
  // const duracao = req.body.duracao;
  // const image = req.file.buffer.toString("base64");

  // await filme.cadastrarFilme(titulo, sinopse, duracao, image);
});

router.get("/detelhes/:id", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/assistido.html");
});

module.exports = router;
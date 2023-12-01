const express = require("express");
const router = express.Router();
const path = require("node:path");
const FilmeModel = require("../models/filme");
const autentication = require("../middlewares/authentication");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const filmeModel = new FilmeModel();

router.get("/", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.render("popular");
});

router.post("/add", upload.single("imagem"), async (req, res) => {
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const image = req.file.buffer.toString("base64");
  const ano = req.body.ano;
  const genero = req.body.genero;

  await filmeModel.cadastrarFilme(titulo, sinopse, duracao, image, ano, genero);
});

router.get("/detalhes/:id", (req, res) => {
  autentication(req, res, req.cookies.token);
  //console.log(req.params.id);
  //res.sendFile(path.resolve(__dirname, "..", "views", "assistido.html"));
  res.render("assistido", { idfilme: req.params.id });
});

const ComentarioModel = require("../models/comentario");
router.post("/addcomentario", upload.single("imagem"), async (req, res) => {
  const comentario = new ComentarioModel();

  const idfilme = req.body.idfilme;
  console.log(idfilme);
  const text = req.body.comentario;
  const image = req.file.buffer.toString("base64");
  //await comentario.addComentario(text, image, idfilme, req.cookies.id);
});

module.exports = router;

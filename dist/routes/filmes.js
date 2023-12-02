const express = require("express");
const router = express.Router();
const path = require("node:path");
const FilmeModel = require("../models/filme");
const autentication = require("../middlewares/authentication");
const multer = require("multer");
const ComentarioModel = require("../models/comentario");

//-----------------------------------------------------------------------
//Models
//-----------------------------------------------------------------------

const upload = multer({ storage: multer.memoryStorage() });
const filmeModel = new FilmeModel();
const comentarioModel = new ComentarioModel();

//-----------------------------------------------------------------------
//Rotas GET
//-----------------------------------------------------------------------

router.get("/", (req, res) => {
  autentication(req, res, req.cookies.token);

  filmeModel.getAllFilme().then((filmes) => {
    res.render("popular", {
      filmes: filmes,
    });
  });
});

router.get("/detalhes/:id", async (req, res) => {
  autentication(req, res, req.cookies.token);
  const comentarios = await comentarioModel.getAllComentsByFilmId(
    req.params.id
  );
  const filme = await filmeModel.getFilmeById(req.params.id);
  res.render("assistido", {
    filme: filme[0],
    comentarios: comentarios,
  });
});

//-----------------------------------------------------------------------
//Rotas POST
//-----------------------------------------------------------------------

router.post("/add", upload.single("imagem"), async (req, res) => {
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = req.body.duracao;
  const image = req.file.buffer.toString("base64");
  const ano = req.body.ano;
  const genero = req.body.genero;
  const extensaoArquivo = path.extname(req.file.originalname).toLowerCase();

  await filmeModel.cadastrarFilme(
    titulo,
    sinopse,
    image,
    duracao,
    genero,
    ano,
    extensaoArquivo
  );

  res.redirect("/filmes");
});

router.post("/addcomentario", upload.single("imagem"), async (req, res) => {
  const idfilme = req.body.idfilme;
  const text = req.body.comentario;
  const image = req.file.buffer.toString("base64");
  const extensao = path.extname(req.file.originalname).toLowerCase();
  const iduser = req.cookies.id;

  await comentarioModel.addComentario(iduser, idfilme, text, image, extensao);

  res.redirect(`/filmes/detalhes/${idfilme}`);
});

module.exports = router;

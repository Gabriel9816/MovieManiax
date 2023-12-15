const express = require("express");
const router = express.Router();
const path = require("node:path");
const autenticacaoSuper = require("../middlewares/autenticacaoSuper");
const FilmeModel = require("../models/filme");

const filmeModel = new FilmeModel();

router.get("/", async (req, res) => {
  if ((await autenticacaoSuper(req.cookies.id)) === true) {
    res.sendFile(path.resolve(__dirname, "..", "views", "superusuario.html"));
  } else {
    res.redirect("/user");
  }
});

router.get("/excluir/:id", async (req, res) => {
  if ((await autenticacaoSuper(req.cookies.id)) === true) {
    const id = req.params.id;
    await filmeModel.delFilme(id);
    res.redirect("/filmes");
  } else {
    res.redirect("/user");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const UsuarioModel = require("../models/usuario");
const path = require("node:path");

//-----------------------------------------------------------------------
//Models
//-----------------------------------------------------------------------

const usuarioModel = new UsuarioModel();

//-----------------------------------------------------------------------
//Rotas GET
//-----------------------------------------------------------------------

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "views", "cadastro.html"));
});

//-----------------------------------------------------------------------
//Rotas POST
//-----------------------------------------------------------------------

router.post("/add", async (req, res) => {
  await usuarioModel.add(req.body.nome, req.body.email, req.body.senha);

  res.json({
    success: true,
    message: "Usuário criado com sucesso!",
  });
});

module.exports = router;

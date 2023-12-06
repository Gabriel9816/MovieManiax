const express = require("express");
const router = express.Router();
const path = require("node:path");
const UsuarioModel = require("../models/usuario");
const jwt = require("jsonwebtoken");

//-----------------------------------------------------------------------
//Models
//-----------------------------------------------------------------------

const usuarioModel = new UsuarioModel();

//-----------------------------------------------------------------------
//Rotas GET
//-----------------------------------------------------------------------

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "views", "login.html"));
});

//-----------------------------------------------------------------------
//Rotas POST
//-----------------------------------------------------------------------

router.post("/enter", async (req, res) => {
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

  return res.json({
    success: true,
    message: "Usuário logado com sucesso!",
  });
});

module.exports = router;

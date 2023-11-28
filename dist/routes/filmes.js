const express = require("express");
const router = express.Router();
const path = require("node:path");
const UsuarioModel = require("../models/usuario");

router.get("/filmes", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.render("assistido");
});

module.exports = router;

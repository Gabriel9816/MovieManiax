const express = require("express");
const cookieParser = require("cookie-parser");
const autentication = require("../middlewares/authentication");
const router = express.Router();
const path = require("node:path");

router.get("/", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.render("visualizacao");
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

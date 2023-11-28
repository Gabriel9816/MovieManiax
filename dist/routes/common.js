const express = require("express");
const cookieParser = require("cookie-parser");
const autentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/home", (req, res) => {
  console.log(req.cookies);
  autentication(req, res, req.cookies.token);
  res.render("visualizacao");
});

router.get("/perfil", (req, res) => {
  autentication(req, res, req.cookies.token);
  res.sendFile(__dirname + "/views/perfil.html");
});

router.get("/sair", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("id");
  res.redirect("/");
});

module.exports = router;

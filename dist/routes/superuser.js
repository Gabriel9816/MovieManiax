const express = require("express");
const router = express.Router();
const path = require("node:path");
const autenticacaoSuper = require("../middlewares/autenticacaoSuper");

router.get("/", (req, res) => {
  if (autenticacaoSuper(req.cookies.id) === true) {
    res.sendFile(path.resolve(__dirname, "..", "views", "superusuario.html"));
  } else {
    res.redirect("/user");
  }
});

module.exports = router;

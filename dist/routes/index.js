const express = require("express");
const router = express.Router();
const path = require("node:path");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "views", "index.html"));
});

module.exports = router;

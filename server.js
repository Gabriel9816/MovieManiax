const express = require("express");

const app = express();
const router = app.router();

app.use("/static", express.static(__dirname + "dist"));

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/dist/views/index.html");
  res.send(JSON.stringify(router._allRoutes));
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000!");
});

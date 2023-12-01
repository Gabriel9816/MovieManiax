const ComentarioModel = require("..models/comentario");

router.post("/addcomentario", upload.single("imagem"), async (req, res) => {
  const comentario = new ComentarioModel();

  const idfilme = req.body.idfilme;
  const text = req.body.comentario;
  const image = req.file.buffer.toString("base64");
  await comentario.addComentario(
    text,
    image,
    idfilme,
    req.cookies.id,
    Date.now()
  );
});

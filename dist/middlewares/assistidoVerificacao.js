const FilmesUsuarioModel = require("../models/filmesusuario");

const filmeUsuarioModel = new FilmesUsuarioModel();

async function verificaAssitido(id, idFilme) {
  const filme = await filmeUsuarioModel.verificaFilmeJaCadastrado(id, idFilme);

  if (filme.length > 0) {
    return true;
  }
  return false;
}

module.exports = verificaAssitido;

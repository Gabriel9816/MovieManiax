const FilmesUsuarioModel = require("../models/filmesusuario");

function getTempoAssistido(id) {
  const filmesUsuarioModel = new FilmesUsuarioModel();
  let tempo = 0;
  let horas = 0,
    dias = 0,
    meses = 0;

  filmesUsuarioModel.getAllFilmsByUserId(id).then((filmes) => {
    filmes.forEach((element) => {
      tempo += element.duracao;
    });

    horas = Math.floor(tempo / 60);
    dias = Math.floor(horas / 24);
    meses = Math.floor(dias / 30);
  });

  return {
    horas,
    dias,
    meses,
  };
}

module.exports = getTempoAssistido;

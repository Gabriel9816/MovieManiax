const FilmeModel = require("../../models/filme");
const FilmesUsuarioModel = require("../../models/filmesusuario");

const filmeModel = new FilmeModel();
const filmesUsuarioModel = new FilmesUsuarioModel();
let tempo = 0;

//Calculo de tempo adicionar ao server depois

filmesUsuarioModel.getAllFilmsByUserId(1).then((filmes) => {
  filmes.forEach((element) => {
    tempo += element.duracao;
  });

  console.log(tempo);

  let horas = Math.floor(tempo / 60);
  let dias = Math.floor(horas / 24);
  let meses = Math.floor(dias / 30);

  console.log(horas, dias, meses);
});

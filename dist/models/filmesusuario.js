const Conexao = require("./conexao.js");

class UserFilmesModel{
    tabela = "filmesusuario"
    db = new Conexao();

    constructor(){
        this.db.conectar();
    }

    async getAllUserFilmes() {
        try {
          const results = await this.db.query(`SELECT * FROM filmesusuario
          INNER JOIN filme ON filmesusuario.filme = filme.id
          WHERE filmesusuario.usuario = ${id};`);
          return results;
        } catch (err) {
          throw err;
        }
      }
}
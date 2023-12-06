const Conexao = require("./conexao.js");

class ComentarioModel {
  tabela = "comentario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async getAllComentsByFilmId(id) {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} INNER JOIN filme ON ${this.tabela}.idfilme = filme.id INNER JOIN usuario ON ${this.tabela}.idusuario = usuario.id
        WHERE filme.id = ${id};`
      );
      return results;
    } catch (err) {
      throw err;
    }
  }

  async addComentario(user, filme, texto, imagem, extensao) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (idusuario, idfilme, texto, imagem, extensao, data) VALUES (${user}, ${filme}, "${texto}", "${imagem}", "${extensao}", NOW())`
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ComentarioModel;

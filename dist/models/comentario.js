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

  async addComentario(comentario, filme, usuario) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (comentario, idfilme, idusuario, data) VALUES (${comentario}, ${filme}, ${usuario}, NOW())`
      );
    } catch (error) {
      throw error;
    }
  }

  async delComentario(id) {
    try {
      await this.db.query(`DELETE FROM ${this.tabela} WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ComentarioModel;

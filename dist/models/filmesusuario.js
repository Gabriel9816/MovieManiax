const Conexao = require("./conexao.js");

class FilmesUsuarioModel {
  tabela = "filmesusuario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async getCountFilmesByUserId(id) {
    try {
      const results = await this.db.query(
        `SELECT COUNT(*) as total FROM ${this.tabela} WHERE usuario = ${id}`
      );
      return results;
    } catch (err) {
      throw err;
    }
  }

  async getAllFilmsByUserId(id) {
    try {
      const results = await this.db
        .query(`SELECT filme.duracao, filme.titulo, ${this.tabela}.data FROM ${this.tabela}
          INNER JOIN filme ON ${this.tabela}.filme = filme.id
          WHERE ${this.tabela}.usuario = ${id};`);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async adicionaFilme(usuario, filme) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (usuario, filme, data) VALUES (${usuario}, ${filme}, NOW())`
      );
    } catch (error) {
      throw error;
    }
  }

  async removeFilmeDaLista(id) {
    try {
      await this.db.query(`DELETE FROM ${this.tabela} WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FilmesUsuarioModel;

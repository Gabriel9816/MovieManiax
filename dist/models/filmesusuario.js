const Conexao = require("./conexao.js");

class FilmesUsuarioModel {
  tabela = "filmesusuario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async verificaFilmeJaCadastrado(id, filme) {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE usuario = ${id} AND filme = ${filme}`
      );
      return results;
    } catch (err) {
      throw err;
    }
  }

  async getFilmsById(id) {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE filme = ${id}`
      );
      return results;
    } catch (err) {
      throw err;
    }
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
        .query(`SELECT filme.duracao, filme.titulo, ${this.tabela}.data, filme.extensaoCapa, filme.capa, filme.id FROM ${this.tabela}
          INNER JOIN filme ON ${this.tabela}.filme = filme.id
          WHERE ${this.tabela}.usuario = ${id};`);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async adicionaFilme(usuario, filme, avaliacao) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (usuario, filme, data, avaliacao) VALUES (${usuario}, ${filme}, NOW() , ${avaliacao})`
      );
    } catch (error) {
      throw error;
    }
  }

  async removeFilmeDaLista(id, filme) {
    try {
      await this.db.query(
        `DELETE FROM ${this.tabela} WHERE usuario = ${id} AND filme = ${filme}`
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FilmesUsuarioModel;

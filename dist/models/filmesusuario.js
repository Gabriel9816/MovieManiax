const Conexao = require("./conexao.js");

class FilmesUsuarioModel {
  tabela = "filmesusuario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async getAllFilmsByUserId(id) {
    try {
      const results = await this.db.query(`SELECT * FROM ${this.tabela}
          INNER JOIN filme ON ${this.tabela}.filme = filme.id
          WHERE ${this.tabela}.usuario = ${id};`);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async adicionaFilme(usuario, filme, data) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (usuario, filme, data) VALUES (${usuario}, ${filme}, ${data})`
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

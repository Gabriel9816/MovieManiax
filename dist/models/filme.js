const Conexao = require("./conexao.js");

class FilmeModel {
  tabela = "filme";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async getAllFilme() {
    try {
      const results = await this.db.query(`SELECT * FROM ${this.tabela}`);
      return results;
    } catch (err) {
      throw err;
    }
  }
  async getFilmeById(id) {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE id = ${id}`
      );
      return results;
    } catch (error) {
      throw error;
    }
  }

  async cadastrarFilme(titulo, sinopse, duracao, capa) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (titulo, sinopse, duracao, capa) VALUES (${titulo}, ${sinopse}, ${duracao}, ${capa})`
      );
    } catch (error) {
      throw error;
    }
  }

  async editaFilme(id, titulo, sinopse, duracao, capa) {
    try {
      await this.db.query(
        `UPDATE ${this.tabela} SET titulo = ${titulo}, sinopse = ${sinopse}, duracao = ${duracao}, capa = ${capa} WHERE id = ${id}`
      );
    } catch (error) {
      throw error;
    }
  }

  async delFilme(id) {
    try {
      await this.db.query(`DELETE FROM ${this.tabela} WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FilmeModel;

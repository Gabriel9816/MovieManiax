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

  async getThreeFilme() {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} LIMIT 3`
      );
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getTenFilms() {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} LIMIT 10`
      );
      return results;
    } catch (error) {
      throw error;
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

  async cadastrarFilme(titulo, sinopse, capa, duracao, genero, ano, extensao) {
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (titulo, sinopse, duracao, capa, ano, categoria, extensaoCapa) VALUES ("${titulo}", "${sinopse}", ${duracao}, "${capa}", ${ano},"${genero}", "${extensao}")`
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

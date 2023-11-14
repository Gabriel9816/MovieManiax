const Conexao = require("./conexao.js");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

class UsuarioModel {
  tabela = "usuario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async login(email, password) {
    const senhaenc = md5(password);
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE email = '${email}'`
      );

      if (results) {
        const user = results[0];
        if (user.senha === senhaenc) {
          return user;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getUsuarioById(id) {
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE id = ${id}`
      );
      return results;
    } catch (error) {
      throw error;
    }
  }

  async add(nome, email, senha) {
    const senhaenc = md5(senha);
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (nome, email, senha) VALUES ('${nome}', '${email}', '${senhaenc}')`
      );
    } catch (error) {
      throw error;
    }
  }

  async edita(id, nome, email, senha) {
    const senhaenc = md5(senha);
    try {
      await this.db.query(
        `UPDATE ${this.tabela} SET nome = ${nome}, email = ${email}, senha = ${senhaenc} WHERE id = ${id}`
      );
    } catch (error) {
      throw error;
    }
  }

  async del(id) {
    try {
      await this.db.query(`DELETE FROM ${this.tabela} WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsuarioModel;

const Conexao = require("./conexao.js");
const md5 = require("md5");

class UsuarioModel {
  tabela = "usuario";
<<<<<<< Updated upstream
  db = new Conexao();
=======
  db = Conexao();
>>>>>>> Stashed changes

  constructor() {
    this.db.conectar();
  }

<<<<<<< Updated upstream
  async login(email, password) {
    const senhaenc = md5(password);
    try {
      const results = await this.db.query(
        `SELECT * FROM ${this.tabela} WHERE email = '${email}'`
      );

      if (results) {
        const user = results[0];
        if (user.senha === senhaenc) {
          console.log("Autenticacao Completa");
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

  async cadastrarUsuario(nome, email, senha) {
    const senhaenc = md5(senha);
    try {
      await this.db.query(
        `INSERT INTO ${this.tabela} (nome, email, senha) VALUES (${nome}, ${email}, ${senhaenc})`
      );
    } catch (error) {
      throw error;
    }
  }

  async editaUsuario(id, nome, email, senha) {
    const senhaenc = md5(senha);
    try {
      await this.db.query(
        `UPDATE ${this.tabela} SET nome = ${nome}, email = ${email}, senha = ${senhaenc} WHERE id = ${id}`
      );
    } catch (error) {
      throw error;
    }
  }

  async delUsuario(id) {
    try {
      await this.db.query(`DELETE FROM ${this.tabela} WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
=======
  cadastrarUsuario(nome, email, senha) {
    senhaenc = md5(senha);
    this.db.query(
      `insert into ${this.tabela} (nome, email, senha) values (${nome}, ${email}, ${senhaenc})`
    );
>>>>>>> Stashed changes
  }
}

module.exports = UsuarioModel;

async function teste() {
  const user = new UsuarioModel();
  user.login("rai@gmail.com", "123456");
}

teste();

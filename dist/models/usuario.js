const Conexao = require("./conexao.js");
const md5 = require("md5");

class UsuarioModel {
  tabela = "usuario";
  db = new Conexao();

  constructor() {
    this.db.conectar();
  }

  async getAllUsuario() {
    try {
      const results = await this.db.query(`SELECT * FROM ${this.tabela}`);
      return results;
    } catch (err) {
      throw err;
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
  }
}

module.exports = UsuarioModel;

//Apenas testando o getAllUsuario
async function test() {
  const user = new UsuarioModel();
  try {
    let usuarios = await user.getAllUsuario();
    console.log(usuarios);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();

// SELECT * FROM filmesusuario INNER JOIN usuario ON filmesusuario.usuario = usuario.id

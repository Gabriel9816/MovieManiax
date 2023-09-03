const Conexao = require("./conexao.js");
const md5 = require("md5");

class UsuarioModel {
  tabela = "usuario";
  db = Conexao();

  constructor() {
    this.db.conectar();
  }

  cadastrarUsuario(nome, email, senha) {
    senhaenc = md5(senha);
    this.db.query(
      `insert into ${this.tabela} (nome, email, senha) values (${nome}, ${email}, ${senhaenc})`
    );
  }
}

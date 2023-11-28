const mysql = require("mysql2");

class Conexao {
  constructor() {
    this.conexao = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "$Enha123",
      database: "trabalhodouglas",
    });
  }

  conectar() {
    this.conexao.connect((err) => {
      if (err) {
        console.error("Erro ao conectar: " + err);
        return;
      }
      console.log("Conectado");
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.conectar();

      this.conexao.query(sql, (err, result) => {
        if (err) {
          console.error("Erro ao executar a query" + err);
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  desconectar() {
    this.conexao.end();
  }
}

module.exports = Conexao;

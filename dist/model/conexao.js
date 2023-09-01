//Importando o modulo mysql do nodes
const mysql = require("mysql2");

//Criando a classe de conexao
class Conexao {
  //Construtor da classe
  constructor() {
    //this seria como o self do python, conexao seria o atributo da classe
    //createConnection é uma função do mysql que cria uma conexão, nela voce passa o host, que nesse caso seria a propia maquina, lolcal
    //O usuario, que por padrao eh root, a senha que tambem por padrao eh vazia, a nao ser que voce tenha configurado a senha e o usuario
    //Ou esteja usando um banco de dados em outros servidor, vai ser basicamente isso
    //E por ultimo vc passa o banco de dados que voce quer utilizar
    this.conexao = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "$Enha123",
      database: "trabalhodouglas",
    });
  }

  //Função para se conectar a conexao que voce criou anteriomente
  conectar() {
    //A funcao connect() do mysql recebe um callback como parametro
    //O callback é uma função que recebe um erro e um resultado
    //E ent ele pd tratar esse erro eh retornar para a gnt, seria como um tratamento de execoes
    //O callback eh chamado quando a funcao connect terminar de "executar" quando ela ja tiver feito a conexao
    //Todo o callback so eh chamado depois que a funcao em que voce passou ele tiver terminado oq tem q ser feito
    this.conexao.connect((err) => {
      //Nesse caso a gnt passou um callback que recebe so o erro da conexao, se tiver um erro ele apresenta para a gnt, se n ele printa que estamos conectados ao banco
      if (err) {
        console.error("Erro ao conectar: " + err);
        return;
      }

      console.log("Conectado");
    });
  }

  //Query eh uma funcao para que possamos executar os sql que precisamos dentro do banco de dados
  query(sql) {
    //Primeiro ele se conecta ao banco
    this.conectar();

    //Depois ele chama o metodo query do mysql que recebe o sql que queremos executar e o callback
    this.conexao.query(sql, (err, result) => {
      //Aqui eh a mesma coisa de cima, a unica diferenca eh q nesse callback a gnt esta passando o resultado tambem, ent se o sql
      //Tiver um resultado, por exemplo se a gnt tiver buscando dados do banco de dados com o sql, o callback vai tratar esse resultado
      //E retornar para a gnt
      if (err) {
        console.error("Erro ao executar a query: " + err);
        return;
      }
    });

    //Depois que ele termina a execucao do sql ele encerra a conexao com o banco de dados
    this.desconectar();
  }

  //Aqui eh uma funcao para encerrar a conexao com o banco de dados
  desconectar() {
    this.conexao.end();
  }
}

//Exportando a classe como um modulo node
module.exports = Conexao;

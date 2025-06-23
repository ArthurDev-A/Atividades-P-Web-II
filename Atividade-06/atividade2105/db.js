const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'teste'
});

conexao.connect(function(erro){
  if (erro) throw erro;
  console.log('Conexão efetuada com sucesso!');
})

module.exports = conexao;

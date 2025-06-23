var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'usuarios'
});

conexao.connect(function(erro){
  if (erro) throw erro;
  console.log('Conexão efetuada com sucesso!')
})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Aula' });
});

router.post('/', function(req, res) {
  const { nome, senha } = req.body;
  let retorno;

  if (nome && senha) {
    const sql = 'SELECT * FROM contas WHERE nome = ? AND senha = ?';
    conexao.query(sql, [nome, senha], (err, results) => {
      if (err) {
        console.error(err);
        retorno = { title: 'credenciais', success: 0, msg: 'Erro interno no servidor.' };
        console.log(retorno);
        return res.json(retorno);
      }

      if (results.length > 0) {
        retorno = { title: 'credenciais', success: 1, msg: 'Sucesso! Acesso garantido...', nivel_acesso: results[0].nivel_acesso };
        console.log(retorno);
        res.render('credenciais', retorno);
      } else {
        retorno = { title: 'credenciais', success: 0, msg: 'Erro! Acesso negado...' };
        console.log(retorno);
        res.render('credenciais', retorno);
      }
    });
  } else {
    retorno = { title: 'credenciais', success: 0, msg: 'Erro! Parâmetros inválidos ou ausentes...' };
    console.log(retorno);
    res.render('credenciais', retorno);
  }
})

module.exports = router;

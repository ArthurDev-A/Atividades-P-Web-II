var express = require('express');
var router = express.Router();
var conexao = require('../db');

function getMateriais() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM materiais';
    conexao.query(sql, (err, results) => {
      if (err) {
          console.error(err);
          return reject(err);
      }
      resolve(results);
    });
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Aula' });
});

router.post('/', async function(req, res) {
  const { nome, senha } = req.body;

  if (nome && senha) {
    const sql = 'SELECT * FROM contas WHERE nome = ? AND senha = ?';
    conexao.query(sql, [nome, senha], async (err, results) => {
      if (err) {
        console.error(err);
        return res.render("credenciais", { title: 'credenciais', msg: 'Erro interno no servidor.' });
      }

      if (results.length > 0) {
        // Caso o login funcione
        try {
          const materiais = await getMateriais();
          nivel_acesso = results[0].nivel_acesso;
          res.render('materiais', { title: 'materiais', materiais, nivel_acesso });
        } catch(err) {
          console.error(err);
          res.render("credenciais", { title: 'credenciais', msg: 'Erro interno no servidor.' });
        }
      } else {
        // Caso o login falhe
        res.render('credenciais', { title: 'credenciais', msg: 'Erro! Acesso negado...' });
      }
    });
  } else {
    // Caso os parâmetros estejam inválidos
    res.render('credenciais', { title: 'credenciais', msg: 'Erro! Parâmetros inválidos ou ausentes...' });
  }
})

router.delete('/delete/:id', function(req, res){
  const id = req.params.id;

  const sql = 'DELETE FROM materiais WHERE id = ? LIMIT 1';

  // Tenta executar o comando sql DELETE no banco
  conexao.query(sql, [id], function(err, result){
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar material', ok: 0, error: err });
    }

    // Caso não tenha encontrado o id fornecido
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material não encontrado', ok: 0 })
    }

    //sucesso
    res.status(200).json({ message: 'Material deletado com sucesso', ok: 1 })
  });
});

module.exports = router;

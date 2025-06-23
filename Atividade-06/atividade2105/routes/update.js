var express = require('express');
var router = express.Router();
var conexao = require('../db');

router.get('/:id', function(req, res) {
    const id = req.params.id;

    const sql = 'SELECT * FROM materiais WHERE id = ? LIMIT 1';
    conexao.query(sql, [id], function(err, result) {
        if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar material', ok: 0, error: err })
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Material não encontrado', ok: 0 })
        }

        res.render('update', { title: 'Update Material', id, material: result[0] });
    });
});

router.put('/', function(req, res) {
    const { id, nome, descricao, quantidade } = req.body;

    const sql = 'UPDATE materiais SET nome = ?, descricao = ?, quantidade = ? WHERE id = ?';

    conexao.query(sql, [nome, descricao, quantidade, id], function(err, result) {
        if (err) {
            console.error('Erro ao atualizar', err);
            return res.status(500).json({ message: 'Erro no banco de dados.', ok: 0 });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Material não encontrado ou dados iguais aos anteriores.', ok: 0 });
        }

        res.status(200).json({ message: 'Material atualizado com sucesso!', ok: 1 });
    });

});

module.exports = router;

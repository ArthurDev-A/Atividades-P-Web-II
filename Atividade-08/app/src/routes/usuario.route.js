const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller')
const usuarioValidator = require('../validators/usuario.validator')

router.post('/', usuarioValidator.create(), usuarioController.create);
router.get('/', usuarioController.encontrarTodos);
router.get('/:id', usuarioValidator.encontrarPorId(), usuarioController.encontrarPorId);
router.delete('/:id', usuarioValidator.encontrarPorId(), usuarioController.deletar);
router.get('/search/:termo', usuarioController.pesquisar);
router.put('/:id/senha', usuarioValidator.trocarSenha(), usuarioController.trocarSenha);

module.exports = router;
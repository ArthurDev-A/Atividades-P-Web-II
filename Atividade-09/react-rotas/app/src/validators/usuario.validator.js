const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const create = function () {
    return [
        body('nome', validatorMessage('Nome')).exists().bail().isString(),
        body('email', validatorMessage('Email')).exists().bail().isString(),
        body('senha', validatorMessage('Senha')).exists().bail().isString(),
    ];
}

const encontrarPorId = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
    ];
}

const trocarSenha = function () {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
        body('senha', validatorMessage('Nova senha')).exists().bail().isString()
    ];
}

module.exports = {
    create,
    encontrarPorId,
    trocarSenha
};
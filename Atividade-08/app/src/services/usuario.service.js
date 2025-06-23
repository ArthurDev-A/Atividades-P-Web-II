const usuarioRepository = require('../repositories/usuario.repository')
const createError = require('http-errors')
require('dotenv').config();
const bcrypt = require('bcrypt');

const create = async function(usuario) {
    const existeUsuario = await usuarioRepository.encontrarPorWhere({ email: usuario.email });
    if (existeUsuario) {
        return createError(409, 'Usuário já existe');
    }
    usuario.senha = await bcrypt.hash(usuario.senha, parseInt(process.env.SALT));
    const usuarioCriado = await usuarioRepository.create(usuario);
    return usuarioCriado;
}

const encontrarTodos = async function() {
    return await usuarioRepository.encontrarTodos();
}

const encontrarPorId = async function(id) {
    const usuario = await usuarioRepository.encontrarPorId(id);
    if (!usuario){
        return createError(404, 'Usuário não encontrado');
    }
    return usuario;
}

const deletar = async function(id) {
    const usuario = await usuarioRepository.encontrarPorId(id);
    if (!usuario) {
        return createError(404, 'Usuário não encontrado');
    }
    await usuario.destroy();
}

const pesquisar = async function(termo) {
    return await usuarioRepository.pesquisarPorNome(termo);
}

const trocarSenha = async function(id, novaSenha) {
    const usuario = await usuarioRepository.encontrarPorId(id);
    if (!usuario) {
        return createError(404, 'Usuário não encontrado');
    }
    const senhaCriptografada = await bcrypt.hash(novaSenha, parseInt(process.env.SALT));
    usuario.senha = senhaCriptografada;
    await usuario.save();
}

module.exports = {
    create,
    encontrarTodos,
    encontrarPorId,
    deletar,
    pesquisar,
    trocarSenha
};
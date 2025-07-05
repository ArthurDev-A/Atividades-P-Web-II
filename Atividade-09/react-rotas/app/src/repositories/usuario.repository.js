const db = require('../database/models/index')
const { Usuario } = db;

const create = async function(usuario) {
    return await Usuario.create(usuario);
}

const atualizar = async function(usuario, id) {
    await Usuario.update(usuario, {
        where: { id: id }
    });
}

const encontrarTodos = async function() {
    return await Usuario.findAll();
}

const encontrarPorId = async function(id) {
    return await Usuario.findByPk(id);
}

const encontrarPorWhere = async function(where) {
    return await Usuario.findOne({ where });
}

const pesquisarPorNome = async function(termo) {
    return await Usuario.findAll({
        where: {
            nome: {
                [db.Sequelize.Op.like]: `%${termo}%`
            }
        }
    });
}

module.exports = {
    create,
    atualizar,
    encontrarTodos,
    encontrarPorId,
    encontrarPorWhere,
    pesquisarPorNome
};
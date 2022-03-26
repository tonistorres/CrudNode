/** Nessa camada iremos trabalhar toda regra de negocio da aplicação
 * OBSERVAÇAO: Nessa cada irei fazer todos os tratamentos de erros
 */
const UserModel  = require('../models/data.user');
const { StatusCodes } = require('http-status-codes');


const getAllService = async (res) => {
const users = await UserModel.getAllModel();

/* Aplicando regra de negocio no end-point:
[x] caso não retorne nenhum usuário retorne
uma mensagem contendo array vazio */
if(!users){
    return res.status(StatusCodes.OK).json({menssagem:[]});
}
return users;
}

module.exports = {
    getAllService,
}
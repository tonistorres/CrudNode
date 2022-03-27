/** Nessa camada iremos trabalhar toda regra de negocio da aplicação
 * OBSERVAÇAO: Nessa cada irei fazer todos os tratamentos de erros
 */
const UserModel = require("../models/data.user");
const fs = require('fs').promises;
const { StatusCodes } = require("http-status-codes");
const { loginPolido } = require("../middleware/middlewareLogin");
const { senhaPolida } =require('../middleware/middlewareSenha');
const { validarCPF } = require('../util/validaCPF');

const createService = async (user) => {
  try {
    const { login, senha, usuario, banco_dados, url, celular_principal, CPF, email_principal, 
    perfil} = user;
    
    const loginValidado = loginPolido(login);
    const senhaValidada = senhaPolida(senha);
    const cpfValidado = validarCPF(CPF);
  
    if(loginValidado !== false && senhaValidada !== false && cpfValidado !== false){

      const created = await UserModel.createModel({
        loginValidado, 
        senhaValidada, 
        usuario, 
        banco_dados,
        url, 
        celular_principal, 
        cpfValidado,
        email_principal,
        perfil});
      // fs.appendFile("inbox.txt", `Login: ${loginValidado}`);
      return created;      
    }

  } catch (error) {
    console.log(error);    
  }
};

const getAllService = async (res) => {
  const users = await UserModel.getAllModel();

  /* Aplicando regra de negocio no end-point:
[x] caso não retorne nenhum usuário retorne
uma mensagem contendo array vazio */
  if (!users) {
    return res.status(StatusCodes.OK).json({ menssagem: [] });
  }
  return users;
};

module.exports = {
  getAllService,
  createService,
};

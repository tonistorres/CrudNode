const UserModel = require("../models/data.user");
const fs = require('fs').promises;
const { loginPolido } = require("../middleware/middlewareLogin");
const { senhaPolida } =require('../middleware/middlewareSenha');
const { validarCPF } = require('../util/validaCPF');
const { 
  refinandoStringsDB, 
  retiraTodosEspacosEntrePalavras,
  retiraEspacosMultiplosFixaOne,
  refiandoStringDBtoLowerCase 
} = require('../util/refinandoStringsDB');
const { slugify } = require('../util/retiraAcentos');

const createService = async (user) => {
  try {
    const { login, senha, usuario, banco_dados, url, celular_principal, CPF, email_principal, 
    perfil} = user;    
    const loginValidado = loginPolido(login);
    const senhaValidada = senhaPolida(senha);
    const usuarioTratado = retiraEspacosMultiplosFixaOne(usuario); 
    const bancoDBTratado = retiraTodosEspacosEntrePalavras(refiandoStringDBtoLowerCase(banco_dados));
    const urlTratada = retiraTodosEspacosEntrePalavras(refiandoStringDBtoLowerCase(url));
    const emailTratado = retiraTodosEspacosEntrePalavras(refiandoStringDBtoLowerCase(email_principal));
    const perfilTratado = slugify(retiraTodosEspacosEntrePalavras(refinandoStringsDB(perfil)));  
    const cpfValidado = validarCPF(CPF);

    
  
    if(loginValidado !== false && senhaValidada !== false && cpfValidado !== false){

      const created = await UserModel.createModel({
        loginValidado, 
        senhaValidada, 
        usuarioTratado, 
        bancoDBTratado,
        urlTratada, 
        celular_principal, 
        cpfValidado,
        emailTratado,
        perfilTratado
      });
      // fs.appendFile("inbox.txt", `Login: ${loginValidado}`);
      return created;      
    }

  } catch (error) {
    console.log(error);    
  }
};

const getAllService = async () => {
  const users = await UserModel.getAllModel();
  if (users) {
    return users;  
  }  
};

module.exports = {
  getAllService,
  createService,
};
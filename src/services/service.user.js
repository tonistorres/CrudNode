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

const deleteByIdService = async (id) =>{
await UserModel.deleteByIdModel(parseInt(id));
}

const getAllService = async () => {
  const users = await UserModel.getAllModel();
  console.log(users);
  if (!users.length ) {
  return {erro: true, codeNumber:404, msg:`não foi encontrado usuaário cadastrados []` }   
  }  
  return users; 
};

const getByIdService = async (requisicao) => {
const { id } = requisicao;
const user = await UserModel.getByIdModel(parseInt(id));
if(user){
  return user;
}
return {erro: true, codeNumber:404, msg:`não foi encontrado usuaário com id ${ id }` }
}

module.exports = {
  getAllService,
  createService,
  deleteByIdService,
  getByIdService,
};

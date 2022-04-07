const jwt = require('jsonwebtoken');
const UserModel = require("../models/data.user");
const {
  loginPolido,
  senhaPolida,
} = require("../validations/validation.service.user");
const { validarCPF } = require("../util/validaCPF");
const {
  refinandoStringsDB,
  retiraTodosEspacosEntrePalavras,
  retiraEspacosMultiplosFixaOne,
  refiandoStringDBtoLowerCase,
} = require("../util/refinandoStringsDB");
const { slugify } = require("../util/retiraAcentos");

// [Lista de Status Code](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
const createService = async (user) => {
  try {
    const {
      login,
      senha,
      usuario,
      banco_dados,
      url,
      celular_principal,
      CPF,
      email_principal,
      perfil,
    } = user;
    const loginValidado = loginPolido(login);

    if (loginValidado.erro) {
      return {
        erro: loginValidado.erro,
        codeNumber: loginValidado.codeNumber,
        msg: loginValidado.msg,
      };
    }
    const senhaValidada = senhaPolida(senha);
    if (senhaValidada.erro) {
      return {
        erro: senhaValidada.erro,
        codeNumber: senhaValidada.codeNumber,
        msg: senhaValidada.msg,
      };
    }
    const usuarioTratado = retiraEspacosMultiplosFixaOne(usuario);
    const bancoDBTratado = retiraTodosEspacosEntrePalavras(
      refiandoStringDBtoLowerCase(banco_dados)
    );
    const urlTratada = retiraTodosEspacosEntrePalavras(
      refiandoStringDBtoLowerCase(url)
    );
    const emailTratado = retiraTodosEspacosEntrePalavras(
      refiandoStringDBtoLowerCase(email_principal)
    );
    const perfilTratado = slugify(
      retiraTodosEspacosEntrePalavras(refinandoStringsDB(perfil))
    );
    const cpfValidado = validarCPF(CPF);

    if (cpfValidado.erro) {
      return {
        erro: cpfValidado.erro,
        codeNumber: cpfValidado.codeNumber,
        msg: cpfValidado.msg,
      };
    }

    const created = await UserModel.createModel({
      loginValidado,
      senhaValidada,
      usuarioTratado,
      bancoDBTratado,
      urlTratada,
      celular_principal,
      cpfValidado,
      emailTratado,
      perfilTratado,
    });
    return created;
  } catch (error) {
    console.log(error);
  }
};

const deleteByIdService = async (requisicao) => {
  const { id } = requisicao;
  const verificaExiste = await UserModel.getByIdModel(id);
  if (verificaExiste) {
    await UserModel.deleteByIdModel(parseInt(id));
    return {
      codeNumber: 405,
      status: "Method not Allowed",
      ResponseBody: "Vazio",
      msg: "Registro Excluído com sucesso!!",
    };
  }
  return {
    erro: true,
    codeNumber: 404,
    msg: `Delecão falhou ${id} inexistente`,
  };
};

const getAllService = async () => {
  const users = await UserModel.getAllModel();
  if (!users.length) {
    return {
      erro: true,
      codeNumber: 404,
      msg: `não foi encontrado usuario cadastrados []`,
    };
  }
  return users;
};

const getByIdService = async (requisicao) => {
  const { id } = requisicao;

  const verificaExiste = await UserModel.getByIdModel(id);

  if (verificaExiste) {
    const user = await UserModel.getByIdModel(parseInt(id));
    if (user) {
      return user;
    }
  }
  return {
    erro: true,
    codeNumber: 404,
    msg: `não foi encontrado usuário com id ${id}`,
  };
};

const updateService = async (user) => {
  try {
    const {
      id,
      login,
      senha,
      usuario,
      banco_dados,
      url,
      celular_principal,
      CPF,
      email_principal,
      perfil,
    } = user;

    const exist = await UserModel.getByIdModel(id);

    if (!exist) {
      return { erro: true, status: 404, message: "User not Exist" };
    }

    const updated = await UserModel.updateModelUser(
      login,
      senha,
      usuario,
      banco_dados,
      url,
      celular_principal,
      CPF,
      email_principal,
      perfil,
      id
    );
    return updated;
  } catch (error) {
    return { error: 500, message: "Erro no Servidor" };
  }
};

const getLoginService = async (user) => {
 

  try {
    console.log(user.login, user.senha);
    const SECRET = 'XABLAU'; 

    const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
    }
    
    const autorization = await UserModel.getByLoginModel({login:user.login, senha:user.senha});
    console.log(autorization);
    if(!autorization){
      return {
        erro: true,
        codeNumber: 404,
        msg: `User not Autorization !!`,
      };
    }
    
    const {iduser, login} = autorization;
    const token = jwt.sign({id:iduser, senha:login},SECRET,jwtConfig);
    return token;
  
  } catch (error) {
    return { error: 500, message: "Erro no Servidor" };
  }
};

module.exports = {
  getAllService,
  createService,
  deleteByIdService,
  getByIdService,
  updateService,
  getLoginService,
};

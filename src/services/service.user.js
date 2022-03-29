const UserModel = require("../models/data.user");
const FileSystemFs = require("../FileSystem/fs.ficha.user");
const { loginPolido } = require("../middleware/middlewareLogin");
const { senhaPolida } = require("../middleware/middlewareSenha");
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
    const senhaValidada = senhaPolida(senha);
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
    if (
      loginValidado !== false &&
      senhaValidada !== false &&
      cpfValidado !== false
    ) {
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
    }
    return {
      erro: true,
      codeNumber: 404,
      msg: `Desculpe! O registro não pôde ser inserido no banco`,
    };
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

module.exports = {
  getAllService,
  createService,
  deleteByIdService,
  getByIdService,
};

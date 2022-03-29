const UserService = require("../services/service.user");
const { StatusCodes } = require("http-status-codes");

const deleteByIdController = async (req, res) => {
  try {
    const userExiste = await UserService.deleteByIdService(req.params);
    if(userExiste.erro){
    return res.status(userExiste.codeNumber).json({ menssagem: userExiste.msg });
    }
    return res
      .status(userExiste.codeNumber)
      .json({ menssagem: userExiste.msg });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro no Servidor" });
  }
};

const getByIdController = async (req, res) => {
  try {
    const user = await UserService.getByIdService(req.params);
    if (user.erro) {
      return res.status(user.codeNumber).json({ menssagem: user.msg });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro no Servidor" });
  }
};

const getAllController = async (_req, res) => {
  try {
    const users = await UserService.getAllService();
    if (users.erro) {
      return res.status(users.codeNumber).json({menssagem: users.msg});
    }
    return res.status(StatusCodes.OK).send(users);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro no Servidor" });
  }
};

const createController = async (req, res) => {
  try {
    const user = await UserService.createService(req.body);
    if (user) {
      return res.status(StatusCodes.CREATED).json(user);
    }
    return res
      .status(StatusCodes.OK)
      .json({ menssagem: "Não foi possível criar usuário" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro no Servidor" });
  }
};

module.exports = {
  getAllController,
  createController,
  deleteByIdController,
  getByIdController,
};

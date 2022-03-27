const UserService  = require('../services/service.user');
const { StatusCodes } = require('http-status-codes');

const getAllController = async (_req, res) => {
    try {
      const users = await UserService.getAllService(res);
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no Servidor'});
    }
}

const createController = async (req, res) => {
  try {
    const user = await UserService.createService(req.body);
    if(user){
      return res.status(StatusCodes.CREATED).json(user);
    }
    return res.status(StatusCodes.OK).json({menssagem:"Não foi possível criar usuário"});
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no Servidor'});
  }
}

module.exports = { 
  getAllController,
  createController, 
}
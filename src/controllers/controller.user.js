/** Essa camada é a mais proxima do usuário, trata exatamente com as requisições 
 *  fluxo de entrada e saída de dados, podemos dizer que essa deve ser a única 
 *  camada mutável, ou seja, adapitável aos frameworks que iremos trabalhar
 * 
 * 1º Iniciaremos pela camada de controler entrada e saída de dados 
*/
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

module.exports = { getAllController }
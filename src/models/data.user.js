/* nessa camada iremo trabalhar toda persistencia (manipulação) dos dados
Camada mais próxima do banco de dados
*/

const mysql = require('mysql2/promise');
const { connection } = require('./mysql-connection');

// buscar todos registros na base de dados    
const getAllModel = async () => {
    const [ users ]= await connection.execute('SELECT * FROM inovec87_sisseg.tbusuarios');
    return users;
}
 




module.exports = {
    getAllModel,
}
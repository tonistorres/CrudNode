/** Criando uma classe de conexão, Ponte do node com Gerenciador
 * de Banco de dados mysql
  */
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'inovec87_sisseg',
  password:'8Hyy+-XqcH8$c#-',
  port:'3306'
});

module.exports = { connection }
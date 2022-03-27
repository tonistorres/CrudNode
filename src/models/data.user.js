const mysql = require("mysql2/promise");
const { connection } = require("./mysql-connection");

const getAllModel = async () => {
  const [users] = await connection.execute(
    "SELECT * FROM inovec87_sisseg.tbusuarios"
  );
  return users;
};

const createModel = async ({
  loginValidado,
  senhaValidada,
  usuarioTratado,
  bancoDBTratado,
  urlTratada,
  celular_principal,
  cpfValidado,
  emailTratado,
  perfilTratado,
}) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO tbusuarios ( login, senha, usuario, banco_dados, url,
        celular_principal, CPF, email_principal, perfil
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      loginValidado,
      senhaValidada,
      usuarioTratado,
      bancoDBTratado,
      urlTratada,
      celular_principal,
      cpfValidado,
      emailTratado,
      perfilTratado,
    ]
  );
  return {
    id: insertId,
    loginValidado,
    senhaValidada,
    usuarioTratado,
    bancoDBTratado,
    urlTratada,
    celular_principal,
    cpfValidado,
    emailTratado,
    perfilTratado,
  };
};

module.exports = {
  getAllModel,
  createModel,
};
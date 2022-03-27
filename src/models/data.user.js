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
  usuario,
  banco_dados,
  url,
  celular_principal,
  cpfValidado,
  email_principal,
  perfil,
}) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO tbusuarios ( login, senha, usuario, banco_dados, url,
        celular_principal, CPF, email_principal, perfil
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      loginValidado,
      senhaValidada,
      usuario,
      banco_dados,
      url,
      celular_principal,
      cpfValidado,
      email_principal,
      perfil,
    ]
  );
  return {
    id: insertId,
    loginValidado,
    senhaValidada,
    usuario,
    banco_dados,
    url,
    celular_principal,
    cpfValidado,
    email_principal,
    perfil,
  };
};

module.exports = {
  getAllModel,
  createModel,
};

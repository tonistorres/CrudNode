const mysql = require("mysql2/promise");
const { connection } = require("./mysql-connection");

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

const getAllModel = async () => {
  const [users] = await connection.execute(
    "SELECT * FROM inovec87_sisseg.tbusuarios"
  );
  return users;
};

const getByIdModel = async (id) => {
  const [user] = await connection.execute(
    "SELECT * FROM inovec87_sisseg.tbusuarios WHERE iduser = ?",
    [id]
  );
  return user[0];
};

const deleteByIdModel = async (id) => {
  await connection.execute("DELETE FROM tbusuarios WHERE iduser = ?", [id]);
};

const updateModelUser = async (
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
) => {
  await connection.execute(
    `UPDATE tbusuarios SET login = ?, senha = ?, usuario = ?, banco_dados = ?, url = ?, celular_principal = ?, CPF = ?, email_principal = ?, perfil = ? WHERE iduser = ?`,
    [
      login,
      senha,
      usuario,
      banco_dados,
      url,
      celular_principal,
      CPF,
      email_principal,
      perfil,
      id,
    ]
  );
  return {
    login,
    senha,
    usuario,
    banco_dados,
    url,
    celular_principal,
    CPF,
    email_principal,
    perfil,
    id,
  };
};

const getByLoginModel = async ({login, senha}) => {
  const [user] = await connection.execute(`SELECT * FROM 
  inovec87_sisseg.tbusuarios WHERE login = ? AND senha = ?`, [login, senha]);
  return user[0];
};

module.exports = {
  getAllModel,
  createModel,
  deleteByIdModel,
  getByIdModel,
  updateModelUser,
  getByLoginModel,
};

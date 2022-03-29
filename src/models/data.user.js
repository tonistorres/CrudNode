const mysql = require("mysql2/promise");
const { connection } = require("./mysql-connection");

const deleteByIdModel = async (id) => {
  await connection.execute('DELETE FROM tbusuarios WHERE iduser = ?', [id]);
}

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
  const [user] = await connection.execute('SELECT * FROM inovec87_sisseg.tbusuarios WHERE iduser = ?', [id]);
  return user[0];
}


module.exports = {
  getAllModel,
  createModel,
  deleteByIdModel,
  getByIdModel,
};


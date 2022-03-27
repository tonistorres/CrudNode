const senhaPolida = (senha) => {
  try {
    if (senha && senha.length > 3 && typeof senha === "string") {

      let flagValidaSenha = true;

      const senhaPolida = senha.trim().toUpperCase();

      if (senhaPolida.length <= 3) {
        flagValidaSenha = false;
      }

      if (flagValidaSenha) {
        return senhaPolida;
      }

      return flagValidaSenha;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { senhaPolida };

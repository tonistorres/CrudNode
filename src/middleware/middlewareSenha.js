const { refinandoStringsDB, retiraTodosEspacosEntrePalavras } = require('../util/refinandoStringsDB');
const { slugify } = require('../util/retiraAcentos');

const senhaPolida = (senha) => {
  try {
    if (senha && senha.length > 3 && typeof senha === "string") {

      let flagValidaSenha = true;

      const senhaPolida =  retiraTodosEspacosEntrePalavras(refinandoStringsDB(senha));

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

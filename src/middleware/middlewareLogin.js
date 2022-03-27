const { refinandoStringsDB, retiraTodosEspacosEntrePalavras } = require('../util/refinandoStringsDB');
const { slugify } = require('../util/retiraAcentos');
const loginPolido = (login) => {
  try {
    if (login && login.length > 3 && typeof login === "string") {

      let flagValidLogin = true;

      const loginPolido = slugify(retiraTodosEspacosEntrePalavras(refinandoStringsDB(login)));

      if (loginPolido.length <= 3) {
        flagValidLogin = false;
        // return flagValidLogin;
      }

      if (flagValidLogin) {
        return loginPolido;
      }

      return flagValidLogin;
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { loginPolido };

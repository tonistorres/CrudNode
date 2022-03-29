const { refinandoStringsDB, retiraTodosEspacosEntrePalavras } = require('../util/refinandoStringsDB');
const { slugify } = require('../util/retiraAcentos');

const loginPolido = (login) => {
  try {
    if (login && login.length > 3 && typeof login === "string") {

      let flagValidLogin = true;

      const loginPolido = slugify(retiraTodosEspacosEntrePalavras(refinandoStringsDB(login)));

      if (loginPolido.length <= 3) {
        flagValidLogin = false;       
      }

      if (flagValidLogin) {
        return loginPolido;
      }

      return flagValidLogin;
    }
    return {erro: true , codeNumber: 404, msg:"login não atende os critérios de validação"}
  } catch (error) {
    console.log(error.message);
  }
};

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
      return {erro: true, codeNumber: 404, msg:"Senha não atende os critérios de validação"}
    } catch (error) {
      console.log(error.message);
    }
  };
  
module.exports = { loginPolido, senhaPolida };

// https://www.devmedia.com.br/validar-cpf-com-javascript/23916

function validarCPF(strCPF) {

  let flagValidaRetornoCPF = true;

    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") {
    return {erro:true, codeNumber: 404, msg:"Falha validaçao CPF"};
  }


  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) {
      return {erro:true, codeNumber: 404, msg:"Falha validaçao CPF"};
    };

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
      return {erro:true, codeNumber: 404, msg:"Falha validaçao CPF"}; 
    };
    if(flagValidaRetornoCPF){
      return strCPF;
    }
    
}

module.exports = { validarCPF }
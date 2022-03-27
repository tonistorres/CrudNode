const refinandoStringsDB = (string) => {
const stringRefinada = string.trim().toUpperCase();
return stringRefinada;
}

const refiandoStringDBtoLowerCase = (string) => {
const stringRefinada = string.trim().toLowerCase();
return stringRefinada;
}

// https://futurestud.io/tutorials/remove-extra-spaces-from-a-string-in-javascript-or-node-js
const retiraEspacosMultiplosFixaOne = (str) => {
return str.replace(/\s+/g, ' ').trim().toUpperCase();
}


const retiraTodosEspacosEntrePalavras = (string, i = 0, res = "") => {
    if (i >= string.length)
      return res
    else
    if (string[i] == " ")
      return retiraTodosEspacosEntrePalavras(string, i + 1, res)
    else
      return retiraTodosEspacosEntrePalavras(string, i + 1, res += string[i])
}

module.exports = { 
    refinandoStringsDB,
    refiandoStringDBtoLowerCase,
    retiraTodosEspacosEntrePalavras,
    retiraEspacosMultiplosFixaOne
 }
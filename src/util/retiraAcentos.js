// https://gist.github.com/marcelo-ribeiro/abd651b889e4a20e0bab558a05d38d77
// https://codepen.io/marcelo-ribeiro/pen/PomqOvE

const accentsMap = new Map([
    ["-", "\\s|\\.|_"],
    ["A", "á|à|ã|â|ä"],
    ["E", "é|è|ê|ë"],
    ["I", "í|ì|î|ï"],
    ["O", "ó|ò|ô|õ|ö"],
    ["U", "ú|ù|û|ü"],
    ["C", "ç"],
    ["N", "ñ"]
  ]);
  
  const reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "gi"), key);
  
  const slugify = (text) => [...accentsMap].reduce(reducer, text.toUpperCase());

  module.exports = { slugify }


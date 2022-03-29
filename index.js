const express = require("express");
const bodyParser = require('body-parser');
const router = require('./src/routes/route.user');

const app = express(); 
app.use(bodyParser.json()); // injetando à lib bodyParser
const PORT = 3000;
app.use(express.json()); // injetando o conversor json nativo express    
app.use('/user', router); // injentando as rotas definidas na pasta routes ao app

// rondando o servidor express teste
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
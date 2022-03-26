const express = require("express");
const bodyParser = require('body-parser');
const router = require('./src/routes/route.user');

const app = express();
app.use(bodyParser.json());
const PORT = 3001;

app.use(express.json());    

app.use('/user', router);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
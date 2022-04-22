const Sequelize = require ('sequelize');
const connectionDB = require('./db-connection');

const User = connectionDB.define('User', {
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    field: 'idUser'
},

login:{
type:Sequelize.STRING(45),
allowNull:false,
},

senha:{
type:Sequelize.STRING(15),
allowNull:false,
},

usuario:{
type:Sequelize.STRING(45),
allowNull:false,
},

bancoDados:{
type:Sequelize.STRING(100),
allowNull:true,
field: 'banco_dados'
},

url:{
    type:Sequelize.STRING(150),
    allowNull:true
},

celularPrincipal:{
type:Sequelize.STRING(45),
allowNull:true,
field: 'celular_principal'
},

cpf:{
    type:Sequelize.STRING(45),
    allowNull:false,
    field: 'CPF'
},

emailPrincipal:{
    type:Sequelize.STRING(45),
    allowNull:true,
    field: 'email_principal'
},

perfil:{
    type:Sequelize.STRING(45),
    allowNull:false
}


}, {timestamps:false, tableName:'tbusuarios'});

// User.removeAttribute('id');

module.exports = User;
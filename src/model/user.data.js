const mysql = require('mysql2/promise');
const { connection } = require('./mysql-connection');

async function main(){
    const [ usuarios ]= await connection.execute('SELECT * FROM inovec87_sisseg.tbusuarios;');
    console.log(usuarios);
}

main();
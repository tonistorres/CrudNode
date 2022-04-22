(async()=>{
const connectionDB = require('./src/models/db-connection');
const User = require('./src/models/user');
await connectionDB.sync();
})();
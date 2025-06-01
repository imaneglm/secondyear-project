// config/db.js
//  import the pool class from pg to manage postgresSQL connection 
const { Pool } = require('pg');
// Load environment variables from the .env file
require('dotenv').config();
// Create a new connection pool using the environment variables
const pool = new Pool({
    //  postgresSQL user_name
user: process.env.DB_USER,
// data base host in postgres SQL
host: process.env.DB_HOST,
// data base name in postgres 
database: process.env.DB_NAME,
// data base password in postgres
password: process.env.DB_PASSWORD,
// data base port(5432)
port: process.env.DB_PORT,
});

// connection to data base
pool.connect()
.then(client => {
    // if the connection sucsseed write connection to data base successfully
    console.log(`Connected to database ${process.env.DB_NAME} successfully`);
    // realease the client back to the pool
    client.release(); 
})
.catch(err => {
    // if there is an error it send an error message 
    console.error('error connection to data base', err.message);
});
// export the pool to use it in other files 
module.exports = pool;
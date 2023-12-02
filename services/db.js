const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const Pool = require('pg').Pool

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbDatabase,
    password: dbPassword,
    port: 5432,
});

module.exports = pool;
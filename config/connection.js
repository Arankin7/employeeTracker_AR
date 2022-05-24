const mysql = require('mysql2');

require('dotenv').config();

// Connect to database!
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username,
        user: process.env.DB_name,
        // Your MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_name
    },
    console.log('Connected to the Database;')
)


module.exports = db;
const mysql = require('mysql2');

require('dotenv').config();

// Connect to database!
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username,
        user: 'root',
        // Your MySQL password
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    },
    console.log('Connected to the Database;')
)


module.exports = db;
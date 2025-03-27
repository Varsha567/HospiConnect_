const mysql = require('mysql2');
require('dotenv').config();
const [host, port] = process.env.DB_HOST.split(':');

const db = mysql.createConnection({
    host: host || 'localhost', // Default to 'localhost' if not provided
    port: port || 3306,  
    //host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        console.error('Connection details:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
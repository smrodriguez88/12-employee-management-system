// Initialize variables
const mysql = require('mysql');
const inquirer = require('inquirer');

// Create MySQL DB Connection
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'emptrack_db'
});


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


function init(){
    startCli()
}

function startCli(){
    inquirer.prompt([
            {
                type: "list",
                message: "Welcome to the Employee Management System, select an action.",
                choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update departments, roles, employees", "Exit"],
                name: "startChoice"
            }
        ]).then(answer => {
            if (answer.startChoice === "Add departments, roles, employees"){
                add_dre();
            } else if (answer.startChoice === "View departments, roles, employees"){
                view_dre();
            } else if (answer.startChoice === "Update departments, roles, employees"){
                update_dre();
            } else {
                return console.log("Exiting the Employee Management System...")
            }
        });
};

function add_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "Select what you would like to add.",
            choices: ["Department", "Role", "Employee", "Restart"],
            name: "addChoice"
        }
    ]).then(answer => {
        if (answer.addChoice === "Department"){
            addEntry("Department");
        } else if (answer.addChoice === "Role"){
            addEntry("Role");
        } else if (answer.addChoice === "Employee"){
            addEntry("Employee");
        } else {
            startCli();
        }
    });
};

function view_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "Select what you would like to view.",
            choices: ["Department", "Role", "Employee", "Restart"],
            name: "viewChoice"
        }
    ]).then(answer => {
        if (answer.viewChoice === "Department"){
            viewEntry("Department");
        } else if (answer.viewChoice === "Role"){
            viewEntry("Role");
        } else if (answer.viewChoice === "Employee"){
            viewEntry("Employee");
        } else {
            startCli();
        }
    });
};

function update_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "Select what you would like to update.",
            choices: ["Department", "Role", "Employee", "Restart"],
            name: "updateChoice"
        }
    ]).then(answer => {
        if (answer.updateChoice === "Department"){
            updateEntry("Department");
        } else if (answer.updateChoice === "Role"){
            updateEntry("Role");
        } else if (answer.updateChoice === "Employee"){
            updateEntry("Employee");
        } else {
            startCli();
        }
    });
};

init()
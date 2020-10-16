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

// Function to initialize code
function init(){
    welcomeCli()
}
// Initial Prompts
// Welcome CLI prompt
function welcomeCli(){
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

// Add CLI prompt for Department, Role, Employee
function add_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "Add an entry for: ",
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
            welcomeCli();
        }
    });
};

// View CLI prompt for Department, Role, Employee
function view_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "View all entries for: ",
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
            welcomeCli();
        }
    });
};

// Update CLI prompt for Department, Role, Employee
function update_dre(){
    inquirer.prompt([
        {
            type: "list",
            message: "Update an entry for: ",
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
            welcomeCli();
        }
    });
};

// Secondary Prompts
// Add CLI prompt for Department, Role, Employee
function addEntry(selection){
    if (selection === "Department"){
        // Prompt for Department info
        inquirer.prompt([
            {
                type: "list",
                message: "Add a: ",
                choices: ["Department", "Role", "Employee", "Restart"],
                name: "addChoice"
            }
        ]).then(answer => {
            // Write to database
        });
    } else if (selection === "Role"){
        // Prompt for Role info
    } else if (selection === "Employee"){
        // Prompt for Employee info
    }
}

init()
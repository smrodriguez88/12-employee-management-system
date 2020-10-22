// Initialize variables
const mysql = require('mysql');
const inquirer = require('inquirer');
const { restoreDefaultPrompts } = require('inquirer');

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
    //connect to database and start inquirer
    connection.connect(err => {
        if (err) throw err;
        welcomeCli()
    });
    
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
            viewAll("Department");
            welcomeCli()
        } else if (answer.viewChoice === "Role"){
            viewAll("Role");
            welcomeCli()
        } else if (answer.viewChoice === "Employee"){
            viewAll("Employee");
            welcomeCli()
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
                type: "input",
                message: "Enter Department Name:",
                name: "dName"
            }
        ]).then(answer => {
            // Write to database
            let query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.dName
            }, function (err, res) {
                if (err) throw err;
                console.log(`The following department entry has been added: ${answer.dName}`);
                welcomeCli()
            }
        );
        });
    } else if (selection === "Role"){
        // Lookup department list to display as choice options
        connection.query(`SELECT * from department`, function(err, res){
            if (err) throw err;
            // Create emtpy array to store options
            let roleArray = []
            // For each result of SQL query store in list
            for(each of res){
                roleArray.push({'name':each.name, 'id':each.id})
            }  
            console.log(roleArray)    
        // Prompt for Role info  
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter Role Title:",
                    name: "rTitle"
                },
                {
                    type: "input",
                    message: "Enter Yearly Salary (i.e. 95000):",
                    name: "rSalary"
                },
                {
                    type: "list",
                    message: "Enter Department for role:",
                    choices: roleArray,
                    name: "rDept",
                },
            ]).then(answer => {
                for(each of roleArray){
                    if (answer.rDept == each.name){
                        role_id = each.id
                    }
                }
                // Write to database
                let query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.rTitle,
                    salary: answer.rSalary,
                    department_id: role_id
                }, function (err, res) {
                    if (err) throw err;
                    console.log(`The following role entry has been added: ${answer.rTitle}`);
                    welcomeCli()
                }
            );
            });
        });
        } else if (selection === "Employee"){
            // Prompt for Employee info
            // Lookup role list to display as choice options
            connection.query(`SELECT * from role`, function(err, res){
            if (err) throw err;
            // Create emtpy array to store options
            let roleArray = []
            // For each result of SQL query store in list
            console.log(res)
            for(each of res){
                roleArray.push({'name':each.title, 'id':each.id})
            }  
            console.log(roleArray)
            connection.query(`SELECT * from employee`, function(err, res){
                if (err) throw err;
                // Create emtpy array to store options
                let empArray = []
                // For each result of SQL query store in list
                for(each of res){
                    empArray.push({'name':`${each.first_name} ${each.last_name}`, 'id':each.id})
                }  
                console.log(empArray)    
        // Prompt for Role info  
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter Employee First Name:",
                    name: "eFirstName"
                },
                {
                    type: "input",
                    message: "Enter Employee Last Name:",
                    name: "eLastName"
                },
                {
                    type: "list",
                    message: "Enter Employee Role:",
                    choices: roleArray,
                    name: "eRole",
                },
                {
                    type: "list",
                    message: "Enter Employee Manager:",
                    choices: empArray,
                    name: "eManager",
                },
            ]).then(answer => {
                for(each of roleArray){
                    if (answer.eRole == each.name){
                        role_id = each.id
                    }
                }
                for(each of empArray){
                    if (answer.eManager == each.name){
                        manager_id = each.id
                    }
                }
                // Write to database
                let query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.eFirstName,
                    last_name: answer.eLastName,
                    role_id: role_id ,
                    manager_id: manager_id
                }, function (err, res) {
                    if (err) throw err;
                    console.log(`The following employee entry has been added: ${answer.eFirstName} ${answer.eLastName}`);
                    welcomeCli()
                }
            );
            });
        });
        });
    }
    }

    function updateEntry(selection){
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

// Core SQL Methods
function viewAll(table){
    connection.query(`SELECT * from ${table.toLowerCase()}`, function(err, res){
        if (err) throw err;
        console.log("\n")
        console.table(res)
        console.log("Press DOWN arrow when done")
    });
}

init()
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
            var result = viewAll("Department")
            result.then(results => console.table(results))
            welcomeCli()
        } else if (answer.viewChoice === "Role"){
            var result = viewAll("Role")
            result.then(results => console.table(results))
            welcomeCli()
        } else if (answer.viewChoice === "Employee"){
            var result = viewAll("Employee")
            result.then(results => console.table(results))
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
            var result = addOne(selection, {name: answer.dName})
            result.then(() => {
                console.log(`The following ${selection} entry has been added: ${answer.dName}`)
                welcomeCli()
            });
        });
    } else if (selection === "Role"){
        // Create emtpy array to store options
        let deptArray = []
        // Lookup selected table to display as choice options
        var result = viewAll("Department")
        result.then(results => {
            for(each of results){
                deptArray.push({'name':each.name, 'id':each.id})
            }  
        })   
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
                    choices: deptArray,
                    name: "rDept",
                },
            ]).then(answer => {
                // Gather Department ID of selected Department String
                for(each of deptArray){
                    if (answer.rDept == each.name){
                        dept_id = each.id
                    }
                }
                // Write to database
                var result = addOne(selection, {title: answer.rTitle, salary: answer.rSalary, department_id: dept_id})
                result.then(() => {
                    console.log(`The following ${selection} entry has been added: ${answer.rTitle}`)
                    welcomeCli()
                });
            });
        } else if (selection === "Employee"){
            // Create emtpy array to store options
            var roleArray = []
            // Lookup role table to display as choice options
            var resultRole = viewAll("Role")
            resultRole.then(results => {
            for(each of results){
                roleArray.push({'name':each.title, 'id':each.id})
                }
            })   
            // Create emtpy array to store options
            var empArray = []
            // Lookup selected table to display as choice options
            var resultEmp = viewAll("Employee")
            resultEmp.then(results => {
                for(each of results){
                    empArray.push({'name':`${each.first_name} ${each.last_name}`, 'id':each.id})
                }  
            })       
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
                // Translate selection Role and Manager options to ID #'s
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
                var result = addOne(selection, {first_name: answer.eFirstName, last_name: answer.eLastName, role_id: role_id, manager_id: manager_id})
                result.then(() => {
                    console.log(`The following ${selection} entry has been added: ${answer.eFirstName} ${answer.eLastName}`)
                    welcomeCli()
                });
            }); 
        };
    }

async function updateEntry(selection){
    // Create emtpy array to store options
    selectionArray = await getOneList(selection)
    answer = await inquirer.prompt([
        {
            type: "list",
            message: `Which ${selection} would you like to update?`,
            choices: selectionArray,
            name: "updateChoice"
        }
    ])
    
    if(selection === "Department"){
        // Prompt for Department info
    } else if (selection === "Role"){
        // Prompt for Role info
    } else if (selection === "Employee"){
        // Prompt for Employee info
    };
};

// Core SQL Methods
function sendReadSqlQuery(sql){
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

function sendCreateSqlQuery(sql, data){
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

async function viewAll(table) {
    let response = await sendReadSqlQuery(`SELECT * from ${table.toLowerCase()}`)
    return response
};

async function addOne(table, data) {
    let response = await sendCreateSqlQuery(`INSERT INTO ${table.toLowerCase()} SET ?`, data)
    return response
}

async function getOneList(table){
    selectionArray = []
    // Lookup selected table to display as choice options
    results = await viewAll(table.toLowerCase())
    for(each of results){
        if (table === "Department"){
            selectionArray.push({'name':each.name, 'id':each.id})
        } else if (table === "Role"){
            selectionArray.push({'name':each.title, 'id':each.id})
        } else if (table === "Employee"){
            selectionArray.push({'name':`${each.first_name} ${each.last_name}`, 'id':each.id})
        }
    }
    return selectionArray
    }

init()
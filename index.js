//include everything needed to run our app
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
//establish connection w/mysql2
const connection = mysql.createConnection( {
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

//greet the user with some goddamn hospitality and show 'em around the place
console.log('\x1b[35m welcome to HR Simulator 42!! \x1b[0m'); //using \x1b escape char for colored console logs
console.log('\x1b[33m ready to feel like an HR god? \x1b[0m');
// list of basic choices for viewing and adding
const options = [
    {
        value: "department",
    },
    {
        value: "role",
    },
    {
        value: "employee",
    },
];
// define the set of primary options to display to the user while navigating the app in the terminal.
const mainOptions = [
    { value: "VIEW TABLES",},
    { value: "ADD SOMETHING NEW",},
    { value: "UPDATE EXISTING DATA",},
    ];

 
// define sql query that will be used to return employee list showing position title, department, salaray, manager name, etc
const employeeQuery = `select employee.id as id, 
CONCAT(employee.first_name, ' ', employee.last_name) as employee_name, 
role.title as position,
department.name as department,
role.salary as salary,
CONCAT(manager.first_name, ' ', manager.last_name) as manager_name
from employee employee
left join employee manager 
on employee.manager_id = manager.id
join role on 
employee.role_id = role.id
join department on
role.department_id = department.id;`;

//sql query that will return role information using join with dept table
const roleQuery = "select role.title as job_title, role.salary as salary, department.name as department from role join department on role.department_id = department.id";

 //THIS IS WHERE THE ACTION STARTS
 //define the main prompt function that will run on startup and be referred back to throughout
function mainPrompt() {
  inquirer.prompt(
      {
      type:'list',
      message: "Tell us what your heart desires",
      choices: mainOptions,
      name: "desire"
      },
    ).then((answers) => {
      if (answers.desire == "VIEW TABLES") {
          inquirer.prompt(
                {
                    type:'list',
                    message:'we can sort results 3 ways, what would you like to view?',
                    choices: options,
                    name: "viewChoice"
                },).then((answers) => {
                    viewTable(answers.viewChoice);
                }) //end .then statement
            
        } // next is the function if they want to add something
        else if (answers.desire == "ADD SOMETHING NEW") {
            inquirer.prompt(
                {
                    type:'list',
                    message:'to which table what would you like to add something?',
                    choices: options,
                    name: "viewChoice"
                },).then((answers) => {
                    switch (answers.viewChoice) {
                      case "department":
                        addDepartment();  
                        break;
                      case "role":
                        addRole();
                        break;
                      case "employee":
                        addEmployee();
                    };
                }) //end .then statement

        } // next check if answer is to update something
        else if (answers.desire = "UPDATE EXISTING DATA") {

        }
     
     });
}; //end my start function

mainPrompt();
//function to view formatted table with formatting/specific query based on which table is chosen
function viewTable(tableChoice) {
    switch (tableChoice){
        case "department":
            connection.query(
                `SELECT * FROM ${tableChoice}`, function(err,results,fields) {
                  console.log('\x1b[35m here is list of our departments \x1b[0m')
                  console.table(results);
                  console.log('--------------------------------------------------');
                  console.log('OK, what next?')
                  mainPrompt();
                 });
            break;
        case "role":
            connection.query(
                roleQuery, function(err, results, fields) {
                    console.log("\x1b[35m here is list of the company's positions and their respective departments \x1b[0m")
                    console.table(results);
                    console.log('--------------------------------------------------');
                    console.log('OK, what next?')
                    mainPrompt();
                });
            break;
        case "employee":
            connection.query(
                employeeQuery, function(err, results, fields) {
                    console.log("\x1b[35m here is list of our wonderful employees and information regarding them \x1b[0m")
                    console.table(results);
                    console.log('--------------------------------------------------');
                    console.log('OK, what next?')
                    mainPrompt();
                });
    }
};
//if the user chose to add a dept, will prompt for dept name and run the sql query to add the dept
function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            message: "what is the name of the new department?",
            name: "newDept"            
        },).then((answers) => {
            connection.query(
                `insert into department (name) values ("${answers.newDept}");`, function(err, results, fields) {
                    console.log("\x1b[35m if you didn't type something stupid your dept name will be added. go and view departments to see if it is added to the list. \x1b[0m")
                    mainPrompt();
        }); 
    });
};
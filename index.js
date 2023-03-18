//include everything needed to run our app
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
//establish connection w/mysql2

// ENTER MYSQL LOGIN INFO BELOW
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
console.log('\x1b[35m welcome to the HR Simulator!!! \x1b[0m'); //using \x1b escape char for colored console logs
console.log('\x1b[33m ready to feel like an HR god? \x1b[0m');

// define the set of primary options to display to the user while navigating the app in the terminal.
const mainOptions = [
    { value: "VIEW TABLES",},
    { value: "ADD SOMETHING NEW",},
    { value: "UPDATE EXISTING DATA",},
];

// list of basic choices for viewing and adding
const options = [
    { value: "department",},
    { value: "role",},
    { value: "employee",},
];

 //THIS FUNCTION IS WHERE THE ACTION STARTS and is what is referred back to after other functions so that the user can just keep doing things without having to restart the app or getting trapped in a function. keeping things a bit cleaner for the user by having just 3 main functions/choices for the first prompt that will then be expanded upon for more specific choices.
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
                        addDepartment();  //if they chose dept run addDept function
                        break;
                      case "role":
                        addRole(); //if chose role, run addRole function
                        break;
                      case "employee":
                        addEmployee(); //if chose emp run addEmployee func
                    };
                }) //end .then statement

        } // next check if answer is to update something
        else if (answers.desire == "UPDATE EXISTING DATA") {
            updateEmployee();
        }
     });
}; //end my start function

mainPrompt(); //we want the main function/prompt to happen after opening index.js

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

//prompt questions for creating a new role
const roleQuestions = [
    {
        type: "input",
        message: "what is the title of this new role?",
        name: "roleTitle"            
    },
    {
        type: "input",
        message: "what is the annual salary of this new role? please enter only digits with no commas or symbols",
        name: "roleSalary"            
    },
    {
        type: "input",
        message: "what is the numerical ID for the department that this role will belong to? see the table directly above for dept IDs",
        name: "roleDept"            
    },];

    
const theEmployeeQuestions = [
    {
        type: "input",
        message: "what is the first name of this person?",
        name: "fname"            
    },
    {
        type: "input",
        message: "what is their last name?",
        name: "lname"            
    },
    {
        type: "input",
        message: "reference the ROLE table directly above and find the ROLE ID (number) for the role you'd like to assign this person to. Type only that number and hit enter",
        name: "role_id"            
    },
];

//this will be pushed into the question set for addEmployee IF the user chooses to add a manager
const managerQuestion = {
    type: "input",
    message: "Finally, since you want to assign a manager, please enter the EMPLOYEE ID of the EMPLOYEE that you wnat to be the MANAGER of this new employee. Above the dept table and role table is the list of current employees with their IDs",
    name: "manager_id"  
};
//query string for adding an employee that has a manager
// const employeeWithManager = `insert into employee (first_name, last_name, role_id, manager_id) values ("${answers.fname}","${answers.lname}", ${answers.role_id}, ${answers.manager_id});`;
// // //query string for adding employee w/out manager
// const employeeWithoutManager = `insert into employee (first_name, last_name, role_id) values ("${answers.fname}","${answers.lname}", ${answers.role_id});`;

//function to view formatted table with formatting/specific query based on which table is chosen
function viewTable(tableChoice) {
    switch (tableChoice){
        case "department":
            connection.query(
                `SELECT * FROM ${tableChoice}`, function(err,results,fields) { //short query so no need to store above
                  console.log('\x1b[35m here is list of our departments \x1b[0m') //friendly conf message
                  console.table(results); //show them what they asked for
                  console.log('--------------------------------------------------');
                  console.log("\x1b[33m OK, what next? \x1b[0m") //let's get on with it --> bring back the main prompt set
                  mainPrompt();
                 });
            break;
        case "role":
            connection.query(
                roleQuery, function(err, results, fields) { //query string is stored in variable above
                    console.log("\x1b[35m here is list of the company's positions and their respective departments \x1b[0m")
                    console.table(results);
                    console.log('--------------------------------------------------');
                    console.log("\x1b[33m OK, what next? \x1b[0m")
                    mainPrompt();
                });
            break;
        case "employee":
            connection.query(
                employeeQuery, function(err, results, fields) {
                    console.log("\x1b[35m here is list of our wonderful employees and information regarding them \x1b[0m")
                    console.table(results);
                    console.log('--------------------------------------------------');
                    console.log("\x1b[33m OK, what next? \x1b[0m")
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
                    console.log("\x1b[33m if you didn't type something stupid your dept name will be added. go and view departments to see if it is added to the list. \x1b[0m")
                    mainPrompt();
        }); 
    });
};

function addRole() {
    connection.query(
        `SELECT * FROM department`, function(err,results,fields) {
          console.log('\x1b[35m here is the department list with IDs \x1b[0m')
          console.table(results);
    inquirer.prompt( roleQuestions
        ).then((answers) => {
            connection.query(
                `insert into role (title, salary, department_id) values ("${answers.roleTitle}",${answers.roleSalary}, ${answers.roleDept});`, function(err, results, fields) {
                    console.log("\x1b[33m if you managed to follow the directions the new role will be added. kthx. \x1b[0m")
                    mainPrompt();
        }); 
    });
});
};

// function called if user chooses to add an employee (will filter results based on whether they want to add a manager for the new employee)
function addEmployee() {
    console.log('-------------------------------------------------');
    getTable('employee'); //showing basic tables for referencing when answering prompts
    getTable('role');
    inquirer.prompt( 
        {
        type:'list',
        message:'do you want to assign a manager to this new employee???',
        choices: [ {value: "yes",}, {value: "no",}],
        name: "hasManager"
    },).then((answers) => {
        if (answers.hasManager == "yes") {
            
            console.log("\x1b[35m here are the tables you will need to reference. press down to continue. \x1b[0m")
            let employeeQuestions = theEmployeeQuestions;
            employeeQuestions.push(managerQuestion);
            inquirer.prompt(
                employeeQuestions,
            ).then((answers) => {
                connection.query(
                    `insert into employee (first_name, last_name, role_id, manager_id) values ("${answers.fname}","${answers.lname}", ${answers.role_id}, ${answers.manager_id});`, function(err, results, fields) {
                        console.log("\x1b[33m your new employee should be added. \x1b[0m")
                        mainPrompt();
                }); 
        })} //ends .then and if statement
        else if (answers.hasManager == "no") {
            getTable('role');
            inquirer.prompt(
                theEmployeeQuestions,
            ).then((answers) => {
                connection.query(
                    `insert into employee (first_name, last_name, role_id) values ("${answers.fname}","${answers.lname}", ${answers.role_id});`, function(err, results, fields) {
                        console.log("\x1b[33m your new employee should be added. \x1b[0m")
                        mainPrompt();
                }); 
        })};
});
};

function updateEmployee() {
    employee = chooseEmployee();
    // console.log('hi' + employee);
    // getTable('employee');
    // console.log("\x1b[35m here is the employees list - reference the ID #s when choosing which employee to update \x1b[0m");
    // inquirer.prompt( 
    //     {
    //     type:'list',
    //     message:'do you want to assign a manager to this new employee???',
    //     choices: [ {value: "yes",}, {value: "no",}],
    //     name: "hasManager"
    // },).then((answers) => {
};


function getTable(table) { //just a quick show of the table
    connection.query(
        `select * from ${table}`, function(err, results, fields) {
            console.table(results);
        });
    return;
};

function chooseEmployee() {
    let myEmployee;
    connection.query("select CONCAT(first_name,' ',last_name) as name from employee", function(err,results,fields) {
        inquirer.prompt(
            {
                type: 'list',
                message: 'which employee you wanna update?',
                choices: results, //options become the list of names returned from the query (so should always be a current list even when new employees have been added)
                name: 'employeeName',
            },).then((answers) => {
                myEmployee = `${answers.employeeName}`;
                myEmployeeSplit = myEmployee.split(' ');
                console.log(myEmployeeSplit[0]);
                //get the list of role titles as options to choose from
                connection.query("select title as value from role", function(err,results,fields) {
                    inquirer.prompt(
                        {
                            type: 'list',
                            message: `what role would you like to assign ${myEmployee} to?`,
                            choices: results,
                            name: 'newRole',
                        },).then((answers) => {
                            // console.log(answers.newRole);
                            //get the id of the role
                            connection.query(`select id from role where title = '${answers.newRole}';`, function(err,results,fields) {
                                console.log(results[0].id);
                                console.log('that is the id')
                                connection.query(`update employee set role_id = ${results[0].id} where first_name = '${myEmployeeSplit[0]};`, function(err,results,fields) {
                                    // console.log(myEmployeeSplit[0]);
                                    mainPrompt();
                                });
                                
                            });
                        })
                    // console.log(results);
                }); //ends inner query
                
            })  

    });
    // console.log(employee);
    // return employee;
}
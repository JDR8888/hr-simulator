//include everything needed to run our app
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();
const {employeeeQuery, roleQuery} = require('./dbFunctions.js'); 
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
    { value: "VIEW TABLES"},
    { value: "ADD SOMETHING NEW"},
    { value: "UPDATE EXISTING DATA"}
 ];

 
// define sql query that will be used to return employee list showing position title, department, salaray, manager name, etc
 

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
    if (answers = "VIEW TABLES") {
        inquirer.prompt(
            {
                type:'list',
                message:'we can sort results 3 ways, what would you like to view?',
                choices: options,
                name: "viewChoice"
            },).then((answers) => {
                console.log('\x1b[35m ok here you go \x1b[0m')
                console.log(answers.viewChoice)
                viewTable(answers.viewChoice);
            }) //end .then statement
        
    } // end if statement 
     
  });
} //end my start function

mainPrompt();

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
                employeeeQuery, function(err, results, fields) {
                    console.log("\x1b[35m here is list of our wonderful employees and information regarding them \x1b[0m")
                    console.table(results);
                    console.log('--------------------------------------------------');
                    console.log('OK, what next?')
                    mainPrompt();
                });
    }
};

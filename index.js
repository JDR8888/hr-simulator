const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

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

// define the set of primary options to display to the user while navigating the app in the terminal.
const options = [
    {
        value: "view all departments", 
    },
    {
        value: "view all roles",
    },
    {
        value: "view all employees",
    },
    {
        value: "add a department",
    },
    {
        value: "add a role",
    },
    {
        value: "add an employee",
    },
    {
        value: "update an employee role",
    }
];

inquirer.prompt(
    {
    type:'list',
    message: "omg what do you want",
    choices: options,
    name: "desire"
    },
  ).then((answers) => {
    let table;
    // let val = answers;
    switch (answers.desire) {
        case "view all departments":
            table = 'department';
            break;
        case "view all roles":
            table = 'role';
            break;
        case "view all employees":
            table = 'employee';
            break;
    }
    // console.log(choices[0]);
    // const table = 'department';
    connection.query(
      `SELECT * FROM ${table}`, function(err,results,fields) {
        console.log(`\x1b[35m here is your results \x1b[0m`)
        console.table(results);
    }
  );
  });


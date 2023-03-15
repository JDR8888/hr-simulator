const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    database: 'company_db',
    password: 'Oushy2023.'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

//   const table = 'department';
//   connection.query(
//     `SELECT * FROM ${table}`, function(err,results,fields) {
//         console.table(results)
//     }
//   );



const options = [
    {
        value: "view all departments",
        num: "1"
    },
    {
        value: "view all roles",
        num: "2"
    },
    {
        value: "view all employees",
        num: "3"
    },
    {
        value: "add a department",
        num: "4"
    },
    {
        value: "add a role",
        num: "5"
    },
    {
        value: "add an employee",
        num: "6"
    },
    {
        value: "update an employee role",
        num: "7"
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
    // let val = answers.desire.num;
    console.log(`you chose ${answers.value}`);
    // console.log(answers.desire.num);
    const table = 'department';
//   connection.query(
//     `SELECT * FROM ${table}`, function(err,results,fields) {
//         console.table(results);
//     }
//   );
  });


// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//       console.log(results);
//     }
//   );
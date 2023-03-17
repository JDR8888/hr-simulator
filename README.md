#  (Module 10 Challenge Columbia U)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com) 

## Description
A simple node.js CLI app with mysql functionality that allows the user to interact with a database for a simulated company. easily sort by departments, employees, etc. - want to feel the power of an HR exec? you have the ability to add employees, add entire job descriptions, change salaries, fire people. just name your desire and we'll guide you through it (see instructions below for setup/running the app). 

Made from scratch using the following acceptance criteria from Columbia University's Fullstack Bootcamp:
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

```

## INSTRUCTIONS
```
 after cloning the repo, run "npm i" to set up the necessary modules. 
 in the db subdirectory open up a mysql terminal, and run schema.sql, then seeds.sql 
 (type "source schema.sql" hit enter, then type "source seeds.sql" and hit enter) to set up your db before running. 
 in lines 10 through 12 of index.js you will need to enter your mysql login information. 
 the database name is "company_db" --> this can be found in schema.sql
 Once you have take care of the npm stuff and set up and seeded the db with the mysql files, open a terminal in the main directory and type "node index"
 after that, use the arrow keys to navigate the prompts.
 Have fun!
```


The github repo is @ https://github.com/JDR8888/hr-simulator

demo of the project: video link @ https://drive.google.com/file/d/1ZRZQ1oFwITjAaianimc6EeOCJ77FCPL4/view 



# Installation
N/A
# Usage
N/A
# Credits   
  [![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com) 
  inquire.js , node.js, console table, node-mysql2
# License
Please see the repo for license info

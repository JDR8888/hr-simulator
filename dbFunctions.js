// define our queries for viewing stuff 
// dept query is only a few words so does not need to be defined here since it does not take up much space

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

const roleQuery = `select role.title as job_title, role.salary as salary, department.name as department from role join department on role.department_id = department.id`

module.exports = {employeeQuery}


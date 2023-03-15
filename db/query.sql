-- query for getting all job roles with department name shown through a join
select  
role.title as job_title,
department.name as department 
from role
join department on 
role.department_id = department.id;
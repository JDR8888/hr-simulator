drop database if exists company_db;
create database company_db;

use company_db;

create table department (
    id INT NOT NULL AUTO_INCREMENT primary key,
    name varchar(30)
);

create table role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(100),
    salary decimal,
    department_id int,
    foreign key (department_id)
    references department(id)
    on delete set null
);

create table employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);

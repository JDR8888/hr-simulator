insert into department (name)
values ("logistics"),
("human resources"),
("sales"),
("accounting");

insert into role
(title,salary,department_id)
values ("swiper", 69420, 1),
("assistant to the regional manager", 43100, 3),
("pencil pusher", 175000, 2);

insert into employee 
(first_name, last_name, role_id, manager_id)
values
("baba", "booey", 1, 3),
("dwight","schrute", 2, 3);

insert into employee 
(first_name, last_name, role_id)
values
("slithy", "tove", 3); 
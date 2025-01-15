SELECT *
FROM department d;
FROM role r;
FROM employee e;


/* Retrieve all employees with their roles and departments */
SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id;

/* Retrieve employees by department */
SELECT e.id, e.first_name, e.last_name, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
/*
WHERE d.name = 'Engineering';
*/

/* Retrieve employees by Manager */
SELECT e.id, e.first_name, e.last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY m.id;
-- Retrieve all departments
SELECT id, name
FROM department;

-- Retrieve all roles with their department and salary
SELECT r.id, r.title, d.name AS department, r.salary
FROM role r
JOIN department d ON r.department_id = d.id;

-- Retrieve all employees with their roles, departments, and managers
SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, 
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- Add a new department
INSERT INTO department (name)
VALUES ($1);

-- Add a new role
INSERT INTO role (title, salary, department_id)
VALUES ($1, $2, $3);

-- Add a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4);

-- Update an employee's role
UPDATE employee
SET role_id = $1
WHERE id = $2;

-- Update an employee's manager
UPDATE employee
SET manager_id = $1
WHERE id = $2;

-- View employees by manager
SELECT e.first_name,
       e.last_name,
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM   employee e
LEFT JOIN employee m ON e.manager_id = m.id
WHERE  m.id = $1;

-- View employees by department
SELECT e.first_name, e.last_name, d.name AS department
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.name = $1;

-- Delete a department
DELETE FROM department
WHERE id = $1;

-- Delete a role
DELETE FROM role
WHERE id = $1;

-- Delete an employee
DELETE FROM employee
WHERE id = $1;

-- View the total utilized budget of each department, taking into account the number of employees
SELECT d.name AS department, SUM(r.salary) AS utilized_budget
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.id = $1
GROUP BY d.name
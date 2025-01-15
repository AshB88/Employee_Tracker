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
VALUES ('New Department Name');

-- Add a new role
INSERT INTO role (title, salary, department_id)
VALUES ('New Role Title', 50000, 1); -- Replace with actual values

-- Add a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('First Name', 'Last Name', 1, NULL); -- Replace with actual values

-- Update an employee's role
UPDATE employee
SET role_id = 2 -- Replace with actual role_id
WHERE id = 1; -- Replace with actual employee_id
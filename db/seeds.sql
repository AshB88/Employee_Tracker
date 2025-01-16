INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Marketing'),
       ('Human Resources'),
       ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
       ('Senior Software Engineer', 120000, 1),
       ('Accountant', 80000, 2),
       ('Senior Accountant', 100000, 2),       
       ('Lawyer', 120000, 3),
       ('Senior Lawyer', 140000, 3), 
       ('Salesperson', 60000, 4),
       ('Sales Manager', 90000, 4),
       ('Marketing Manager', 90000, 5),
       ('Senior Marketing Manager', 110000, 5),
       ('HR Specialist', 70000, 6),
       ('HR Manager', 90000, 6),
       ('Customer Service Rep', 40000, 7),
       ('Customer Service Manager', 60000, 7);

-- The manager_id field is a foreign key that references the id of another employee who is the manager.
-- If the employee does not have a manager, the manager_id is set to NULL.

INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager)
VALUES ('John', 'Doe', 2, NULL, TRUE), -- Senior Software Engineer
       ('Alice', 'Johnson', 4, NULL, TRUE), -- Senior Accountant
       ('Ivy', 'Lee', 12, NULL, TRUE), -- HR Manager
       ('Karen', 'Black', 14, NULL, TRUE), -- Customer Service Manager
       ('Jane', 'Doe', 1, 1, FALSE), -- Software Engineer, managed by John Doe
       ('Eve', 'Williams', 8, NULL, TRUE), -- Sales Manager
       ('Bob', 'Smith', 3, 2, FALSE), -- Accountant, managed by Alice Johnson
       ('David', 'Wilson', 5, NULL, FALSE), -- Lawyer
       ('Grace', 'Hopper', 10, NULL, TRUE), -- Senior Marketing Manager
       ('Frank', 'Miller', 7, 6, FALSE), -- Salesperson, managed by Eve Williams
       ('Hank', 'Green', 9, 9, FALSE), -- Marketing Manager, managed by Grace Hopper
       ('Jack', 'White', 11, 3, FALSE), -- HR Specialist, managed by Ivy Lee
       ('Charlie', 'Brown', 6, NULL, TRUE), -- Senior Lawyer
       ('Leo', 'Brown', 13, 4, FALSE); -- Customer Service Rep, managed by Karen Black
import { pool } from './connection.js';

const getDepartments = async () => {
    const res = await pool.query('SELECT id, name FROM department');
    return res.rows;
};

const getRoles = async () => {
    const res = await pool.query(`
        SELECT r.id, r.title, d.name AS department, r.salary
        FROM role r
        JOIN department d ON r.department_id = d.id
    `);
    return res.rows;
};

const getEmployees = async () => {
    const res = await pool.query(`
        SELECT e.id, e.first_name, 
        e.last_name,
        r.title AS job_title,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return res.rows;
};

const addDepartment = async (name: string) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = async (title: string, salary: number, department_id: number) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: number | null, is_manager: boolean) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager) VALUES ($1, $2, $3, $4, $5)', [first_name, last_name, role_id, manager_id, is_manager]);
};

const updateEmployeeRole = async (employee_id: number, role_id: number) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

const updateEmployeeManager = async (employee_id: number, manager_id: number) => {
    await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
};

const employeesByManager = async (manager_id: number) => {
    const res = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE e.manager_id = $1
    `, [manager_id]);
    return res.rows;
};

const employeesByDepartment = async (department_id: number) => {
    const res = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, d.name AS department
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE r.department_id = $1
    `, [department_id]);
    return res.rows;
};

const deleteDepartment = async (department_id: number) => {
    await pool.query('DELETE FROM department WHERE id = $1', [department_id]);
};

const deleteRole = async (role_id: number) => {
    await pool.query('DELETE FROM role WHERE id = $1', [role_id]);
};

const deleteEmployee = async (employee_id: number) => {
    await pool.query('DELETE FROM employee WHERE id = $1', [employee_id]);
};


const utilizedBudget = async (department_id: number) => {
    const res = await pool.query(`
        SELECT d.name AS department, SUM(r.salary) AS utilized_budget
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        WHERE d.id = $1
        GROUP BY d.name
    `, [department_id]);
    return res.rows;
};


export {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    employeesByManager,
    employeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    utilizedBudget
}
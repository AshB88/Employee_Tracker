import inquirer from 'inquirer';
import { connectToDb } from './connection.js';
import {
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
    utilizedBudget,
    getManagers
} from './queries.js';

await connectToDb();

const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: "Please select an action",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View the utilized budget of a department',
                'View all managers',
                'Exit'
            ]
        }
    ]);
    try {
        switch (answer.action) {
            case 'View all departments':
                console.table(await getDepartments());
                mainMenu();
                break;
            case 'View all roles':
                console.table(await getRoles());
                mainMenu();
                break;
            case 'View all employees':
                console.table(await getEmployees());
                mainMenu();
                break;
            case 'Add a department':
                const departmentAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Please enter the department name:'
                    }
                ]);
                await addDepartment(departmentAnswer.name);
                console.log('Department added successfully');
                mainMenu();
                break;
            case 'Add a role':
                const roleAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Please enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the role salary:'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Please enter the department ID:'
                    }
                ]);
                await addRole(
                    roleAnswer.title,
                    roleAnswer.salary,
                    roleAnswer.department_id
                );
                console.log('Role added successfully');
                mainMenu();
                break;
            case 'Add an employee':
                const employeeAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Please enter the employee first name:'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Please enter the employee last name:'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Please enter the role ID:'
                    }
                ]);

                const isManagerAnswer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'is_manager',
                        message: 'Is this employee a manager?',
                        default: false
                    }
                ]);
    
                const managerChoice = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'assignManager',
                        message: 'Would you like to assign a manager to this employee?',
                        default: false
                    }
                ]);
    
                let manager_id = null;
                if (managerChoice.assignManager) {
                    const managers = await getManagers();
                    const managerAnswer = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'Please select the manager:',
                            choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
                        }
                    ]);
                    manager_id = managerAnswer.manager_id;
                }
    
                await addEmployee(
                    employeeAnswer.first_name,
                    employeeAnswer.last_name,
                    parseInt(employeeAnswer.role_id),
                    manager_id,
                    isManagerAnswer.is_manager
                );
                console.log('Employee added successfully');
                mainMenu();
                break;
            case 'Update an employee role':
                const updateRoleAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employee_id',
                        message: 'Please enter the employee ID:'
                    },
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Please enter the ID of the roll to be assigned:'
                    }
                ]);

                const isManagerUpdateAnswer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'is_manager',
                        message: 'Is this employee a manager?',
                        default: false
                    }
                ]);
                
                await updateEmployeeRole(
                    updateRoleAnswer.employee_id,
                    updateRoleAnswer.role_id,
                    isManagerUpdateAnswer.is_manager,
                );
                console.log('Employee role updated successfully');
                mainMenu();
                break;
            case 'Update an employee manager':
                const updateManagerAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employee_id',
                        message: 'Please enter the employee ID:'
                    }
                ]);

                const managers = await getManagers();
                const managerAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Please select the new manager:',
                        choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
                    }
                ]);

                await updateEmployeeManager(
                    parseInt(updateManagerAnswer.employee_id),
                    parseInt(managerAnswer.manager_id)
                );
                console.log('Employee manager updated successfully');
                mainMenu();
                break;
            case 'View employees by manager':
                const employeeManagers = await getManagers();
                const employeesByManagerAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Please select the manager:',
                        choices: employeeManagers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
                    }
                ]);
                console.table(await employeesByManager(employeesByManagerAnswer.manager_id));
                mainMenu();
                break;
            case 'View employees by department':
                const departments = await getDepartments();
                const employeesByDepartmentAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Please select the department:',
                        choices: departments.map(department => ({ name: department.name, value: department.id }))
                    }
                ]);
                console.table(await employeesByDepartment(employeesByDepartmentAnswer.department_id));
                mainMenu();
                break;
            case 'Delete a department':
                const deleteDepartmentAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please enter the department ID:'
                    }
                ]);
                await deleteDepartment(deleteDepartmentAnswer.id);
                console.log('Department deleted successfully');
                mainMenu();
                break;
            case 'Delete a role':
                const deleteRoleAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please enter the role ID:'
                    }
                ]);
                await deleteRole(deleteRoleAnswer.id);
                console.log('Role deleted successfully');
                mainMenu();
                break;
            case 'Delete an employee':
                const deleteEmployeeAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please enter the employee ID:'
                    }
                ]);
                await deleteEmployee(deleteEmployeeAnswer.id);
                console.log('Employee deleted successfully');
                mainMenu();
                break;
            case 'View the utilized budget of a department':
                const utilizedBudgetAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Please enter the department ID:'
                    }
                ]);
                console.table(await utilizedBudget(parseInt(utilizedBudgetAnswer.department_id)));
                mainMenu();
                break;
            case 'View all managers':
                console.table(await getManagers());
                mainMenu();
                break;
            case 'Exit':
                process.exit();
        }
    } catch (err) {
        console.error('An error has occurred:', err);
        mainMenu();
    }
};

mainMenu();
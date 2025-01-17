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
                        type: 'list',
                        name: 'department_id',
                        message: 'Please select the department:',
                        choices: (await getDepartments()).map(department => ({ name: department.name, value: department.id }))
                    },
                
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
                ]);

                const availableRoles = await getRoles();
                const availableroleAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Please select the role:',
                        choices: availableRoles.map(role => ({ name: role.title, value: role.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (availableroleAnswer.role_id === 'back') {
                    mainMenu();
                    break;
                }

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
                    availableroleAnswer.role_id,
                    manager_id,
                    isManagerAnswer.is_manager
                );
                console.log('Employee added successfully');
                mainMenu();
                break;
            case 'Update an employee role':
                const employees = await getEmployees();
                const updateEmployeeAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee_id',
                        message: 'Please select the employee:',
                        choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (updateEmployeeAnswer.employee_id === 'back') {
                    mainMenu();
                    break;
                }
            
                const roles = await getRoles();
                const updateRoleAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Please select the new role:',
                        choices: roles.map(role => ({ name: role.title, value: role.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (updateRoleAnswer.role_id === 'back') {
                    mainMenu();
                    break;
                }

                const isManagerUpdateAnswer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'is_manager',
                        message: 'Is this employee a manager?',
                        default: false
                    }
                ]);
                
                await updateEmployeeRole(
                    updateEmployeeAnswer.employee_id,
                    updateRoleAnswer.role_id,
                    isManagerUpdateAnswer.is_manager,
                );
                console.log('Employee role updated successfully');
                mainMenu();
                break;
            case 'Update an employee manager':
                const currentEmployees = await getEmployees();
                const employeeSelection = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee_id',
                        message: 'Please select the employee:',
                        choices: currentEmployees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (employeeSelection.employee_id === 'back') {
                    mainMenu();
                    break;
                }

                const managers = await getManagers();
                const managerAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Please select the new manager:',
                        choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (managerAnswer.manager_id === 'back') {
                    mainMenu();
                } else {
                    await updateEmployeeManager(
                        employeeSelection.employee_id,
                        managerAnswer.manager_id
                    );
                    console.log('Employee manager updated successfully');
                    mainMenu();
                }
                break;
            case 'View employees by manager':
                const employeeManagers = await getManagers();
                const employeesByManagerAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'Please select the manager:',
                        choices: employeeManagers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (employeesByManagerAnswer.manager_id === 'back') {
                    mainMenu();
                    break;
                } else {
                    console.table(await employeesByManager(employeesByManagerAnswer.manager_id));
                    mainMenu();
                }
                break;
            case 'View employees by department':
                const departments = await getDepartments();
                const employeesByDepartmentAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Please select the department:',
                        choices: departments.map(department => ({ name: department.name, value: department.id })).concat({name: 'Back', value: 'back'})
                    }
                ]);

                if (employeesByDepartmentAnswer.department_id === 'back') {
                    mainMenu();
                } else {
                console.table(await employeesByDepartment(employeesByDepartmentAnswer.department_id));
                mainMenu();
                }
                break;
            case 'Delete a department':
                const departmentsToDelete = await getDepartments();
                const deleteDepartmentAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Please select a department to delete:',
                        choices: departmentsToDelete.map(department => ({ name: department.name, value: department.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (deleteDepartmentAnswer.department_id === 'back') {
                    mainMenu();
                } else {
                    await deleteDepartment(deleteDepartmentAnswer.department_id);
                    console.log('Department deleted successfully');
                    mainMenu();
                }
                break;
            case 'Delete a role':
                const rolesToDelete = await getRoles();
                const deleteRoleAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Please select a role to delete:',
                        choices: rolesToDelete.map(role => ({ name: role.title, value: role.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);

                if (deleteRoleAnswer.role_id === 'back') {
                    mainMenu();
                } else {
                    await deleteRole(deleteRoleAnswer.role_id);
                    console.log('Role deleted successfully');
                    mainMenu();
                }
                break;
            case 'Delete an employee':
                const employeesToDelete = await getEmployees();
                const deleteEmployeeAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee_id',
                        message: 'Please select an employee to delete:',
                        choices: employeesToDelete.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);
            
                if (deleteEmployeeAnswer.employee_id === 'back') {
                    mainMenu();
                } else {
                    await deleteEmployee(deleteEmployeeAnswer.employee_id);
                    console.log('Employee deleted successfully');
                    mainMenu();
                }
                break;
            case 'View the utilized budget of a department':
                const departmentsForBudget = await getDepartments();
                const utilizedBudgetAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Please select the department:',
                        choices: departmentsForBudget.map(department => ({ name: department.name, value: department.id })).concat({ name: 'Back', value: 'back' })
                    }
                ]);
            
                if (utilizedBudgetAnswer.department_id === 'back') {
                    mainMenu();
                } else {
                    console.table(await utilizedBudget(utilizedBudgetAnswer.department_id));
                    mainMenu();
                }
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
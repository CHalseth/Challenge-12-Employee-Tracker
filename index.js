const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

const { 
    deleteEmployee, 
    deleteRole, 
    deleteDepartment 
} = require('./lib/delete');

const { 
    addEmployee, 
    addRole, 
    addDepartment 
} = require('./lib/add');

const { 
    updateEmployee, 
    updateManager 
} = require('./lib/update');

const {
    getEmployee,
    getAllroles,
    getDepartment,
    getManagerEmployees,
    getByDepartment 
} = require('./lib/get');

const initialQuery = () => {
    inquirer.prompt([{
        name: 'query_type',
        type: 'list',
        message: 'What would you like to do?',
        choices: query_Array
        },
    ])
    .then((answer) => {
        if (answer.query_type === 'Vioew All Employees') {
            getEmployee(initialQuery);
        }
        if (answer.query_type === "View Employees By Manager") {
            getManagerEmployees(initialQuery);
        }
        if (answer.query_type === 'View Employees by Department') {
            getByDepartment(initialQuery);
        }
        if (answer.query_type === 'Add Employee') {
            addEmployee(getEmployee, initialQuery);
        }
        if (answer.query_type === 'Update Employee Manager') {
            updateManager(getEmployee, initialQuery);
        }
        if (answer.query_type === 'Delete An Employee') {
            deleteEmployee(getEmployee, initialQuery)
        }
        if (answer.query_type === 'View All Roles') {
            getAllroles(initialQuery);
        }
        if (answer.query_type === 'Add Role') {
            addRole(getAllRoles, initialQuery);
        }
        if (answer.query_type === 'Delete Role') {
            deleteRole(getAllRoles, initialQuery);
        }
        if (answer.query_type === 'View All Departments') {
            getDepartment(initialQuery);
        }
        if (answer.query_type === 'Add Department') {
            addDepartment(getDepartment, initialQuery);
        }
        if (answer.query_type === 'Delete Department') {
            deleteDepartment(getDepartment, initialQuery);
        }
        if (answer.query_type === 'Quit') {
            process.exit();
        }
    });
};

initialQuery();
const db = require('../db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Employee = require('./Employee');

const addEmployee = (getEmployee, initialQuery) => {
    inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "What is the employee's first name?",
          validate: (first_name) => {
            if (first_name) {
              return true;
            } else {
              console.log('Please enter a first name.');
            }
          },
        },
        {
          name: 'last_name',
          type: 'input',
          message: "What is the employee's last name?",
          validate: (last_name) => {
            if (last_name) {
              return true;
            } else {
              console.log('Please enter a last name.');
            }
          },
        },
      ])
      .then((nameData) => {
        employeeData = [nameData];
  
        const rolesql = `SELECT role.title, role.id FROM role`;
  
        db.query(rolesql, (err, rows) => {
          if (err) throw err;
          const roleArray = rows.map(({ title, id }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                name: 'role_id',
                type: 'list',
                message: "Choose Employee's Role",
                choices: roleArray,
              },
            ])
            .then((roleData) => {
              employeeData.push(roleData);
  
              const managerSql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`;
  
              db.query(managerSql, (err, rows) => {
                if (err) throw err;
                const ManagerArray = rows.map(
                  ({ first_name, last_name, id }) => ({
                    name: [first_name + ' ' + last_name],
                    value: id,
                  })
                );
                ManagerArray.push({ name: 'None', value: null });
                inquirer
                  .prompt([
                    {
                      name: 'manager_id',
                      type: 'list',
                      message: "Choose Employee's Manager",
                      choices: ManagerArray,
                    },
                  ])
                  .then((managerData) => {
                    employeeData.push(managerData);
                    const [
                      { first_name, last_name },
                      { role_id },
                      { manager_id },
                    ] = employeeData;
                    const newEmployee = new Employee(
                      first_name,
                      last_name,
                      role_id,
                      manager_id
                    );
  
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES(?,?,?,?)`;
                    const params = [first_name, last_name, role_id, manager_id];
                    db.query(sql, params, (err, result) => {
                      if (err) throw err;
                      console.log('New Employee Added');
                      getEmployee(initialQuery);
                    });
                  });
              });
            });
        });
      });
  };

const addRole = (getAllRoles, initialQuery) => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the new role?',
            validate: (title) => {
                if (title) {
                    return true;
                } else {
                    console.log('Please enter a title for the new role.');
                }
            },
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the new role?',
            validate: (salary) => {
                if (isNaN(salary)) {
                    console.log('Please enter a salary.');
                    return false;
                } else {
                    return true;
                }
            },
        },
    ])
    .then((newRoleData) => {
        newRoleArray = [newRoleData];

        const sql = `SELECT department.id, department.name FROM department`;
        db.query(sql, (err, rows) => {
            if (err) throw err;
            departmentArray = rows.map(({ name, id }) => ({
                name: name,
                value: id
            }));
            inquirer.prompt([
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'Please choose a department for the new role.',
                    choices: departmentArray,
                },
            ])
            .then((departmentData) => {
                newRoleArray.push(departmentData);

                const [{ title, salary }, { department_id }] = newRoleArray;
                const sql = `INSERT INTO role (title, salary, department_id)
                                VALUES(?,?,?)`;
                params = [title, salary, department_id];
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('New role added.');
                    getAllRoles(initialQuery);
                });
            });
        });
    });
};

const addDepartment = (getDepartment, initialQuery) => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the new department?',
            validate: (name) => {
                if (name) {
                    return true;
                } else {
                    console.log('Please enter a name for the department.');
                }
            },
        },
    ])
    .then((data) => {
        const sql = `INSERT INTO department (name)
                        VALUE(?)`;
        params = [data.name];
        db.query(sql, params,  (err, result) => {
            if (err) throw err;
            console.log('New department added.');
            getDepartment(initialQuery);
        });
    });
};

module.exports = {addDepartment, addEmployee, addRole};
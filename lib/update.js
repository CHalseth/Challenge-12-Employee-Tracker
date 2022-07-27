const db = require('../db/connection');
const inquirer = require('inquirer');

const updateEmployee = (getEmployee, initialQuery) => {
    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        const employeeArray = rows.map(({first_name, last_name, id}) => ({
            name: [first_name + '' + last_name],
            value: id
        }));
        inquirer.prompt([
            {
                name: 'id',
                type: 'list',
                message: 'Choose employee to update.',
                choices: employeeArray,
            },
        ])
        .then((data) => {
            roleUpdateArray = [data];
            const rolesql = `SELECT role.title, role.id FROM role`;

            db.query(rolesql, (err, rows) => {
                if (err) throw err;
                const roleArray = rows.map(({title, id}) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt([
                    {
                        name: 'role_id',
                        type: 'list',
                        message: "Choose employee's new role.",
                        choices: roleArray
                    },
                ])
                .then((roleData) => {
                    roleUpdateArray.push(roleData);
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                    const [{id}, {role_id}] = roleUpdateArray
                    params = [role_id, id];
                    db.query(sql, params, (err, results) => {
                        if (err) throw err;
                        console.log('Employee role updated.');
                        getEmployee(initialQuery);
                    });
                });
            });
        });
    });
};

const updateManager = (getEmployee, initialQuery) => {
    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        const employeeArray = rows.map(({first_name, last_name}) => ({
            name: [first_name + '' + last_name],
            value: id
        }));
        inquirer.prompt([
            {
                name: 'id',
                type: 'list',
                message: 'Choose employee to update.',
                chioces: employeeArray
            },
        ])
        .then((data) => {
            managerUpdateArray = [data];
            inquirer.prompt([
                {
                    name: 'manager_id',
                    type: 'list',
                    message: "Choose employee's new manager",
                    choices: employeeArray,
                },
            ])
            .then((data) => {
                managerUpdateArray.push(data);
                const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
                const [{id}, {manager_id}] = managerUpdateArray;
                params = [manager_id, id];
                db.query(sql, params, (err, results) => {
                    if (err) throw err;
                    console.log('Employee manager udpated.');
                    getEmployee(initialquery);
                });
            });
        });
    });
};

module.exports = {updateEmployee, updateManager};
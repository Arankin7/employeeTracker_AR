const { response } = require('express');
const express = require('express');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');


// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (NOT FOUND)
app.use((req, res) =>{
    res.status(404).end();
});

// start server after DB connection
db.connect(err=>{
    if(err) throw err;
    console.log('Database Connected');
    
    app.listen(PORT, () =>{
        // console.log(`Server running on port ${PORT}`);
        userPrompt();
    });
});

// Main prompt 
function userPrompt(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an employee role',
            'End'
        ]
    })
    .then(answer =>{
        switch(answer.choice){
            case 'View Departments':
                
                viewDepartments();
                // Logging an empty line and = for readability
                console.log('');
                console.log('===============================');
                console.log('Use the arrow keys to continue.');
                break;

            case 'View Roles':
                viewRoles();
                // Logging an empty line and = for readability
                console.log('');
                console.log('===============================');
                console.log('Use the arrow keys to continue.');
                break;

            case 'View Employees':
                viewEmployees();
                // Logging an empty line and = for readability
                console.log('');
                console.log('===============================');
                console.log('Use the arrow keys to continue.');
                break;

            case 'Add a Department':
                console.log('Adding department');
                addDepartment();
                break;

            case 'Add a Role':
                console.log('Adding a role');
                addRole();
                break;

            case 'Add an Employee':
                console.log('Adding an employee');
                addEmployee();
                break;

            case 'Update an employee role':
                console.log('Updating employee');
                updateEmployee();
                break;

            case 'End':
                console.log('Ending');
                db.end();
                process.exit();
        }
    });
}

// Functions for Viewing

// Function to view all departments
function viewDepartments(){
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        // Logging an empty space for readability
        console.log('');
        console.table(rows);
    });

    userPrompt();
}

// Viewing roles
function viewRoles(){
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        console.log('');
        console.table(rows);
    });
    userPrompt();
}

// Viewing employees
function viewEmployees(){
    const sql = `SELECT * FROM employees ORDER BY role_id`;
    
    db.query(sql, (err, rows) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        console.log('');
        console.table(rows);
    });
    userPrompt();
}


// Functions to add to database
function addDepartment(){
    // prompt for answers
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the new department?',
        name: 'deptName'
    })
    .then(response =>{
    const sql = `INSERT INTO departments(name) VALUES (?)`;
    const params = [response.deptName];

        db.query(sql, params, (err, result) =>{
            if(err) throw err;

            console.log('Department added!');
            userPrompt();
        }); 
    });
}

function addRole(){
    
    // prompt for answers
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID?',
            name: 'deptId',
        }
    ])
    .then(answers =>{
        const sql = `INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`;
        const params = [answers.roleName, answers.salary, answers.deptId];
    
        db.query(sql, params, (err, result) =>{
            if(err) throw err;
            
            console.log('Role added!');
            userPrompt();
        });
    })
};

function addEmployee(){
    // prompt for answers
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the Employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the role ID for the employee?',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'What is the manager ID for this employee?',
            name: 'managerId'
        }
    ])
    .then(answers =>{
    const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [answers.firstName, answers.lastName, answers.roleId, answers.managerId];

        db.query(sql, params, (err, result) =>{
            if(err) throw err;
            
            console.log('Employee Added!');
            userPrompt();
        });
    });    
};

function updateEmployee(){

    const  employeeQuery = `SELECT * FROM employees`;

    db.query(employeeQuery, (err, res) =>{
        if (err) throw err;

        const employees = res.map(({id, first_name, last_name}) => ({
            name: first_name + " " + last_name, value: id
        }));
        // console.log(employees);

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee role would you like to update?',
                choices: employees
            }
        ])
        .then(answer =>{
            const employee = answer.name;
            const params = [];

            params.push(employee);

            const roleQuery = `SELECT * FROM roles`;
            db.query(roleQuery, (err, res) =>{
                if (err) throw err;

                const roles = res.map(({id, title}) =>({
                    name: title, value: id
                }));

        inquirer.prompt([
            {
                type:'list',
                message: 'Please pick a new role for the employee.',
                name: 'newRole',
                choices: roles
            }
        ])
                .then(answer =>{
                    const role = answer.newRole;

                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

                    params.push(role);

                    let employee = params[0];
                    params[0] = role;
                    params[1] = employee;

                    console.log(params);

                    db.query(sql, params, (err, result) =>{
                        if(err) throw err;

                        console.log('Employee has been updated.');

                        userPrompt();
                    });
                });
            });
        });
    });
}

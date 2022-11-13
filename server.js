// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Washington24!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("**************************************");
    console.log("           EMPLOYEE TRACKER           ");
    console.log("**************************************");
    startingQuestion();
});

// Starting Question
function startingQuestion() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: ['View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ],
            },
        ])
        .then(function (answers) {
            if (answers.choices === 'View All Employees') {
                viewEmployees();
            } else if (answers.choices === 'Add Employee') {
                addEmployee();
            } else if (answers.choices === 'Update Employee Role') {
                updateRole();
            } else if (answers.choices === 'View All Roles') {
                viewRoles();
            } else if (answers.choices === 'Add Role') {
                addRole();
            } else if (answers.choices === 'View All Departments') {
                viewDepartments();
            } else if (answers.choices === 'Add Department') {
                addDepartment();
            } else if (answers.choices === 'Quit') {
                console.log('Good-Bye')
                db.end();
            }
        })
};


// Viewing
function viewDepartments() {
    db.query('SELECT * FROM department',
        function (err, results) {
            if (err) throw err;
            console.table(results);
            startingQuestion();
        });
};

function viewRoles() {
    db.query("SELECT * FROM role",
        function (err, results) {
            if (err) throw err;
            console.table(results);
            startingQuestion()
        });
};

function viewEmployees() {
    db.query("SELECT * FROM employee",
        function (err, results) {
            if (err) throw err;
            console.table(results);
            startingQuestion()
        });
};

// Adding
function addDepartment(departmentAnswers) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: "What is the name of the department?",
            },
        ])
        .then(function (answers) {
            console.log("Added " + answers.department + " to the database")
            addNewDepartment(answers.department)
        })
};

function addNewDepartment(name) {
    var sql = `INSERT INTO department (name) VALUES ('${name}')`;
    db.query(sql, function (err, results) {
        if (err) {
            console.log("Error message: " + err)
        }
        startingQuestion();
    });
};

function addRole(roleAnswers) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: "What is the name of the role?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
            },
            {
                type: 'list',
                name: 'department',
                message: "Which Department does the role belong to?",
                choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
            },
        ])
        .then(function (answers) {
            console.log("Added " + answers.role + " to the database")
            addNewRole(answers.role, answers.salary,)
        })
};

function addNewRole(title, salary,) {
    var sql = `INSERT INTO role (title, salary, department_id) VALUES ('${title}' , '${salary}', '5')`;
    db.query(sql, function (err, results) {
        if (err) {
            console.log("Error message: " + err)
        }
        startingQuestion();
    });
};

function addEmployee(employeeAnswers) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
            },
        ])
        .then(function (answers) {
            console.log("Added " + answers.first_name + " " + answers.last_name + " to the database")
            addNewEmployee(answers.first_name, answers.last_name)
        })
};

function addNewEmployee(first_name, last_name) {
    var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}' , '${last_name}', '9', '1')`;
    db.query(sql, function (err, results) {
        if (err) {
            console.log("Error message: " + err)
        }
        startingQuestion();
    });
};

// Updating
function updateRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role do you want to update?",
                choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
            },
            {
                type: 'list',
                name: 'role',
                message: "Which role do you want to assign the selected employee?",
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            },
        ])
        .then(function (answers) {
            updateEmployeeRole(answers.employee, answers.role)
        })
};

function updateEmployeeRole(employee, role) {

    let name = employee.split(" ");
    let first = name[0];
    let last = name[1]

    sql = `UPDATE employee JOIN role SET role.title = '${role}' WHERE employee.first_name = '${first}' AND employee.last_name = '${last}' AND role.id = employee.role_id LIMIT 1;`;
    db.query(sql, function (err, results) {
        if (err) {
            console.log("Error message: " + err)
        }
        console.log("Employee role updated!")
        startingQuestion();
    });
};
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
                name: 'startinglist',
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
            if (answers.startinglist === 'View All Employees') {
                viewEmployees();
            } else if (answers.startinglist === 'Add Employee') {
                addEmployee();
            } else if (answers.startinglist === 'Update Employee Role') {
                updateRole();
            } else if (answers.startinglist === 'View All Roles') {
                viewRoles();
            } else if (answers.startinglist === 'Add Role') {
                addRole();
            } else if (answers.startinglist === 'View All Departments') {
                viewDepartments();
            } else if (answers.startinglist === 'Add Department') {
                addDepartment();
            } else if (answers.startinglist === 'Quit') {
                console.log('Good-Bye')
            }
        })
};

// Viewing
function viewDepartments() {
    db.query('SELECT department.id AS id, department.name AS name FROM department',
    function (err, results) {
        if (err) throw err;
        console.table(results);
        startingQuestion();
    });
};

function viewRoles() {
    db.query("SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
        if (err) throw err;
        console.table(results);
        startingQuestion()
    });
};

function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary, CONCAT(manager.first_Name, ' ',manager.last_name) AS manager FROM employee AS employee JOIN role AS role ON employee.role_id = role.id LEFT JOIN employee as manager ON employee.manager_id = manager.id JOIN department AS department ON role.department_id = department.id",
    function (err, results) {
        if (err) throw err;
        console.table(results);
        startingQuestion()
    });
};

// Adding
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
                // Customer Service or any other role needs to be added
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
                // Added employees need to show up on this list
            },
        ])
        .then(function (answers) {
            console.log("Employee added!")
            startingQuestion()
        })
};

function addRole(roleAnswers) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: "What is the name of the role?",
                // example: Customer Service
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary of the role?",
                // example: 80000
            },
            {
                type: 'list',
                name: 'department',
                message: "Which Department does the role belong to?",
                choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
                // Service or any other department needs to be added
            },
        ])
        .then(function (answers) {
            console.log("Role added!")
            startingQuestion()
        })
};

function addDepartment(departmentAnswers) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: "What is the name of the department?",
                // example: Service 
            },
        ])
        .then(function (answers) {
            console.log("Department added!")
            startingQuestion()
        })
};

// Updating
function updateRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update?",
            choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
            // Added employees need to show up on this list ex. Sam Cash
        },
        {
            type: 'list',
            name: 'role',
            message: "Which role do you want to assign the selected employee?",
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            // Customer Service or any other role needs to be added
        },
    ])
    .then(function (answers) {
        console.log("Department added!")
        startingQuestion()
    })
};
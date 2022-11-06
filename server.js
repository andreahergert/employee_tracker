// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

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
function viewEmployees() {
    // View All Employees
    // Shows employee table from employees_db
    // undefined
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        startingQuestion()
    });
};

function viewRoles() {
    // View All Roles
    // Shows role table from employees_db
    // undefined
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        startingQuestion()
    });
};

function viewDepartments() {
    // View All Departments
    // Shows department table from employees_db
    // undefined
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
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
            console.log("Added " + answers.department + " to the database!")
            startingQuestion()
        })
};

// Updating
function updateRole() {
    // Update Employee Role
    // "Which employee's role do you want to update?" [this is a list with choices]
    // example: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen [Sam Cash or new employee needs to be listed]
    // "Which role do you want to assign the selected employee?" [this is a list with choices]
    // example: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer, Customer Service
    // then goes back to "What would you like to do?" question

};


startingQuestion();
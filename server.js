// dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

// Connect to database, passing two parameters
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password actually put that in there
        password: 'Washington24!',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function startingQuestion() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'startinglist',
                message: 'What would you like to do?',
                choices:    [   'View All Employees',
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

};

function viewRoles() {
    // View All Roles
        // Shows role table from employees_db

};

function viewDepartments() {
    // View All Departments
        // Shows department table from employees_db 

};

// Adding
function addEmployee() {
    // Add Employee
        // "What is the employee's first name?"
            // example: Sam
        // "What is the employee's last name?"
            // example: Kash
        // "What is the employee's role?" [this is a list with choices]
            // example: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer, Customer Service
        // "Who is the employee's manager?" [this is a list with choices]
            // example: None, John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen
            // then goes back to "What would you like to do?" question

};

function addRole() {
    // Add Role
        // "What is the name of the role?"
            // example: Customer Service
        // "What is the salary of the role?"
            // example: 80000
        // "Which Department does the role belong to?" [this is a list with choices]
            // Engineering, Finance, Legal, Sales, Service
            // then goes back to "What would you like to do?" question

};

function addDepartment() {
    // Add Department
        // "What is the name of the department?"
            // example: Service then "Added Service to the database"
        // then goes back to "What would you like to do?" question

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
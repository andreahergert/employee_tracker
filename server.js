// dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
// not sure this is needed
const app = inquirer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Questions:
// "What would you like to do? (use arrow keys)" [this is a list with choices]

    // View All Employees
        // Shows employee table from employees_db

    // Add Employee
        // "What is the employee's first name?"
            // example: Sam
        // "What is the employee's last name?"
            // example: Kash
        // "What is the employee's role? (use arrow keys)" [this is a list with choices]
            // example: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer, Customer Service
        // "Who is the employee's manager? (use arrow keys)" [this is a list with choices]
            // example: None, John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen
            // then goes back to "What would you like to do?" question

    // Update Employee Role
        // "Which employee's role do you want to update (use arrow keys)" [this is a list with choices]
            // example: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen [Sam Cash or new employee needs to be listed]
        // "Which role do you want to assign the selected employee? (use arrow keys)" [this is a list with choices]
            // example: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer, Customer Service
            // then goes back to "What would you like to do?" question

    // View All Roles
        // Shows role table from employees_db

    // Add Role
        // "What is the name of the role?"
            // example: Customer Service
        // "What is the salary of the role?"
            // example: 80000
        // "Which Department does the role belong to? (use arrow keys)" [this is a list with choices]
            // Engineering, Finance, Legal, Sales, Service
            // then goes back to "What would you like to do?" question

    // View All Departments
        // Shows department table from employees_db 

    // Add Department
        // "What is the name of the department?"
            // example: Service then "Added Service to the database"
        // then goes back to "What would you like to do?" question

    // Quit
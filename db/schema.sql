DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (manager_id)
    REFERENCES (manager_id)
);
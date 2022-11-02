INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

-- department id should be a number
-- 2 = Engineering
-- 3 = Finance
-- 4 = Legal
-- 1 = Sales

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);
        
-- role id should be a number
-- 1 = Sales Lead
-- 2 = Salesperson
-- 3 = Lead Engineer
-- 4 = Software Engineer
-- 5 = Account Manager
-- 6 = Accountant
-- 7 = Legal Team Lead
-- 8 = Lawyer

-- manager id should be the role id of the employee's manager

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, null),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, null),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, null),
        ("Tom", "Allen", 8, 7);
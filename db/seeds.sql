INSERT INTO department (name)
VALUE
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Head Engingeer', 175000, 1),
('Software Engineer', 130000, 1),
('Account Manager', 150000, 2),
('Accountant', 110000, 2),
('Lawyer', 180000, 3),
('Paralegal', 90000, 3),
('Sales Manager', 80000, 4)
('Salesperson' 50000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, null),
('Jane', 'Doe', 2, 1),
('Frederick', 'Powell', 3, null)
('Liberty', 'Costa', 4, 3)
('Chad', 'Houston', 5, null)
('Maurice', 'Ellison', 6, 5)
('Joslyn', 'Tucker', 7, null)
('Xavier', 'Glenn', 8, 7)
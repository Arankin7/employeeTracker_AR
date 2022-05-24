INSERT INTO departments(name)
VALUES
('Sales'),
('Finance'),
('Legal'),
('Engineering');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Associate', 40000, 1),
('Sales Lead', 60000, 1),
('Accountant', 70000, 2),
('Account Manager', 80000, 2),
('Paralegal', 80000, 3),
('Lawyer', 100000, 3),
('Software Enginner', 100000, 4),
('Lead Engineer', 120000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('Anakin', 'Skywalker', 8, NULL),
('Luke', 'Skywalker', 7, 1),
('Padme', 'Amidala', 6, NULL),
('Leia', 'Organa', 5, 3),
('Ben', 'Kenobi', 8, NULL),
('Han', 'Solo', 2, NULL),
('Ben', 'Solo', 1, 6),
('Wedge', 'Antilles', 1, 6),
('Biggs', 'Darklighter', 3, 10),
('Jango', 'Fett', 4, NULL),
('Boba', 'Fett', 3, 10),
('Ahsoka', 'Tano', 7, 1),
('Sheev', 'Palpatine', 2, NULL);

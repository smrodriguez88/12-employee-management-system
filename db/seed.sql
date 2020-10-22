USE emptrack_db;
INSERT INTO department (id, name)
VALUES (1, "Sales"), 
(2, "Marketing"), 
(3, "Finance"), 
(4, "Human Resources"),
(5, "Software Engineering"), 
(6, "Information Technology"),
(7, "Other");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accounting Manager", 100000.00, 3), 
(2, "Accountant", 47000.00, 3),
(3, "Sales Manager", 180000.00, 1),
(4, "Sales Representitive", 82000.00, 1), 
(5, "Software Engineering Manager", 160000.00, 5), 
(6, "Software Engineer", 120000.000, 5), 
(7, "IT Engineering Manager", 160000.00, 6),
(8, "IT Engineer", 120000.00, 6),
(9, "IT Project Manager", 110000.00, 6),
(10, "HR Manager", 90000.00, 4),
(11, "HR Representitive", 45000.00, 4),
(12, "CEO", 400000.00, 7),
(13, "CFO", 380000.00, 7),
(14, "COO", 380000.00, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jeff", "Wilkins", 14, NULL), 
(2, "Mike", "Watts", 13, 1),
(3, "Cathy", "Arbuckle", 14, 1), 
(4, "Steve", "Rodriguez", 6, 14),
(5, "Ronald", "Swanson", 8, 4), 
(6, "Amit", "Hart", 9, 4),
(7, "Janice", "Balboa", 1, 2), 
(8, "Jasmine", "Massaro", 2, 7),
(9, "Stephanie", "Mueller", 3, 3), 
(10, "Faruth", "Meta", 4, 9),
(11, "Jim", "Hays", 5, 3),
(12, "Ashley", "Heartwood", 6, 11),
(13, "Jason", "Marter", 10, 3),
(14, "William", "Keith", 11, 13),
(15, "Johnny", "Blaze", 11, 13);
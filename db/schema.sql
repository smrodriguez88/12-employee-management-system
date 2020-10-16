DROP DATABASE IF EXISTS emptrack_db;
CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department(
    id INT(12),
    name VARCHAR(30),
    PRIMARY KEY (id),
);

CREATE TABLE role(
    id INT(12),
    title VARCHAR(30),
    salary DECIMAL(10, 4),
    department_id INT(24),
    PRIMARY KEY (id),
);

CREATE TABLE employee(
    id INT(12),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(10),
    manager_id INT(10),
    PRIMARY KEY (id),
);
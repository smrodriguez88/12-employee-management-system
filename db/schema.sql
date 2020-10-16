DROP DATABASE IF EXISTS emptrack_db;
CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id MEDIUMINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NOT NULL,
    department_id INT(24) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NOT NULL,
    PRIMARY KEY (id)
);
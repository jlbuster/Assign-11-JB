DROP DATABASE IF EXISTS assign_11_jb;

CREATE DATABASE assign_11_jb;

USE assign_11_jb;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT  NOT NULL REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES role(id),
    manager_id INT NOT NULL REFERENCES employee(id),
    PRIMARY KEY(id)
);



USE assign_11_jb;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");


INSERT INTO role (title, salary, department_id) VALUES ("Sales Executive", 240000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 90000, 1);

INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id) VALUES ("Financial Director", 250000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Financial Assistant", 110000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rob", "Haynes", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Charles", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ana", "Lopez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Stevens", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Clara", "White", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Earl", "Gray", 6, 5);
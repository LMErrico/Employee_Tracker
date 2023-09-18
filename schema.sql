DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    Primary Key(ID)
);
CREATE Table roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id int ,
    salary INT NOT NULL,
    Primary key(id),
    FOREIGN key(department_id)
    REFERENCES departments(id)
    on DELETE set null
);
CREATE TABLE employees(
  id INT  NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title_id INT ,
  manager VARCHAR(30),
  Primary key(ID),
  FOREIGN key(title_id)
  REFERENCES roles(id)
  on DELETE set null
);
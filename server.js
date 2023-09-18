const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'marc3la!',
  database: 'employee_db',
});
let selections = [];
let selections2 = [];
function one_time() {
  console.clear();
  console.log('');
  console.log('');
  console.log('        ::::::::::   :::   :::   :::::::::  :::        ::::::::  :::   ::: :::::::::: ::::::::::');
  console.log('       :+:         :+:+: :+:+:  :+:    :+: :+:       :+:    :+: :+:   :+: :+:        :+:        ');
  console.log('      +:+        +:+ +:+:+ +:+ +:+    +:+ +:+       +:+    +:+  +:+ +:+  +:+        +:+       ');
  console.log('     +#++:++#   +#+  +:+  +#+ +#++:++#+  +#+       +#+    +:+   +#++:   +#++:++#   +#++:++#     ');
  console.log('    +#+        +#+       +#+ +#+        +#+       +#+    +#+    +#+    +#+        +#+           ');
  console.log('   #+#        #+#       #+# #+#        #+#       #+#    #+#    #+#    #+#        #+#            ');
  console.log('  ########## ###       ### ###        ########## ########     ###    ########## ##########      ');
  console.log('');
  console.log('');
  console.log('    ::::::::::: :::::::::      :::      ::::::::  :::    ::: :::::::::: :::::::::               ');
  console.log('       :+:     :+:    :+:   :+: :+:   :+:    :+: :+:   :+:  :+:        :+:    :+:               ');
  console.log('      +:+     +:+    +:+  +:+   +:+  +:+        +:+  +:+   +:+        +:+    +:+                ');
  console.log('     +#+     +#++:++#:  +#++:++#++: +#+        +#++:++    +#++:++#   +#++:++#:                  ');
  console.log('    +#+     +#+    +#+ +#+     +#+ +#+        +#+  +#+   +#+        +#+    +#+                  ');
  console.log('   #+#     #+#    #+# #+#     #+# #+#    #+# #+#   #+#  #+#        #+#    #+#                   ');
  console.log('  ###     ###    ### ###     ###  ########  ###    ### ########## ###    ###                    ');
  console.log('');
  console.log('');
}
function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Please make a Selection:',
        choices: ['View all Employees', 'View Employees by Manager','View Employees by Department','Update Employee Role','View all Roles', 'Add Role', 'Add an Employee', 'View all Departments', 'Add Department', 'Quit'],
      },
    ])
    .then(answers => {
      const choiceContent = answers.choice;
      if (choiceContent === 'Quit') {
        console.log("Come again soon!!")
        process.exit(0);
      }
      if (choiceContent === 'View all Departments') {
        db.query('SELECT id, dept_name as Department FROM departments', function (err, results) {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          console.table(results);
          init();
        });
      }
      if (choiceContent === 'View all Roles') {
        db.query('SELECT id, title, department_id, salary  FROM roles', function (err, results) {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          console.table(results);
          init();
        });
      }
      if (choiceContent === 'View all Employees') {
        db.query('select em.id, em.first_name, em.last_name, ro.title, de.dept_name, ro.salary, em.manager from employees em  join roles ro on em.title_id = ro.id  join departments de on de.id = ro.department_id;', function (err, results) {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          console.table(results);
          init();
        });
      }
      if (choiceContent === 'Add Department') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'deptName',
              message: 'Enter the name of the department:',
            },
          ])
          .then(answers => {
            const dbValue = answers.deptName;
            db.query('insert into departments (dept_name) values (?);', dbValue, function (err, results) {
              if (err) {
                console.error('Error querying the database:', err);
                return;
              }
              console.table(results);
              init();
            });
          });
      }
      if (choiceContent === 'Add Role') {
        db.query('select dept_name from departments;', function (err, results) {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          selections = results.map((row) => ({
            value: row.dept_name,
            name: row.dept_name,
          }));
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'deptSelect',
                message: 'Select the Department:',
                choices: selections,
              },
              {
                type: 'input',
                name: 'roleName',
                message: 'Enter the name of the role:',
              },
              {
                type: 'input',
                name: 'Salary',
                message: 'Enter the salary for the role:',
              },
            ])
            .then(answers => {
              const selectedDept = answers.deptSelect;
              const selectedRole = answers.roleName;
              const selectedSalary = answers.Salary;
              db.query('select id from departments where dept_name = ?;', [selectedDept] , function (err, results) {
                if (err) {
                  console.error('Error querying the database:', err);
                  return;
                }
                const selectedDept_id = results[0].id;
                db.query('insert into roles (title, department_id, salary) values (?, ?, ?);', [selectedRole, selectedDept_id, selectedSalary], function (err, results) {
                  if (err) {
                    console.error('Error querying the database:', err);
                    return;
                  }
                  console.table(results);
                  init();
                });
              });
            });
        });
      }
      if (choiceContent === 'Add an Employee') {
        db.query('select title from roles;', function (err, results) {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          selections = results.map((row) => ({
            value: row.title,
            name: row.title,
          }));
          db.query('select distinct(manager) from employees;', function (err, results) {
            if (err) {
              console.error('Error querying the database:', err);
              return;
            }
            selections2 = results.map((row) => ({
              value: row.manager,
              name: row.manager,
            }));
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'roleSelect',
                  message: 'Select the Role:',
                  choices: selections,
                },
                {
                  type: 'list',
                  name: 'managerSelect',
                  message: 'Select the Manager:',
                  choices: selections2,
                },
                {
                  type: 'input',
                  name: 'firstName',
                  message: 'Enter the employee first name:',
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: 'Enter the employee last name:',
                },
                ])
                .then(answers => {
                  const selectedRole = answers.roleSelect;
                  const selectedManager = answers.managerSelect;
                  const selectedfname = answers.firstName;
                  const selectedlname = answers.lastName;
                  db.query('select id from roles where title = ?;', [selectedRole] , function (err, results) {
                    if (err) {
                      console.error('Error querying the database:', err);
                      return;
                    }
                    const selectedRole_id = results[0].id;
                    db.query('insert into employees (first_name, last_name, title_id, manager) values (?, ?, ?, ?);', [selectedfname, selectedlname, selectedRole_id, selectedManager], function (err, results) {
                      if (err) {
                        console.error('Error querying the database:', err);
                        return;
                      }
                      console.table(results);
                      init();
                    });
                  });
                });
            });
          });
        }
        if (choiceContent === 'Update Employee Role') {
          db.query('select id, first_name, last_name from employees;', function (err, results) {
            if (err) {
              console.error('Error querying the database:', err);
              return;
            }
            selections = results.map((row) => ({
              value: row.id,
              name: `${row.first_name} ${row.last_name}`,
            }));
            db.query('select title from roles;', function (err, results) {
              if (err) {
                console.error('Error querying the database:', err);
                return;
              }
              selections2 = results.map((row) => ({
                value: row.title,
                name: row.title,
              }));
              inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'employeeSelect',
                    message: 'Select the employee:',
                    choices: selections,
                  },
                  {
                    type: 'list',
                    name: 'roleSelect',
                    message: 'Select the new role:',
                    choices: selections2,
                  },
                ])
                .then(answers => {
                  const selectedEmployee = answers.employeeSelect;
                  const selectedRole = answers.roleSelect;
                  db.query('select id from roles where title = ?;', [selectedRole] , function (err, results) {
                    if (err) {
                      console.error('Error querying the database:', err);
                      return;
                    }
                    const selectedRole_id = results[0].id;
                    db.query('update employees set title_id = ? where id = ? ;', [selectedRole_id, selectedEmployee], function (err, results) {
                      if (err) {
                        console.error('Error querying the database:', err);
                        return;
                      }
                      console.table(results);
                      init();
                    });
                  });
                });
            });
          });
        }
        if (choiceContent === 'View Employees by Manager') {
          db.query('select em.first_name, em.last_name, ro.title, de.dept_name, ro.salary, em.manager from employees em  join roles ro on em.title_id = ro.id  join departments de on de.id = ro.department_id order by em.manager;', function (err, results) {
            if (err) {
              console.error('Error querying the database:', err);
              return;
            }
            console.table(results);
            init();
          });
        }
        if (choiceContent === 'View Employees by Department') {
          db.query('select em.first_name, em.last_name, ro.title, de.dept_name, ro.salary, em.manager from employees em  join roles ro on em.title_id = ro.id  join departments de on de.id = ro.department_id order by de.dept_name;', function (err, results) {
            if (err) {
              console.error('Error querying the database:', err);
              return;
            }
            console.table(results);
            init();
          });
        }
      });
  }
  one_time();
  init();
 
  
  
  
  
  

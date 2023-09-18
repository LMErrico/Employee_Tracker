insert into departments( id, dept_name)
values  (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal"),
        (1, "Sales");
Insert into roles( id, title, department_id, salary)
    values  (1, "Sales Lead", 1,100000 ),
            (2, "Salesperson", 1, 80000),
            (3, "Lead Engineer",2,150000 ),
            (4, "Software Engineer", 2, 120000 ),
            (5, "Account Manager", 3, 160000 ),
            (6, "Accountant", 3, 125000),
            (7, "Legal Team Lead", 4, 250000),
            (8, "Lawyer", 4, 190000);
insert into employees(id, first_name, last_name, title_id,  manager)
    values  (1, "John", "Doe", 1 , null),
            (2, "Mike", "Chan", 2, "John Doe"),
            (3, "Ashley", "Rodriguez", 3 , null),
            (4, "Kevin", "Tupik", 4, "Ashley Rodriguez"),
            (5, "Kunal", "Singh", 5, null),
            (6, "Malia", "Brown", 6, "Kunal Singh" ),
            (7, "Sarah", "Lourd", 7, null ),
            (8, "Tom", "Allen", 8, "Sarah Lourd");
            
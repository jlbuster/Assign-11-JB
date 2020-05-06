const mysql = require('mysql2/promise')
const consoleTable = require('console.table')
const inquirer = require('inquirer')

const ADD_STUFF = 'Add departments, roles, or employees'
const VIEW_STUFF = 'View departments, roles, or employees'
const UPDATE_STUFF = 'Update employee information'
const QUIT = 'Quit'

const ADD_DEPARTMENT = 'Add a new department'
const ADD_ROLE = 'Add a new role'
const ADD_EMPLOYEE = 'Add a new employee'

const VIEW_DEPARTMENT = 'View departments'
const VIEW_ROLE = 'View roles'
const VIEW_EMPLOYEE = 'View employees'

const UPDATE_ROLE = "Update an employee's role"

async function main() {
    try {
        await connect()
        await runApp()

    } catch (err) {
        console.log(err)
    } finally {
        connection.end()
    }
}

main()

async function connect() {
    connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'HeatLight2Cage',
        database: 'assign_11_jb'
    })
}

async function runApp () {
    const answer = await promptStuff()
  
    switch (answer.stuff) {
      case ADD_STUFF:
        await addStuff()
      case VIEW_STUFF:
        await viewStuff()
      case UPDATE_STUFF:
        await updateStuff()
      case QUIT:
        await quit()
    }
}

async function promptStuff () {
    return inquirer.prompt({
      name: 'stuff',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        ADD_STUFF,
        VIEW_STUFF,
        UPDATE_STUFF,
        QUIT
      ]
    })
}

async function addStuff() {
    const answer = await askAdd()

    switch(answer.add) {
        case ADD_DEPARTMENT:
            await addDepartment()
        case ADD_ROLE:
            await addRole()
        case ADD_EMPLOYEE:
            await addEmployee()
    }
}

async function askAdd () {
    return inquirer.prompt({
      name: 'add',
      type: 'list',
      message: 'What would you like to add?',
      choices: [
        ADD_DEPARTMENT,
        ADD_ROLE,
        ADD_EMPLOYEE
      ]
    })
}

async function viewStuff() {
  const answer = await askView()

  switch(answer.view) {
      case VIEW_DEPARTMENT:
         await viewDepartment()
      case VIEW_ROLE:
          await viewRole()
      case VIEW_EMPLOYEE:
          await viewEmployee()
  }
}

async function askView () {
  return inquirer.prompt({
    name: 'view',
    type: 'list',
    message: 'What would you like to view?',
    choices: [
      VIEW_DEPARTMENT,
      VIEW_ROLE,
      VIEW_EMPLOYEE
    ]
  })
}

async function updateStuff() {
  const answer = await askUpdate()

  switch(answer.update) {
      case UPDATE_ROLE:
          return updateRole()
  }
}

async function askUpdate () {
  return inquirer.prompt({
    name: 'update',
    type: 'list',
    message: 'What information would you like to update?',
    choices: [
      UPDATE_ROLE
    ]
  })
}

async function viewEmployee() {

  const [rows] = await connection.query('SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, CONCAT(manage.first_name, " ", manage.last_name) AS manager FROM employee emp INNER JOIN role ON emp.role_id = role.id  INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manage ON manage.id = emp.manager_id')

  console.table(rows)
  console.log("\n")

  await runApp()
}

async function viewRole() {

  const [rows] = await connection.query('SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON department_id = department.id')

  console.table(rows)
  console.log("\n")

  await runApp()
}

async function viewDepartment() {

  const [rows] = await connection.query('SELECT department.id, name FROM department')

  console.table(rows)
  console.log("\n")

  await runApp()
}

async function addEmployee() {
  const [roleChoices] = await connection.query('SELECT id AS value, title AS name FROM role')
  const [managerChoices] = await connection.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee')
  //console.log(managerChoices)
  //Fetch role names and ids from role table. Run a loop on whatever that query return to create the choices array
  await inquirer.prompt([{
    name: 'firstName',
    type: 'input',
    message: "Please enter the employee's first name"
  },
  {
    name: 'lastName',
    type: 'input',
    message: "Please enter the employee's last name"
  },
  {
    name: 'role',
    type: 'list',
    message: "Please select a role for this employee",
    choices: roleChoices
  },
  {
    name: 'manager',
    type: 'list',
    message: 'Please select a manager for this employee',
    choices: managerChoices
  }
]).then(async function(answers){
  const [rows] = await connection.query('INSERT INTO employee SET ?', {
    first_name: answers.firstName,
    last_name: answers.lastName,
    role_id: answers.role,
    manager_id: answers.manager,
  })

  console.log('Employee has been created')
})

await runApp()

}

async function addRole() {
  const [departmentChoices] = await connection.query('SELECT id AS value, name FROM department')
  //console.log(departmentChoices)
  await inquirer.prompt([{
    name: 'newTitle',
    type: 'input',
    message: 'Please enter the title for the new role'
  }, 
  { 
    name: 'newSalary',
    type: 'input',
    message: 'Please enter the salary of the new role'
  },
  {
    name: 'newDepartment',
    type: 'list',
    message: 'Please select a department for this role',
    choices: departmentChoices
  }]).then(async function(answers) {
    const [rows] = await connection.query('INSERT INTO role SET ?', {
      title: answers.newTitle,
      salary: answers.newSalary,
      department_id: answers.newDepartment
    })

    console.log('Role has been created!')
  })

  await runApp()
}

async function addDepartment() {
  await inquirer.prompt([{
    name: 'newName',
    type: 'input',
    message: 'Please enter the name for the department'
  }
  ]).then(async function(answers) {
    const [rows] = await connection.query('INSERT INTO department SET ?', {
      name: answers.newName
    })

    console.log('Department has been created!')
  })

  await runApp()
}

async function updateRole() {
  const [updateChoices] = await connection.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee')
  const [updateRoles] = await connection.query('SELECT id AS value, title AS name FROM role')
  await inquirer.prompt([{
    name: 'chooseEmployee',
    type: 'list',
    message: 'Please select the employee whose role you would like to update',
    choices: updateChoices
  },
  {
    name: 'updateRole',
    type: 'list',
    message: 'Please select the new role for the employee',
    choices: updateRoles
}
]).then(async function (answers) {
    const [rows] = await connection.query('UPDATE employee SET ? WHERE ?', 
    [{role_id: answers.updateRole },
    {id: answers.chooseEmployee }]
  )

    console.log('Role has been updated!')
  })

  await runApp()
}

async function quit() {
  process.on('exit', function(code) {
    return console.log('Quitting')
})
}
const mysql = require('mysql2/promise')
const inquirer = require('inquirer')

const ADD_STUFF = 'Add departments, roles, or employees'
const VIEW_STUFF = 'View departments, roles, or employees'
const UPDATE_STUFF = 'Update departmetns, roles, or employees'
const QUIT = 'Quit'

const ADD_DEPARTMENT = 'Add a new department'
const ADD_ROLE = 'Add a new role'
const ADD_EMPLOYEE = 'Add a new employee'

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
        return addStuff()
      case VIEW_STUFF:
        return viewStuff()
      case UPDATE_STUFF:
        return updateStuff()
      case QUIT:
      break
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
            return addDepartment()
        case ADD_ROLE:
            return addRole()
        case ADD_EMPLOYEE:
            return addEmployee()
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

const db = require('../models/index.js')

const Salary = db.salary

// Salary Repo
const createEmployeeSalaryAndBonus = (username, salary, bonus) => {
    return Salary.create({
        username: username,
        salary: salary,
        bonus: bonus
    })
};

const findSalaryAndBonusRecordByUsername = (username) => {
    return Salary.findOne({
        where : {
            username: username
        }
    })
};

const findEmployeePayoutByUsername = (username) => {
    return Salary.findOne({
        where : {
            username: username
        },
        attributes: ['username', 'salary', 'bonus']
    })
};

const findAllSalary = () => {
    return Salary.findAll()
}

module.exports = {
    createEmployeeSalaryAndBonus,
    findSalaryAndBonusRecordByUsername,
    findEmployeePayoutByUsername,
    findAllSalary
}
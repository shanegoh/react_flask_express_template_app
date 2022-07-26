const db = require('../models/index.js')

const Employee = db.employee
const Salary = db.salary
const { QueryTypes } = db.sequelize
// Employee Repo

const findAllEmployees = () => {
    return Employee.findAll({
        attributes: ['id', 'username', 'role', 'dept_code', 'deleteFlag']
    })
};

const findEmployeeByUsername = (username) => {
    return Employee.findOne({ where: { username: username } })
};

const findEmployeeInfoByUsername = (username) => {
    return Employee.findOne({ where: { username: username }, attributes: ['username', 'role', 'dept_code'] })
};

const findAllEmployeeByDepartmentCode = (departmentCode) => {
    return Employee.findAll({
        attributes: ['id', 'username', 'role', 'dept_code', 'deleteFlag'],
        where: {
            dept_code: departmentCode
        }
    })
};

const createEmployeeAccount = (username, passwordHash, role, department) => {
    console.log(role)
    return Employee.create({
        username: username,
        password: passwordHash,
        role: role,
        dept_code: department,
        deleteFlag: 0
    })
};

const findEmployeeWithNoSalaryAndBonusRecord = () => {
    return db.sequelize.query("SELECT username FROM `employee` WHERE username NOT IN (SELECT username FROM `salary`)", { type: QueryTypes.SELECT });
};

// Template to mix table query
// const findAllEmployeeByDepartmentCode = (departmentCode) => {
//     return Department.findAll({
//         attributes: [],
//         include: [{
//             model: Employee,
//             attributes: ['id', 'username', 'role', 'dept_code', 'deleteFlag'],
//             where: {
//                 dept_code: departmentCode
//             }
//         }]
//     })
// };
module.exports = {
    findEmployeeByUsername,
    findAllEmployees,
    findEmployeeInfoByUsername,
    findAllEmployeeByDepartmentCode,
    createEmployeeAccount,
    findEmployeeWithNoSalaryAndBonusRecord
}

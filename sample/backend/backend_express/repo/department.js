const db = require('../models/index.js')
const { Op } = require("sequelize");

const Department = db.department
const Employee = db.employee


// Department Repo

const findDepartmentByCodeOrName = (departmentCode, departmentName) => {
    return Department.findOne({
        where: {
            [Op.or]: [
                {
                    dept_code: {
                        [Op.eq]: departmentCode
                    }
                },
                {
                    name: {
                        [Op.eq]: departmentName
                    }
                }
            ]
        }
    })
};

const findDepartmentByCode = (departmentCode) => {
    return Department.findOne({
        where: {
            dept_code: departmentCode
        }
    })
}

const createDepartment = (departmentCode, departmentName) => {
    return Department.create({
        dept_code: departmentCode,
        name: departmentName
    })
};

const updateDepartmentNameByCode = (departmentCode, departmentName) => {
    return Department.update({
        name: departmentName
    },
        {
            where: { dept_code: departmentCode }
        })
};

const findAllDepartment = () => {
    return Department.findAll()
};

module.exports = {
    findDepartmentByCodeOrName,
    findDepartmentByCode,
    createDepartment,
    updateDepartmentNameByCode,
    findAllDepartment
}
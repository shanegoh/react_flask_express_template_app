const { findEmployeeByUsername, findAllEmployees, findEmployeeInfoByUsername, findAllEmployeeByDepartmentCode, createEmployeeAccount, findEmployeeWithNoSalaryAndBonusRecord } = require('./repo/employee.js')
const { findDepartmentByCodeOrName, findDepartmentByCode, createDepartment, updateDepartmentNameByCode, findAllDepartment } = require('./repo/department.js')
const { findSalaryAndBonusRecordByUsername, createEmployeeSalaryAndBonus, findEmployeePayoutByUsername, findAllSalary } = require('./repo/salary.js')
const { updateInsertEmployeeImageRecord, findEmployeeImageByUsername } = require('./repo/image.js')

const getEmployeeByUsername = (username) => {
    return findEmployeeByUsername(username)
        .then(employee => {
            if (!employee) {
                console.log('No user ' + employee + ' exist.');
            } else {
                return employee
            }
        })
        .catch(function (err) {
            return err
        });
};

const getAllEmployees = () => {
    return findAllEmployees()
        .then(employeeList => {
            if (!employeeList) {
                console.log('No user ' + employee + ' exist.');
            } else {
                return employeeList
            }
        })
        .catch(function (err) {
            return err
        });
};

const addDepartment = (departmentCode, departmentName) => {
    return findDepartmentByCodeOrName(departmentCode, departmentName)
        .then(department => {
            if (department) {
                console.log('EXISITING ' + department);
                return false        // False if has existing: Cannot add
            } else {
                return createDepartment(departmentCode, departmentName)
                    .then((department) => {
                        return true
                    })
                    .catch((err) => {
                        console.log(err)
                        return err
                    })
            }
        })
        .catch(function (err) {
            console.log(err)
            return err
        });
};

const updateDepartment = (departmentCode, departmentName) => {
    return findDepartmentByCode(departmentCode)
        .then(department => {
            if (department) {
                return updateDepartmentNameByCode(departmentCode, departmentName)
                    .then((department) => {
                        return true
                    })
                    .catch((err) => {
                        console.log(err)
                        return err
                    })
            } else {
                return false;
            }
        })
        .catch(function (err) {
            console.log(err)
            return err
        });
};

const getAllEmployeeByDepartmentCode = (departmentCode) => {
    return findAllEmployeeByDepartmentCode(departmentCode)
};

const addEmployeeSalaryAndBonus = (username, salary, bonus) => {
    return employee = findEmployeeByUsername(username)
        .then((employee) => {
            if (employee)
                return true
            else {
                console.log('No such employee.')
                return false
            }
        })
        .then((status) => {
            if (status) {
                return findSalaryAndBonusRecordByUsername(username)
                    .then((employee) => {
                        if (employee) {
                            console.log('Existing employee salary and bonus.')
                            return false
                        } else
                            return true
                    })
            } else return false
        })
        .then((status) => {
            if (status) {
                return createEmployeeSalaryAndBonus(username, salary, bonus)
                    .then((employee) => {
                        console.log('Salary and Bonus created.')
                        return true
                    })
            } else {
                return false
            }
        })
        .catch((err) => {
            console.log(err)
            return err
        })
};

const getEmployeeInfoByUsername = (username) => {
    return findEmployeeInfoByUsername(username)
};

const getEmployeePayoutByUsername = (username) => {
    return findEmployeePayoutByUsername(username)
};

const storeImagePath = (username, filePath) => {
    return updateInsertEmployeeImageRecord(username, filePath)
};

const getEmployeeImageByUsername = (username) => {
    return findEmployeeImageByUsername(username).then((image) => {
        console.log(image['path'])
        return image['path']
    })
};

const getAllDepartment = () => {
    return findAllDepartment()
};

const addEmployeeAccount = (username, hashPwd, role, department) => {
    return createEmployeeAccount(username, hashPwd, role, department).then((status) => {
        return true
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}

const getAllSalary = () => {
    return findAllSalary()
}

const getEmployeeWithNoSalaryAndBonusRecord = () => {
    return findEmployeeWithNoSalaryAndBonusRecord()
}
module.exports = {
    getEmployeeByUsername,
    getAllEmployees,
    addDepartment,
    updateDepartment,
    getAllEmployeeByDepartmentCode,
    getEmployeeInfoByUsername,
    addEmployeeSalaryAndBonus,
    getEmployeePayoutByUsername,
    storeImagePath,
    getEmployeeImageByUsername,
    getAllDepartment,
    addEmployeeAccount,
    getAllSalary,
    getEmployeeWithNoSalaryAndBonusRecord
}
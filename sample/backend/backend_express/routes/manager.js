var express = require('express');
var manager_router = express.Router();
const multer = require('multer');
const formData = multer();
const { authenticateToken, verify_manager_role, hashPwd } = require('../auth.js')
const { getAllEmployees, addDepartment, updateDepartment, getAllEmployeeByDepartmentCode, addEmployeeSalaryAndBonus, addEmployeeAccount, getAllSalary, getEmployeeWithNoSalaryAndBonusRecord } = require('../services.js')
const { isEmpty } = require('../utils.js')

// Manager Access

// Find all employees information
manager_router.get('/employees', authenticateToken, verify_manager_role, function (req, res) {
    getAllEmployees()
        .then(employeeList => {
            console.log(employeeList)
            res.status(200).send({ 'employees': employeeList })
        })
        .catch((err) => {
            res.status(400).send({ 'message': err })
        })
});

// Add department
manager_router.put('/addDepartment', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    if (isEmpty(req.body.code) || isEmpty(req.body.name)) {
        console.log('EMPTY STRING DETECTED')
        res.status(400).send({ 'message': 'Please ensure that all fields are filled.' })
    } else {
        addDepartment(req.body.code, req.body.name)
            .then((isCreated) => {
                if (isCreated === true)
                    res.status(200).send({ 'message': 'Department has been created.' })
                else if (isCreated === false)
                    res.status(400).send({ 'message': 'Duplicate department code and/or name.' })
                else
                    res.status(400).send({ 'message': 'Failed to create department. Please check server logs for more details.' })
            })
            .catch((err) => {
                res.status(400).send({ 'message': err })
            })
    }

});

// Update department
manager_router.put('/updateDepartmentName/:code', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    if (isEmpty(req.params.code) || isEmpty(req.body.name)) {
        console.log('EMPTY STRING DETECTED')
        res.status(400).send({ 'message': 'Please ensure that all fields are filled.' })
    } else {
        updateDepartment(req.params.code, req.body.name)
            .then((isUpdated) => {
                if (isUpdated === true)
                    res.status(200).send({ 'message': 'Department has been updated.' })
                else if (isUpdated === false)
                    res.status(400).send({ 'message': 'Department does not exist. Unable to update.' })
                else
                    res.status(400).send({ 'message': 'Failed to update department. Please check server logs for more details.' })
            })
            .catch((err) => {
                res.status(400).send({ 'message': err })
            })
    }
});

// Find all employees from department by code
manager_router.get('/findAllEmployeesFromDepartment/:code', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    if (isEmpty(req.params.code)) {
        console.log('EMPTY STRING DETECTED')
        res.status(400).send({ 'message': 'Please provide department code' })
    } else {
        getAllEmployeeByDepartmentCode(req.params.code)
            .then((department) => {
                res.status(200).send({ 'employees': department })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).send(err)
            })
    }
});

// Add employee salary and bonus
manager_router.put('/addEmployeeSalaryAndBonus', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    if (isEmpty(req.body.username) || isEmpty(req.body.salary) || isEmpty(req.body.bonus)) {
        console.log('EMPTY STRING DETECTED')
        res.status(400).send({ 'message': 'Please ensure that all fields are filled.' })
    } else {
        addEmployeeSalaryAndBonus(req.body.username, req.body.salary, req.body.bonus)
            .then((isCreated) => {
                if (isCreated === true)
                    res.status(200).send({ 'message': 'Salary and bonus has been created.' })
                else if (isCreated === false)
                    res.status(400).send({ 'message': 'Existing salary and bonus for this employee.' })
                else
                    res.status(400).send({ 'message': 'Failed to create new salary and bonus. Please check server logs for more details.' })
            })
            .catch((err) => {
                res.status(400).send({ 'message': err })
            })
    }
});


// Create Employee Acountr
manager_router.post('/createEmployeeAccount', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    if (isEmpty(req.body.username) || isEmpty(req.body.role) || isEmpty(req.body.department)) {
        console.log('EMPTY STRING DETECTED')
        res.status(400).send({ 'message': 'Please ensure that all fields are filled.' })
    } else {
        return hashPwd(req.body.username).then((hashPwd) => {
            return addEmployeeAccount(req.body.username, hashPwd, req.body.role, req.body.department)
                .then((isCreated) => {
                    if (isCreated == true) {
                        res.send({ 'message': 'Account is created.' })
                    } else {
                        res.status(400).send({ 'message': 'Account duplicated.' })
                    }
                })
                .catch((err) => {
                    res.status(400).send({ 'message': 'Unable to create account. Please contact administrator.' })
                })
        })
    }
});


// Find All Salary
manager_router.get('/findAllSalary', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    getAllSalary()
        .then((salaries) => {
            if (salaries)
                return res.send({ 'salaries': salaries })
            else
                return res.status(400).send({ 'message': 'No Result.' })
        })
        .catch((err) => {
            res.status(400).send({ 'message': 'Unable to obtain result. Please contact administrator' })
        })
});


// Find employee with no salary record
manager_router.get('/findEmployeeWithNoSalaryAndBonusRecord', authenticateToken, verify_manager_role, formData.fields([]), function (req, res) {
    getEmployeeWithNoSalaryAndBonusRecord().then((result) => {
        if (result)
            res.send({ 'employees': result })
        else
            res.status(400).send({ 'message': 'No Result' })
    })
        .catch((err) => {
            console.log(err)
            res.status(400).send({ 'message': 'Unable to obtain result. Please contact administrator' })
        })

});


module.exports = manager_router;
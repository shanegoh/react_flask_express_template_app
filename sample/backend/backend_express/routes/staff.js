var express = require('express');
var staff_router = express.Router();
const multer = require('multer');
const formData = multer();
const { authenticateToken, verify_staff_role } = require('../auth.js')
const { getEmployeeInfoByUsername, getEmployeePayoutByUsername, storeImagePath, getEmployeeImageByUsername } = require('../services.js')
const { upload } = require('../upload.js')

// Find own information
staff_router.get('/findEmployeeInfo', authenticateToken, verify_staff_role, formData.fields([]), function (req, res) {
    getEmployeeInfoByUsername(req.username).then((employeeInfo) => {
        console.log(employeeInfo)
        res.send(employeeInfo)
    })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
});

// Find payout info
staff_router.get('/findEmployeePayout', authenticateToken, verify_staff_role, formData.fields([]), function (req, res) {
    getEmployeePayoutByUsername(req.username).then((payoutInfo) => {
        if (payoutInfo) {
            console.log(payoutInfo)
            res.send(payoutInfo)
        } else {
            res.status(400).send({ 'message': 'No Payout Information.' })
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
});

// Upload profile image
staff_router.post('/uploadProfileImage', authenticateToken, verify_staff_role, upload.single('image'), function (req, res) {
    console.log(req.filePath + "?")
    storeImagePath(req.username, req.filePath).then((status) => {
        res.status(200).send({ 'message': 'Successfully uploaded image.' })
    })
        .catch((err) => {
            console.log(err)
            res.status(400).send({ 'message': err })
        })
});

// Find profile image
staff_router.get('/findProfileImage', authenticateToken, verify_staff_role, formData.fields([]), function (req, res) {
    getEmployeeImageByUsername(req.username).then((fileName) => {
        console.log(fileName)
        res.sendFile(fileName, { root: '../backend_express/image/' })
    })
        .catch((err) => {
            console.log(err)
            res.status(400).send({ 'message': err })
        })

});

module.exports = staff_router;
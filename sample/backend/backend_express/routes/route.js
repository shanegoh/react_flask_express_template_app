var express = require('express');
var public_router = express.Router();
const multer = require('multer');
const formData = multer();
const { authenticate, authenticateToken } = require('../auth.js')
const { getAllDepartment } = require('../services.js')

// Public Access
public_router.post('/login', formData.fields([]), function (req, res) {
    console.log(req.body)
    authenticate(req.body)
        .then((token) => {
            if (token) {
                res.status(200).send({ 'accessToken': token })
            } else {
                res.status(401).send({ 'message': 'Invalid Username or Password' })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(401).send({ 'message': 'Invalid Username or Password' })
        })
});

// Find department
public_router.get('/findAllDepartment', authenticateToken, formData.fields([]), function (req, res) {

    getAllDepartment()
        .then((departmentList) => {
            res.send({ 'departments': departmentList })
        })
        .catch((err) => {
            res.status(400).send({ 'message': err })
        })

});

module.exports = public_router;
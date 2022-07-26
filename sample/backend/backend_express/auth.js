const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('./jwtUtil');
const { getEmployeeByUsername } = require('./services.js')


const hashPwd = (password) => {
    return bcrypt.hash(password, 10)
}

// Password authentication
const authenticate = (employee_payload) => {
    return getEmployeeByUsername(employee_payload.username)
        .then((employee) => {
            if (!employee) {
                console.log("Invalid username.")
            } else {
                if (bcrypt.compareSync(employee_payload.password, employee.password)) {
                    return generateAccessToken(employee)
                } else {
                    console.log("Invalid password.")
                }
            }
        })
}


// Middle ware for checking jwt verification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token === null)
        return res.status(401).send({ 'message': 'No access token provided' })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, claims) => {
        if (err)
            return res.sendStatus(403)

        req.username = claims['username']
        req.role = claims['role']
        next()
    })
}

// Middle ware for checking manager role
const verify_manager_role = (req, res, next) => {
    if (req.role === 1)
        next()
    else
        return res.status(401).send({ 'message': 'Access Denied' })
}

// Middle ware for checking staff role
const verify_staff_role = (req, res, next) => {
    if (req.role === 0)
        next()
    else
        return res.status(401).send({ 'message': 'Access Denied' })
}

module.exports = {
    authenticateToken,
    authenticate,
    verify_manager_role,
    verify_staff_role,
    hashPwd
}
const jwt = require('jsonwebtoken');

const generateAccessToken = (employee) => {
    return jwt.sign({
        'username': employee.username,
        'role': employee.role,
        'iat': new Date().getTime(),
        'exp': new Date().getTime() + 30 * 60000},
         process.env.TOKEN_SECRET);
}

module.exports = {
    generateAccessToken
}

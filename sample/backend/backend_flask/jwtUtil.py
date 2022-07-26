import jwt
from datetime import datetime, timedelta

def jwtDecode(token, secret, algorithms):
    return jwt.decode(token, secret, algorithms)

def generateToken(employee, secret, algorithm):
    # generates the JWT Token
    return jwt.encode({
        'username': employee.username,
        'role': employee.role,
        'iat' : datetime.utcnow(),
        'exp' : datetime.utcnow() + timedelta(minutes = 30)
    }, secret, algorithm)
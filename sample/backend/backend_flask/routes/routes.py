from flask import jsonify, make_response, request, Blueprint, current_app as app
from services import *
from utils import *
from auth import *
import sys

routes_bp = Blueprint('routes_bp', __name__)

# All User
@routes_bp.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
  
    if not auth or not auth.get(USERNAME) or not auth.get(PASSWORD):
        # returns 401 if any username or / and password is missing
        return make_response({MESSAGE : USERNAME_PASSWORD_EMPTY}, UNAUTHORIZED)
  
    employee = EmployeeService().getEmployeeByUsername(auth.get(USERNAME))

    if not employee:
        # returns invalid username password
        return make_response({MESSAGE : INVALID_CREDENTIALS_MSG}, UNAUTHORIZED)
    
    if authenticate(employee.password, auth.get(PASSWORD)): 
        app.logger.info('login: [Login]')
        return make_response({ACCESS_TOKEN : generateToken(employee, app.config['SECRET_KEY'], algorithm='HS256')}, OK)

    # Default
    return make_response({MESSAGE : INVALID_CREDENTIALS_MSG}, UNAUTHORIZED)

# Manager Only (Create Department)
@routes_bp.route('/findAllDepartment', methods=['GET'])
@token_required
def findAllDepartment(username):
    try:
        departments = DepartmentService().getAllDepartment()
        return make_response(jsonify({DEPARTMENT_HEADER: departments}), OK)
    except:
        exceptionMsg = str(sys.exc_info()[1])
        print(exceptionMsg)
        return make_response({MESSAGE: GENERIC_ERROR}, BAD_REQUEST)

    
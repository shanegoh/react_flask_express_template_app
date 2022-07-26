from http.client import NOT_FOUND
from logging import ERROR
from flask import jsonify, make_response, request, Blueprint, current_app as app, send_file
from services import *
from utils import *
from auth import *
import sys

staff_routes_bp = Blueprint('staff_routes_bp', __name__)

# Staff only (Find own details)


@staff_routes_bp.route("/findEmployeeInfo",  methods=['GET'])
@token_required
@staff_required
def findEmployeeInfoById(username):  # username get from decorator
    try:
        employee = EmployeeService().getEmployeeInfoByUsername(username)
        return make_response(jsonify(employee.__dict__), OK)
    except:
        return make_response({MESSAGE: RECORD_NOT_FOUND}, BAD_REQUEST)


# Staff only (Find salary details)
@staff_routes_bp.route("/findEmployeePayout",  methods=['GET'])
@token_required
@staff_required
def findEmployeePayout(username):  # username get from decorator
    try:
        salaryInfo = SalaryService().getSalaryInformationByEmployeeUsername(username)
        return make_response(jsonify(salaryInfo), OK)
    except:
        exceptionMsg = str(sys.exc_info()[1])
        print(exceptionMsg)
        app.logger.info(exceptionMsg)
        return make_response({MESSAGE: RECORD_NOT_FOUND}, BAD_REQUEST)


# Staff only (upload profile image)
@staff_routes_bp.route("/uploadProfileImage",  methods=['POST'])
@token_required
@staff_required
def uploadProfileImage(username):  # username get from decorator
    try:
        file = request.files['image']
        if file.filename == '':
            print('No selected file')
            return make_response({MESSAGE: IMAGE_NOT_FOUND}, BAD_REQUEST)

        if file and ImageService().allowed_file(file.filename):
            ImageService().uploadProfileImage(username, file)
            return make_response({MESSAGE: IMAGE_SUCCESSFULLY_UPLOADED}, OK)
    except:
        exceptionMsg = str(sys.exc_info()[1])
        print(exceptionMsg)
        app.logger.info("Error handling incoming file")
        return make_response({MESSAGE: UPLOAD_FAILED}, BAD_REQUEST)


# Staff only (upload profile image)
@staff_routes_bp.route("/findProfileImage",  methods=['GET'])
@token_required
@staff_required
def findProfileImage(username):  # username get from decorator
    try:
        path = ImageService().getImageByUsername(username)
        return send_file(path, mimetype='image/gif')
    except:
        exceptionMsg = str(sys.exc_info()[1])
        print(exceptionMsg)
        app.logger.info("Error downloading image file")
        return make_response({MESSAGE: LOADING_FAILED}, BAD_REQUEST)


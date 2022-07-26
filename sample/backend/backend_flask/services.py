from daos import *
from auth import generatePWDHash
from werkzeug.utils import secure_filename
import datetime
import os
# from collections import defaultdict

# Service Layer
# Business logics


class EmployeeService:
    def getAllUsers(self):
        return employee_dao.findAllUsers()

    def getEmployeeByUsername(self, given_username):
        return employee_dao.findEmployeeByUsername(given_username)

    def registerEmployee(self, username, role, department):
        return employee_dao.registerEmployee(username, generatePWDHash(username), role, department)

    def getAllEmployeesFromDepartment(self, code):
        return employee_dao.findAllEmployeesFromDepartment(code)

    def getEmployeeInfoByUsername(self, username):
        return employee_dao.findEmployeeInfoByUsername(username)

    def getEmployeeWithNoSalaryAndBonusRecord(self):
        return employee_dao.findEmployeeWithNoSalaryAndBonusRecord()


class DepartmentService:
    def getDepartmentByCodeAndORName(self, code, name):
        return department_dao.findDepartmentByCodeAndORName(code, name)

    def getDepartmentByCode(self, code):
        return department_dao.findDepartmentByCode(code)

    def addNewDepartment(self, code, name):
        return department_dao.addNewDepartment(code, name)

    def updateDepartment(self, department, name):
        department.name = name
        return department_dao.updateDepartment(department)
    
    def getAllDepartment(self):
        return department_dao.findAllDepartment()


class SalaryService:
    def addEmployeeSalaryAndBonus(self, username, salary, bonus):
        salary_dao.addEmployeeSalaryAndBonus(username, salary, bonus)

    def getSalaryInformationByEmployeeUsername(self, username):
        return salary_dao.findSalaryInformationByEmployeeUsername(username)

    def getAllSalary(self):
        return salary_dao.findAllSalary()

class ImageService:
    def allowed_file(self, filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

    def checkForExistingRecordBeforeSavingImage(self, username, uploadFileName):
        record = image_dao.findImageRecordByUsername(username)
        if record:
            return image_dao.updateProfileImage(record, uploadFileName)
        else:
            return image_dao.saveProfileImage(username, uploadFileName)

    def uploadProfileImage(self, username, file):
        filename = secure_filename(file.filename)
        dt = datetime.datetime.now()
        uploadFileName = str(dt.timestamp()) + '_' + filename
        file.save(os.path.join('./image', uploadFileName))
        return self.checkForExistingRecordBeforeSavingImage(username, uploadFileName)

    def getImageByUsername(self, username):
        return './image/' + image_dao.findImagePathByUsername(username)[0]




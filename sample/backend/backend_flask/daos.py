from models import *    # Declare variables from models

# Database access object


class EmployeeDAO:
    def __init__(self, model):
        self.model = model

    def findAllUsers(self):
        return [row._asdict() for row in Employee.query.with_entities(Employee.id, Employee.username, Employee.role, Employee.dept_code, Employee.deleteFlag).all()]

    def findEmployeeByUsername(self, given_username):
        return Employee.query\
            .filter_by(username=given_username)\
            .first()

    def registerEmployee(self, username, password, role, department):
        employee = Employee(
            username=username,
            password=password,
            role=role,
            dept_code=department
        )
        db.session.add(employee)
        db.session.commit()

    def findAllEmployeesFromDepartment(self, code):
        return [row._asdict() for row in Employee.query
                .join(Department, Employee.dept_code == Department.dept_code)
                .with_entities(Employee.id, Employee.username, Employee.role, Department.dept_code, Employee.deleteFlag)
                .filter(Employee.dept_code == code)
                .all()]

    #  def reading_list(df:pd.DataFrame)->list:
    #     return list(map(lambda x:Reading(h=x[0],p=x[1]),df.values.tolist()))

    def findEmployeeInfoByUsername(self, username):
        employee = Employee.query\
            .join(Department, Employee.dept_code == Department.dept_code)\
            .with_entities(Employee.id, Employee.username, Employee.role, Department.dept_code)\
            .filter((Employee.username == username))\
            .first()
        return EmployeeInfo(employee[0], employee[1], employee[2], employee[3])

    def findEmployeeWithNoSalaryAndBonusRecord(self):
        salary = Salary.query.with_entities(Salary.username)
        return [row._asdict() for row in Employee.query.with_entities(Employee.username).filter(Employee.username.notin_(salary)).all()]


class DepartmentDAO:
    def __init__(self, model):
        self.model = model

    def findDepartmentByCodeAndORName(self, code, name):
        return Department.query\
            .filter((Department.dept_code == code) | (Department.name == name))\
            .first()

    def findDepartmentByCode(self, code):
        return Department.query\
            .filter(Department.dept_code == code)\
            .first()

    def addNewDepartment(self, code, name):
        print(code)
        print(name)
        newDept = Department(
            dept_code=code,
            name=name
        )
        db.session.add(newDept)
        db.session.commit()

    def updateDepartment(self, department):
        db.session.merge(department)
        db.session.commit()

    def findAllDepartment(self):
        return Department.query.all()


class SalaryDAO:
    def __init__(self, model):
        self.model = model

    def addEmployeeSalaryAndBonus(self, username, salary, bonus):
        salaryRecord = Salary(
            username=username,
            salary=salary,
            bonus=bonus
        )
        db.session.add(salaryRecord)
        db.session.commit()

    def findSalaryInformationByEmployeeUsername(self, username):
        return Salary.query\
            .filter(Salary.username == username)\
            .first()

    def findAllSalary(self):
        return Salary.query.all()


class ImageDAO:
    def __init__(self, model):
        self.model = model

    def saveProfileImage(self, username, filePath):
        file = Image(
            username=username,
            path=filePath
        )
        db.session.add(file)
        db.session.commit()

    def findImageRecordByUsername(self, username):
        return Image.query.filter(Image.username == username).first()

    def updateProfileImage(self, record, filePath):
        record.path = filePath
        db.session.commit()

    def findImagePathByUsername(self, username):
        return Image.query.filter(Image.username == username).with_entities(Image.path).first()


# Declare dao object for services.py to use
employee_dao = EmployeeDAO(Employee)
department_dao = DepartmentDAO(Department)
salary_dao = SalaryDAO(Salary)
image_dao = ImageDAO(Image)

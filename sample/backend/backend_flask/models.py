from dataclasses import dataclass
from database import db


@dataclass
class Employee(db.Model):
    id: int
    username: str
    password: str
    role: int
    dept_code: int
    deleteFlag: int

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.Integer, nullable=False, default=0)
    dept_code = db.Column(db.Integer, nullable=False, default=0)
    deleteFlag = db.Column(db.Integer, nullable=False, default=0)


@dataclass
class Department(db.Model):
    id: int
    dept_code: int
    name: str

    id = db.Column(db.Integer, primary_key=True)
    dept_code = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(20), unique=True, nullable=False)


@dataclass
class Salary(db.Model):
    id: int
    username: str
    salary: int
    bonus: int

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    salary = db.Column(db.Integer, nullable=False, default=0)
    bonus = db.Column(db.Integer, nullable=False, default=0)


@dataclass
class Image(db.Model):
    id: int
    username: str
    path: int

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    path = db.Column(db.String(60))

#db.create_all()


class EmployeeInfo:
    def __init__(self, id, username, role, department):
        self.id = id
        self.username = username
        self.role = role
        self.dept_code = department

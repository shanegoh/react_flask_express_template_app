# Roles
MANAGER = 1
STAFF = 0

# Department Code
NIL = 0
HUMAN_RESOURCE = 1
IT = 2
FINANCE = 3

# Short text
EMPLOYEE_HEADER = "employees"
DEPARTMENT_HEADER = "departments"
SALARY_HEADER = "salaries"
USERNAME = "username"
PASSWORD = "password"
ROLE = "role"
DEPARTMENT = "department"
INVALID_CREDENTIALS_MSG = "Invalid Username or Password"
USERNAME_PASSWORD_EMPTY = "Username and password cannot be empty"
ACCOUNT_CREATED = "Account has been successfully created"
ACCOUNT_EXIST = "Account already exist. Please create another username"
MESSAGE = "message"
ACCESS_TOKEN = "accessToken"
CODE = "code"
NAME = "name"
SALARY = "salary"
BONUS = "bonus"
MISSING_DEPT_NAME_CODE = "Missing Department Name And/Or Code"
MISSING_DEPT_NAME = "Missing Department Name"
LENGTH_LIMIT_ERROR_OR_NAME_EXIST = "Make sure that department name does not exceed 20 characters and is unique"
DEPT_EXIST = "Department Code or Name already exist. Please try another"
DEPT_UPDATE_FAIL = "The department code or name you are trying to update already exist. Please try another"
DEPT_CREATED = "Department has been successfully created"
DEPT_UPDATED = "Department has been successfully updated"
DEPT_CREATE_FAIL = "Department did not create successfully. Please contact the administrator."
NO_PERMISSION = "No Access Permission"
NO_ACCESS_TOKEN = "No Access Token"
INVALID_ACCESS_TOKEN = "Invalid Access Token"
TOKEN_EXPIRED = "Access Token Expired"
TOKEN_CLAIMS_ERROR = "Invalid Token Claims"
EMPLOYEES_NOT_FOUND = "No Such Employee"
GENERIC_ERROR = "Somethings Wrong. Please contact the administrator"
SALARY_BONUS_ADD_SUCCESS = "Successfully created employee salary and bonus information"
SALARY_BONUS_ADD_FAIL = 'Failed to create employee salary and bonus information. Please contact administrator'
SALARY_BONUS_EXIST = 'Failed to create employee salary and bonus information. Employee Record Exist'
MISSING_FIELDS = 'Please ensure that all fields are filled'
RECORD_NOT_FOUND = 'No Record Exist'
IMAGE_NOT_FOUND = 'Image not present'
IMAGE_SUCCESSFULLY_UPLOADED = 'Image successfully uploaded.'
UPLOAD_FAILED = 'Failed to upload image. Please contact the administrator.'
LOADING_FAILED = 'Failed to load'
SALARIES_NOT_FOUND = 'Salaries Not Found. Please contact the administrator.'

# Status Code
OK = 200
CREATED = 201
ACCEPTED = 202
UPDATED = 204
BAD_REQUEST = 400
UNAUTHORIZED = 401
FORBIDDEN = 403
CONFLICT = 409

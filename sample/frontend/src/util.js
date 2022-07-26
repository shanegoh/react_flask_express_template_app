import jwt_decode from "jwt-decode";

export const MANAGER = "1";
export const STAFF = "0";

export const setAccessToken = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
};

export const removeAccessToken = () => {
    localStorage.removeItem("ACCESS_TOKEN");
};

export const getAccessToken = () => {
    return localStorage.getItem("ACCESS_TOKEN");
};

export const setRoleID = (role_id) => {
    localStorage.setItem("ROLE_ID", role_id);
};

export const removeRoleID = () => {
    localStorage.removeItem("ROLE_ID");
};

export const getRoleID = () => {
    return localStorage.getItem("ROLE_ID");
};

export const setEmployeeID = (id) => {
    localStorage.setItem("EMPLOYEE_ID", id);
};

export const removeEmployee_ID = () => {
    localStorage.removeItem("EMPLOYEE_ID");
};

export const getEmployeeID = () => {
    return localStorage.getItem("EMPLOYEE_ID");
};

export const isManager = () => {
    return localStorage.getItem("ROLE_ID") === "1" ? true : false;
};

export const isStaff = () => {
    return localStorage.getItem("ROLE_ID") === "0" ? true : false;
};

export const isTokenExpired = () => {
    const claims = jwt_decode(getAccessToken());
    if (claims.exp * 1000 < new Date().getTime()) {
        console.log("Expired Token");
        return true;
    } else {
        console.log("Valid Token");
        return false;
    }
};

export const processToken = (accessToken) => {
    if (accessToken) {
        console.log("Token is present.");
        const claims = jwt_decode(accessToken);
        console.log(claims)
        setAccessToken(accessToken)
        setRoleID(claims.role)
        setEmployeeID(claims.username)
    }
};

export const axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
};

export const getDepartmentByCode = (code, departmentList) => {
    for (let i in departmentList) {
        console.log(departmentList[i].name)
        if (departmentList[i].dept_code === code)
            return departmentList[i].name
    }
};

export const determineRole = () => {
    return isManager() ? 'Manager' : 'Staff'
}
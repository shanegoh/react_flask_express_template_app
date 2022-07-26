import React, { useState, useEffect } from 'react';
import Nav from '../component/Nav';
import { getAccessToken } from '../util';
import axios from 'axios';
import EmployeeTable from '../component/EmployeeTable';
import DepartmentTable from '../component/DepartmentTable';
import Loading from '../component/Loading';

export default function ManagerPage() {
    const [employeeList, setEmployeeList] = useState([])
    const [targetID, setTargetID] = useState(-1)
    const [isLoading, setLoadingStatus] = useState(true);
    const [departmentList, setDepartmentList] = useState([])

    const getTargetID = (id) => {
        console.log(id)
        setTargetID((targetID) => id)
    }

    const URL = targetID === -1 ? 'http://localhost:5000/api/manager/employees' : `http://localhost:5000/api/manager/findAllEmployeesFromDepartment/${targetID}`
    useEffect(() => {
        axios({
            method: "get",
            url: URL,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then(function (res) {
                console.log(res.data)
                setEmployeeList((employeeList) => [...res.data.employees])
                setLoadingStatus((isLoading) => false)
            })
            .catch(function (error) {
                setEmployeeList((employeeList) => [])
                setLoadingStatus((isLoading) => false)
                console.log(error);
            });

        axios({
            method: "get",
            url: 'http://localhost:5000/api/findAllDepartment',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then(function (res) {
                setDepartmentList((departmentList) => [...res.data.departments])
                console.log(res.data.departments)
            })
            .catch(function (error) {
                setDepartmentList((departmentList) => [])
                console.log(error);
            });
    }, [targetID]);

    return (
        <div>
            <Nav />
            {
                !isLoading ? (
                    <div className="d-flex flex-column gap-3">
                        <EmployeeTable employeeList={employeeList} departmentList={departmentList} sendTargetID={getTargetID} />
                        <DepartmentTable departmentList={departmentList} />
                    </div>
                ) : (<div className="d-flex justify-content-center"><Loading /></div>)
            }
        </div>
    );
}

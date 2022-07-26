import React, { useState, useEffect } from 'react';
import Nav from '../component/Nav';
import DetailCard from '../component/DetailCard'
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { getAccessToken, getDepartmentByCode, determineRole } from '../util'
import Loading from '../component/Loading';

export default function StaffPage() {
    const [deptCode, setDeptCode] = useState(0);
    const [departmentList, setDepartmentList] = useState([])
    const [salary, setSalary] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [img, setImg] = useState(0);
    const [isLoading, setLoadingStatus] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const promise1 = axios({
            method: "get",
            url: "http://localhost:5000/api/staff/findEmployeeInfo",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then((res) =>{
                console.log(res.data.dept_code)
                setDeptCode(res.data.dept_code)
            })
            .catch((error) => {
                console.log(error.response.data.message)
            });

        const promise2 = axios({
            method: "get",
            url: 'http://localhost:5000/api/findAllDepartment',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then((res) => {
                setDepartmentList((departmentList) => [...res.data.departments])
                console.log(res.data.departments)
            })
            .catch((error) => {
                setDepartmentList((departmentList) => [])
                console.log(error.response.data.message)
            });

        const promise3 = axios({
            method: "get",
            url: "http://localhost:5000/api/staff/findEmployeePayout",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then((res) => {
                setSalary(res.data.salary)
                setBonus(res.data.bonus)
            })
            .catch(function (error) {
                console.log(error.response.data.message)
                setSalary("Not Applicable")
                setBonus("Not Applicable")
            });

        const promise4 = axios({
            method: "get",
            url: "http://localhost:5000/api/staff/findProfileImage",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            responseType: "blob"
        })
            .then((res) => {
                var blobURL = URL.createObjectURL(res.data);
                setImg(blobURL)
            })
            .catch((error) => {
                console.log('No Image');
                setImg(null)
            });

        Promise.all([promise1, promise2, promise3, promise4])
            .then((values) => {
                setLoadingStatus((isLoading) => false);
            });
    }, []);

    return (
        <div >
            <Nav />
            {!isLoading ? (<div>
                <Container className="d-flex flex-row gap-3 justify-content-center">
                    <DetailCard header={'Employee Information'}
                        title_1={'Department: ' + getDepartmentByCode(deptCode, departmentList)}
                        title_2={'Rank: ' + determineRole()}
                        image={img}
                    />
                    <DetailCard header={'Employee Payout'}
                        title_1={'Salary: ' + salary}
                        title_2={'Bonus: ' + bonus}
                    />
                </Container>
            </div>) : (<div className="d-flex justify-content-center"><Loading /></div>)}
        </div>
    );
}

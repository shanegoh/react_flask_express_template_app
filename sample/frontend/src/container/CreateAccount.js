import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../component/SubmitButton.js'
import { getAccessToken } from '../util'
import Dropdown from 'react-bootstrap/Dropdown';
import '.././App.css';

export default function CreateAccount() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [departmentList, setDepartmentList] = useState([])
    const [role, setRole] = useState(0)
    const [department, setDepartment] = useState(0)
    const [roleText, setRoleText] = useState('Staff')
    const [departmentText, setDepartmentText] = useState('NIL')

    const handleRole = (event) => {
        console.log(event.target.id)
        setRole((role) => event.target.id)
        setRoleText((roleText) => event.target.text)
    }

    const handleDepartment = (event) => {
        console.log(event.target.id)
        setDepartment((department) => event.target.id)
        setDepartmentText((departmentText) => event.target.text)
    }

    useEffect(() => {
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
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('username', event.target[0].value);
        bodyFormData.append('role', role);
        bodyFormData.append('department', department);
        axios({
            method: "post",
            url: "http://localhost:5000/api/manager/createEmployeeAccount",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getAccessToken()}` },
        })
            .then(function (res) {
                setMessage((message) => res.data.message)
                navigate('/manager')
            })
            .catch(function (error) {
                console.log(error.response.data.message);
                setMessage((message) => error.response.data.message)
            });
    }

    return (
        <div className="d-flex justify-content-center pt-5">
            <Form onSubmit={handleSubmit} >
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                    <Form.Text className="text-muted">
                        Default password will be employee username
                    </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="role">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {roleText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleRole} id={1}>Manager</Dropdown.Item>
                            <Dropdown.Item onClick={handleRole} id={0}>Staff</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="department">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {departmentText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                departmentList.map((record) => {
                                    return (
                                        <Dropdown.Item onClick={handleDepartment} key={record.dept_code} id={record.dept_code}>{record.name}</Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <SubmitButton btn_name={"Create"} btn_color={"danger"} />
                <Form.Text className="text-muted">
                    {message}
                </Form.Text>
            </Form>
        </div >
    );
}


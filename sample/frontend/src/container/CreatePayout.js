import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../component/SubmitButton.js'
import { getAccessToken } from '../util'
import '.././App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CreateAccount() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [usernameList, setUsernameList] = useState([])
    const [selectedUsername, setSelectedUsername] = useState('')
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/api/manager/findEmployeeWithNoSalaryAndBonusRecord",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then(function (res) {
                console.log(res.data.employees)
                setUsernameList((usernameList) => [...res.data.employees])
            })
            .catch(function (error) {
                console.log(error.response.data.message)
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('username', event.target[0].value);
        bodyFormData.append('salary', event.target[1].value);
        bodyFormData.append('bonus', event.target[2].value);
        axios({
            method: "put",
            url: "http://localhost:5000/api/manager/addEmployeeSalaryAndBonus",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getAccessToken()}` },
        })
            .then(function (res) {
                setMessage((message) => res.data.message)
                navigate('/manager/salary')
            })
            .catch(function (error) {
                console.log(error.response.data.message);
                setMessage((message) => error.response.data.message)
            });
    }

    const handleSelection = (event) => {
        setSelectedUsername((selectedUsername) => event.target.id)
    }

    return (
        <div className="d-flex align-items-center pt-5 flex-column">
            <DropdownButton title="No Record Employees">
                {
                    usernameList.map((record) => {
                        return (
                            <Dropdown.Item id={record.username} onClick={handleSelection}>{record.username}</Dropdown.Item>
                        )
                    })
                }
            </DropdownButton>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="username">
                    <Form.Label>Employee Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={selectedUsername} disabled />
                </Form.Group>
                <Form.Group className="d-flex flex-column a ign-items-start mb-3 " controlId="salary">
                    <Form.Label>Employee Salary Per Month</Form.Label>
                    <Form.Control type="text" placeholder="Salary" />
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="bonus">
                    <Form.Label>Employee Bonus Per Year</Form.Label>
                    <Form.Control type="text" placeholder="Bonus" />
                </Form.Group>
                <SubmitButton btn_name={"Create"} btn_color={"danger"} />
                <Form.Text className="text-muted">
                    {message}
                </Form.Text>
            </Form>
        </div >
    );
}


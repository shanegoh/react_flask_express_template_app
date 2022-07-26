import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import '.././App.css';
import SubmitButton from '../component/SubmitButton';
import { getAccessToken } from '../util'

export default function EditDepartmentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('')

    const handleEditDepartment = (event) => {
        event.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('name', event.target[1].value);
        axios({
            method: "put",
            url: `http://localhost:5000/api/manager/updateDepartmentName/${id}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getAccessToken()}` },
        })
            .then((res) => {
                console.log(res.data.message)
                setMessage((message) => res.data.message)
                navigate('/manager')
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setMessage((message) => error.response.data.message)
            });
    }

    return (
        <div className="d-flex justify-content-center pt-5">
            <Form onSubmit={handleEditDepartment}>
                <Form.Group className="mb-3" controlId="departmcodeentCode">
                    <Form.Label>Department Code</Form.Label>
                    <Form.Control type="text" placeholder="Code" value={id} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departmentName">
                    <Form.Label>New Department Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <SubmitButton btn_name={'Update Department'} btn_color={'danger'} />
                <Form.Text className="text-muted">
                    {message}
                </Form.Text>
            </Form>
        </div >
    );
}


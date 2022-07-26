import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { processToken, isManager, isStaff } from '../util.js'
import SubmitButton from '../component/SubmitButton.js'
import '.././App.css';

export default function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('username', event.target[0].value);
        bodyFormData.append('password', event.target[1].value);
        axios({
            method: "post",
            url: "http://localhost:5000/api/login",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                processToken(res.data.accessToken)
                if (isManager())
                    navigate("/manager")
                else if (isStaff())
                    navigate("/staff")
                else
                    throw new Error('Could not identify new role.')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div class="d-flex justify-content-center pt-5">
            <Form onSubmit={handleSubmit} >
                <Form.Group className="d-flex flex-column align-items-start mb-3 " controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="d-flex flex-column align-items-start mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        We'll never ask for your password.
                    </Form.Text>
                </Form.Group>
                <SubmitButton btn_name={"Login"} btn_color={"primary"} />
            </Form>
        </div >
    );
}


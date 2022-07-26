import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { getAccessToken } from '../util';
import '.././App.css';

export default function DetailCard({
    header, title_1, title_2, text, image
}) {
    const [errorMessage, setErrorMessage] = useState([])

    const onUpload = (event) => {
        event.preventDefault()
        console.log(event.target[0].files[0])
        if (event.target[0].files[0] === undefined) {
            setErrorMessage((errorMessage) => 'No File Included')
        }
        else if (event.target[0].files[0].type === 'image/png' || event.target[0].files[0].type === 'image/jpg' || event.target[0].files[0].type === 'image/jpeg') {
            console.log('Valid File')
            var bodyFormData = new FormData();
            bodyFormData.append('image', event.target[0].files[0]);

            axios({
                method: "post",
                url: `http://localhost:5000/api/staff/uploadProfileImage`,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${getAccessToken()}` },
            })
                .then((res) => {
                    console.log(res.data.message)
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
        else
            setErrorMessage((errorMessage) => 'Invalid file type')
    }

    return (
        <Card className="text-dark w-100">
            <Card.Header as="h5">{header}</Card.Header>
            <Card.Body>
                {image != null ? <img className="imageSize" src={image} /> : ''}
                {header === 'Employee Information' ? <Form onSubmit={onUpload} >
                    <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg" />
                    </Form.Group>
                    <SubmitButton btn_color={'danger'} btn_name={'Upload'} />
                    <Form.Text className="text-muted">
                        {errorMessage}
                    </Form.Text>
                </Form> : <></>}
                <Card.Title>{title_1}</Card.Title>
                <Card.Title>{title_2}</Card.Title>
            </Card.Body>
        </Card>
    );
}
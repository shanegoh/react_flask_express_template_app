import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import SubmitButton from './SubmitButton'
import Button from 'react-bootstrap/Button';
import '.././App.css';
import { useNavigate } from "react-router-dom";

export default function DepartmentTable({ departmentList }) {
    const navigate = useNavigate()

    const handleAddDepartment = (event) => {
        event.preventDefault()
        navigate('/manager/addDepartment')
    }

    const handleEditDepartment = (event) => {
        event.preventDefault()
        console.log(event.target[0].id)
        navigate(`/manager/editDepartment/${event.target[0].id}`)
    }

    return (
        <Container className="square border">
            <Table bordered className="text-black bg-white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department Code</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departmentList.length > 0 ? departmentList.map((record) => {
                            return (
                                <tr key={record.dept_code}>
                                    <td>{record.id}</td>
                                    <td>{record.dept_code}</td>
                                    <td>{record.name}</td>
                                    <td>
                                        <Form onSubmit={handleEditDepartment}>
                                            <Button id={record.dept_code} variant='success' type="submit">
                                                Edit
                                            </Button>
                                        </Form></td>
                                </tr>
                            )
                        }) : <tr></tr>
                    }
                </tbody>
            </Table>
            <Form onSubmit={handleAddDepartment}>
                <SubmitButton btn_name={'Add Department'} btn_color={'primary'} />
            </Form>
        </Container>
    );
}
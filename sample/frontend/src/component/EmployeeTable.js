import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import DropdownList from './DropdownList'
import SubmitButton from './SubmitButton'
import { useNavigate } from 'react-router-dom'
import '.././App.css';

export default function EmployeeTable({ employeeList, departmentList, sendTargetID }) {
    const navigate = useNavigate()

    const getTargetID = (id) => {
        sendTargetID(id)
    }

    const handleCreateEmployeeAccount = (event) => {
        event.preventDefault()
        navigate('/manager/createEmployeeAccount')
    }
    return (
        <Container className="square border">
            <DropdownList departmentList={departmentList} updateTargetID={getTargetID} />
            <Table bordered className="text-black bg-white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeList.length > 0 ? employeeList.map((record) => {
                            return departmentList.map((deptRecord) => {
                                if (record.dept_code == deptRecord.dept_code)
                                    return (<tr key={deptRecord.dept_code}>
                                        <td>{record.id}</td>
                                        <td>{record.username}</td>
                                        <td>{deptRecord.name}</td>
                                        <td>{record.role === 1 ? 'Manager' : 'Staff'}</td>
                                        <td>{record.deleteFlag === 0 ? 'Active' : 'Inactive'}</td>
                                    </tr>)
                            })
                        }) : <td></td>
                    }
                </tbody>
            </Table>
            <Form onSubmit={handleCreateEmployeeAccount}>
                <SubmitButton btn_name={'Create Employee Account'} btn_color={'danger'} />
            </Form>
        </Container>
    );
}


import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import DropdownList from './DropdownList'
import SubmitButton from './SubmitButton'
import { useNavigate } from 'react-router-dom'
import '.././App.css';

export default function SalaryTable({ payoutInfo }) {
    const navigate = useNavigate()

    const handleCreateEmployeePayout = (event) => {
        event.preventDefault()
        navigate('/manager/createPayout')
    }

    return (
        <Container className="square border">
            <Table bordered className="text-black bg-white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Salary</th>
                        <th>Bonus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payoutInfo.map((record) => {
                            return (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.username}</td>
                                    <td>{record.salary}</td>
                                    <td>{record.bonus}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Form onSubmit={handleCreateEmployeePayout}>
                <SubmitButton btn_name={'Create Employee Payout'} btn_color={'danger'} />
            </Form>
        </Container>
    );
}


import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { getEmployeeID } from '../util'
import LogoutButton from './LogoutButton';
import { isManager } from '../util';

export default function Nav() {
    return (
        <Navbar >
            <Container className="bg-white">
                {isManager() ? <Navbar.Brand href="/manager">Manager Service Portal</Navbar.Brand>
                    : <Navbar.Brand href="/staff">Staff Service Portal</Navbar.Brand>}
                {isManager() ? <Navbar.Brand href="/manager/salary"><u>Manage Payout</u></Navbar.Brand> : <></>}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end gap-2">
                    <Navbar.Text>
                        Signed in as: {getEmployeeID()}
                    </Navbar.Text>
                    <Navbar.Text>
                        <LogoutButton />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
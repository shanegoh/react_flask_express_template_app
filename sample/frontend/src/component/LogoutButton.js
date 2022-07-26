import React from 'react';
import { removeAccessToken, removeEmployee_ID, removeRoleID } from '../util'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        removeAccessToken()
        removeEmployee_ID()
        removeRoleID()
        navigate('/')
    }

    return (
        <Button onClick={handleLogout} variant='danger' type="submit">
            Log Out
        </Button>
    );
}
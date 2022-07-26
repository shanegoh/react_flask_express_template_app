import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '.././App.css';

export default function Loading() {
    return (
        <Spinner className="bg-black" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}
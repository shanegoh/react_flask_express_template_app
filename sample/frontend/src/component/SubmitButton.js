import React from 'react';
import Button from 'react-bootstrap/Button';

export default function SubmitButton({ btn_name, btn_color }) {
    return (
        <Button className="w-100" variant={btn_color} type="submit">
            {btn_name}
        </Button>
    );
}
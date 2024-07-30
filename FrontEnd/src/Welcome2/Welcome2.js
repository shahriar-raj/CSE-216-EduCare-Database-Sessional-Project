import React from 'react';
import './Welcome2.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Welcome2 = (props) => {
    const navigate = useNavigate();
    return (
        <div className='th'>
            <Spinner animation="grow" />
            <img src='thank-you.png' width={"250px"} height={"250px"} />
            <Spinner animation="grow" />
            <h1 className='he'>Thank you.You have successfully completed the payment!</h1>
            <br />
            <Button variant="outline-danger" className="btn_wel" onClick={(e) => { navigate('/payment') }}>Back</Button>
        </div>
    )
}

export default Welcome2;
import React from 'react';
import './Welcome.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const Welcome = (props) => {
    const navigate=useNavigate();
    return (
        <div className='wel'>
            <Spinner animation="grow" />
            <img src='welcome-back.png' width={"250px"} height={"250px"} />
            <Spinner animation="grow" />
            <h1 className='h'>Welcome to EduCare</h1>
            <p className='par'>Your Unique ID is: <u>{props.data}</u>. Remember this ID and the given password to login</p>
            <Button variant="danger" onClick={(e)=>{navigate('/')}}>Back to Home</Button>
        </div>
    )
}

export default Welcome;
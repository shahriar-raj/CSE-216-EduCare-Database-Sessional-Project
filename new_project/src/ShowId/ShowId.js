import Button from 'react-bootstrap/Button';
import React from 'react';
//import './Admin.css';
import {useNavigate} from 'react-router-dom';

const ShowId = (props) => {
    const navigate=useNavigate();
    return (
        <div>
            <h1>Welcome to Educare</h1>
            <h1>Your id is: {props.data}</h1>
            <button type="submit" onClick={(e)=>{navigate('/')}}>Back To Home</button>;
        </div>
    )
}

export default ShowId;
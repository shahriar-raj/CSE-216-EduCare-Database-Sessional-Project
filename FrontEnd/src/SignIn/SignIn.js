import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Header from '../shared/components/Header';
import './SignIn.css';

 const SignIn = (props) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    //const [type, setType] = useState("Student");
    //setType('Student');

    const handleClick = (e) =>{
        e.preventDefault();

        console.log('button e click hoise');
    
        console.log(id);
        console.log(password);
        const msg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "password": password
            })
        };
        console.log(id);
        console.log(password);

        console.log('button e click hoise abar');
        fetch("http://localhost:4000/login",msg)
         .then(res => res.json())
           .then(data => {
          console.log('button e click hoise abar abar'); 
          console.log(data);
          if(!data){
            alert('Invalid Input!');
          }
          else {
              props.setData(id);
              navigate('/student');
            }
           });

}
    return (
        <div>
            <Header />
        <div className='sn'>
            <center><h1><u><b>Sign In</b></u></h1></center>
            <br />

            <FloatingLabel
                controlId="floatingID"
                label="User ID"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="ID" value={id} onChange={(e)=> {setId(e.target.value)}}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
            </FloatingLabel>
            <br />
            <div className="d-grid gap-2">
                <Button variant="success" size="lg"  onClick={(e) => {handleClick(e)}}>
                    Submit
                </Button>
            </div>
        </div>
        </div>
    )
}

export default SignIn;
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

 const O_SignIn = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Teacher");
    //setType('Student');

    const handleClick = (e) =>{
        e.preventDefault();

        console.log('button e click hoise');
    
        console.log(email);
        console.log(password);
        const msg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "type": type,
                "password": password
            })
        };
        console.log(email);
        console.log(password);

        console.log('button e click hoise abar');
        fetch("http://localhost:4000/o_login",msg)
         .then(res => res.json())
           .then(data => {
          console.log('button e click hoise abar abar'); 
          console.log(data.id);
          if(data.id === -1){
            alert('Invalid Input!');
          }
          else {
              props.setData(data.id);
              const num = data.id;

              console.log(num);
              const firstDigitStr = String(num)[0];
              console.log(firstDigitStr);

              const firstDigitNum = Number(firstDigitStr);
              if(firstDigitNum === 2){
                navigate('/teacher');
              }
              else if(firstDigitNum === 3){
                if(data.firstTime === 'No')
                  navigate('/institution');
                else{
                  navigate('/timesel');  
                }
              }
              else if(firstDigitNum === 4){
                navigate('/guardian');
              }
              else if(firstDigitNum === 5){
                console.log('Here');
                navigate('/admin');
              }
            
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
                label="User Email"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="EMAIL" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingSelectType"
                label="Login Type"
            >
                <Form.Select aria-label="Floating label select example" value={type} onChange={(e)=> {setType(e.target.value)}}>
                    {/* <option>Select Gender</option> */}
                    <option value="Teacher">Teacher</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Institution">Institution</option>
                    <option value="Admin">Admin</option>
                </Form.Select>
            </FloatingLabel>
            <br />
            <FloatingLabel controlId="floatingPassword" label="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}}>
                <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <br />
            <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={(e) => {handleClick(e)}}>
                    Submit
                </Button>
            </div>
        </div>
        </div>
    )
}

export default O_SignIn;
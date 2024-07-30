import Button from 'react-bootstrap/Button';
import React from 'react';
import Image from 'react-bootstrap/Image';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Admin = (props) => {
    const navigate=useNavigate();
    const [data, setData] = useState(""); 
    console.log("Props data in adminloginpage " + props.data);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": props.data,
        })
    };
    useEffect(() => {    
        fetch("http://localhost:4000/adminLogInInfo", msg)
        .then(res => res.json())
        .then(datum => {
            console.log('button e click hoise abar abar');
            //console.log(data.name);
            //adminname=data.rows[0].NAME;
            setData(datum.rows[0]);
        })}, []);
        const handleClick = (e) =>{
            e.preventDefault();
            navigate('/institution_list');
        }
    return (
        <div>
            <div className='left'>
                <h1 className='Header'><u>Admin</u></h1>
                <br />
                <Image src="admin.png" width={"100px"} height={"100px"} />
                <br />
                <br />
                <h4 className='hj'><u>Name:</u> {data.NAME}</h4>
                <h4 className='hj'><u>Admin Id:</u> {data.ID}</h4>
                <h4 className='hj'><u>Contact:</u> {data.CONTACT}</h4>
                <h4 className='hj'><u>Email:</u> {data.EMAIL}</h4>
                <br />
                <br />
                <br />
                <Button variant="danger" size="lg" onClick={(e) => navigate('/')}>
                    Log Out
                </Button>
            </div>
            <div className='right'>
                <Image src="school1.png" width={"400px"} height={"400px"} />
                <br />
                <br />
                <br />
                <Button variant="primary" size="lg" onClick={(e) => {handleClick(e)}}>
                    Added Institutions
                </Button>
            </div>
        </div>
    )
}

export default Admin;
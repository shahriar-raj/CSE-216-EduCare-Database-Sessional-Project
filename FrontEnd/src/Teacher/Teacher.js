import Button from 'react-bootstrap/Button';
import React from 'react';
import Image from 'react-bootstrap/Image';
import './Teacher.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Teacher = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    //console.log("Props data in loginpage " + props.data);
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
        fetch("http://localhost:4000/teacherLogInInfo", msg)
            .then(res => res.json())
            .then(datum => {
                console.log('button e click hoise abar abar');
                //console.log(data.name);
                //adminname=data.rows[0].NAME;
                setData(datum.rows[0]);
            })
    }, []);
    return (
        <div>
            <div className='leftT'>
                <h1 className='Header'><u>Teacher</u></h1>
                <br />
                <Image src="teacher.png" width={"100px"} height={"100px"} />
                <br />
                <br />
                <h4 className='hj'><u>Name:</u> {data.NAME}</h4>
                <h4 className='hj'><u>Id:</u> {data.ID}</h4>
                <h4 className='hj'><u>Contact:</u> {data.CONTACT}</h4>
                <h4 className='hj'><u>Email:</u> {data.EMAIL}</h4>
                <h4 className='hj'><u>Gender:</u> {data.GENDER}</h4>
                <h4 className='hj'><u>Address:</u> {data.ADRESS}</h4>
                <br />
                <br />
                <br />
                <Button variant="danger" size="lg" onClick={(e) => navigate('/')}>
                    Log Out
                </Button>
            </div>
            <div className='rightT'>
                <br />
                <br />
                <br />
                <Button variant="dark" className='btnt' onClick={(e) => navigate('/classes_t')}>
                    Classes
                    <hr></hr>
                    &nbsp;&nbsp; Here you can see the classes you teach &nbsp;&nbsp;
                </Button>
            </div>
        </div>
    )
}

export default Teacher;
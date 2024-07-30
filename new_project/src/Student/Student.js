import Button from 'react-bootstrap/Button';
import React from 'react';
import Image from 'react-bootstrap/Image';
import './Student.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Student = (props) => {
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
        fetch("http://localhost:4000/studentLogInInfo", msg)
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
            <div className='lefts'>
                <h1 className='Header'><u>Student</u></h1>
                <br />
                <Image src="student.png" width={"100px"} height={"100px"} />
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
            <div className='rights'>
                <Button variant="dark" className='btng' onClick={(e) => navigate('/routine_s')}>
                    <b>Routine</b>
                    <hr></hr>
                    &nbsp;&nbsp;&nbsp;&nbsp;Here you can see your class routine&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                <br />
                <br />
                <br />
                <Button variant="dark" className='btng' onClick={(e) => navigate('/dues_s')}>
                    <b>Dues</b>
                    <hr></hr>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here you can see your dues&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                <br />
                <br />
                <br />
                <Button variant="dark" className='btng' onClick={(e) => navigate('/result_s')}>
                    <b>Result</b>
                    <hr></hr>
                    &nbsp;&nbsp;&nbsp;&nbsp;Here you can see your class routine&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                <br />
                <br />
                <br />
                <Button variant="dark" className='btng' onClick={(e) => navigate('/attendance_s')}>
                    <b>Attendance</b>
                    <hr></hr>
                    &nbsp;Here you can see your class attendance&nbsp;
                </Button>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default Student;
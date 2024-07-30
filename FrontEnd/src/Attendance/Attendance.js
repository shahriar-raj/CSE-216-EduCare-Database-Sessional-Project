import React, { useState } from 'react';
import './Attendance.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Attendance = (props) => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    //const students = [{ id: 10001, roll: 1, name: "Abul" }, { id: 10002, roll: 2, name: "Bodi" }, { id: 10003, roll: 3, name: "Chandler" }, { id: 10004, roll: 4, name: "Daya" }];
    let [Student_A, setStudent_A] = useState([]);
    const [assigned, setAssigned] = useState(false);
    const [count, setCount] = useState(0);
    // for (let i = 0; i < students.length && !assigned; i++) {
    //     const newstudent = {
    //         id: students[i].id,
    //         roll: students[i].roll,
    //         name: students[i].name,
    //         status: "P",
    //         date: ""
    //     }
    //     Student_A.push(newstudent);
    //     setAssigned(true);
    // }

    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "classid": props.data.classid
        })
    };

    const handleClick = (e) =>{
        const student=[];
        console.log(Student_A);
        for(let i=0;i<Student_A.length;i++){
            if(student.length >= Student_A.length){
              break;
            }
           const newStudent={
            id: Student_A[i].id,
            present: Student_A[i].status,
            date: Student_A[i].date
           }
           student.push(newStudent);
        }
        console.log(student);
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "classid": props.data.classid,
                "subject": props.data.subject,
                "student": student
            })
        };
        fetch("http://localhost:4000/updateattendance", msg1)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            navigate('/class_t_ins');
        })
    }

    useEffect(() => {
        fetch("http://localhost:4000/getstudentsformarks", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for (let i = 0; i < datum.rows.length && !assigned; i++) {
                if (Student_A.length >= datum.rows.length) {
                    break;
                }
                const newstudent = {
                    id: datum.rows[i].ID,
                    roll: datum.rows[i].ROLLNO,
                    name: datum.rows[i].NAME,
                    status: "P",
                    date: ""
                }
                Student_A.push(newstudent);
                setAssigned(true);
            }
        })    
    },[]);
    if(assigned){
    return (
        <div className='attT'>
            <br />
            <h1 className='HAT'><u><b>Attendance Sheet</b></u></h1>
            <br />
            <br />
            <Form className='DAT'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Pick The Date"
                    className="mb-3"
                >
                    <Form.Control type="date" placeholder="Date" onChange={(e) => { setDate(e.target.value); }} />
                </FloatingLabel>
            </Form>
            <br />
            <center>
                <p className="PA">(Tick The Absent Students)</p>
            </center>
            <div className='countmeterAtt'>
                <Badge bg="danger" className='SCAT'>Absent Student Count: <b><u>{count}</u></b></Badge>
            </div>
            <br />
            {Student_A.map(student => {
                return (
                    <>
                        <Badge bg="dark" className='bdgA'>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    id="custom-switch"
                                    key={student.id}
                                    className=""
                                    label={"  " + student.roll + ".   " + student.name}
                                    onChange={(e) => {
                                        if (student.status === 'P') {
                                            student.status = 'A';
                                            setCount(count + 1);
                                        }
                                        else {
                                            student.status = 'P';
                                            setCount(count - 1);
                                        }
                                    }}
                                />
                            </Form>
                        </Badge>
                        <br />
                        <br />
                    </>
                )
            })}
            <br />
            <Row className='RAST'>
                <Col md className='RASTL'>
                    <Button variant="danger" size="lg" onClick={(e) => { navigate('/class_t_ins'); }}>Back</Button>
                </Col>
                <Col md className='RASTR'>
                    <Button variant="success" size="lg" onClick={(e) => {
                        if (date === "") {
                            alert("Pick a date");
                        }
                        else {
                            for (let i = 0; i < Student_A.length; i++) {
                                Student_A[i].date = date;
                            }
                            console.log({ Student_A });
                            handleClick(e);
                        }
                    }}>
                        Submit</Button>
                </Col>
            </Row>
        </div>
    )
}
}

export default Attendance;
import React, { useState } from 'react';
import './Remove_S.css';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Remove_S = (props) => {
    const navigate = useNavigate();
    //const students = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }, { id: 4, name: 'D' }, { id: 5, name: 'E' }, { id: 6, name: 'F' }];
    let [count, setCount] = useState(0);
    let [Students, setStudent] = useState([]);
    let [assigned, setAssigned] = useState(false)
    // let [count, setCount] = useState(0);
    // let [Students, setStudent] = useState([]);
    // let [assigned, setAssigned] = useState(false);
    const students = [];
    const SubmitHandler = event => {
        const removedStudents = [];
        for (let i = 0; i < Students.length; i++) {
            if (Students[i].check) {
                const newStudent2 = {
                    id: Students[i].id
                }
                removedStudents.push(newStudent2);
            }
        }
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "classid": props.data,
                "student": removedStudents
            })
        };
        fetch("http://localhost:4000/removestudentsfromclass", msg1)
            .then(res => res.json())
            .then(datum1 => {
                console.log(datum1);
                navigate('/classesinside');
            })
    }
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": props.data
        })
    };
    useEffect(() => {

        fetch("http://localhost:4000/getstudentsfromclass", msg)
            .then(res => res.json())
            .then(datum1 => {
                console.log(datum1);
                for (let i = 0; i < datum1.rows.length; i++) {
                    if (students.length >= datum1.rows.length) {
                        break;
                    }
                    const newStudent1 = {
                        id: datum1.rows[i].ID,
                        name: datum1.rows[i].NAME
                    }
                    students.push(newStudent1);
                }
                for (let i = 0; i < students.length && !assigned; i++) {
                    if (Students.length >= datum1.rows.length) {
                        break;
                    }
                    const newStudent = {
                        id: students[i].id,
                        name: students[i].name,
                        check: false
                    }
                    Students.push(newStudent);
                    setAssigned(true);
                }
            })
    }, []);

    return (
        <div className='RSB'>
            <div className='stl1'>
                <h1><b><u>Remove Students from Class</u></b></h1>
                <br />
                {Students.map(student => {
                    return (
                        <div >
                            <Badge bg="dark" className="bdgstl">
                                <Form.Check
                                    inline
                                    label={student.id + " - " + student.name}
                                    name={student.id}
                                    type='checkbox'
                                    id={student.id}
                                    onChange={(e) => {
                                        if (student.check === false) {
                                            student.check = true;
                                            count = count + 1;
                                            setCount(count);
                                            console.log(Students);
                                            console.log(count);
                                        }
                                        else {
                                            student.check = false;
                                            count = count - 1;
                                            setCount(count);
                                            console.log(Students);
                                            console.log(count);
                                        }
                                    }}
                                />
                            </Badge>
                            <br />
                            <br />
                        </div>
                    )
                })}
                <br />
                <Row className='RASS'>
                    <Col md>
                        <Button variant="danger" size="lg" onClick={(e) => { console.log({ Students }); navigate('/classesinside'); }}>Back</Button>
                    </Col>
                    <Col md>
                        <Button variant="success" size="lg" onClick={(e) => { SubmitHandler(e) }}>Submit</Button>
                    </Col>
                </Row>
            </div>
            <div className='countmeter1'>
                <Badge bg="dark" className='SC1'>Remove Student Count: <b><u>{count}</u></b></Badge>
            </div>

        </div>
    )
}

export default Remove_S;
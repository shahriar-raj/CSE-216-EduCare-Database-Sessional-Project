import React, { useState } from 'react';
import './Student_Select.css';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Student_Select = (props) => {
    //const students = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }, { id: 4, name: 'D' }, { id: 5, name: 'E' }, { id: 6, name: 'F' }];
    let [count, setCount] = useState(0);
    let [Students, setStudent] = useState([]);
    let [assigned, setAssigned] = useState(false);
    const students = [];
    const navigate = useNavigate();
    const SubmitHandler = event => {
        const addedStudents = [];
        for (let i = 0; i < Students.length; i++) {
            if (Students[i].check) {
                const newStudent2 = {
                    id: Students[i].id,
                    roll: Students[i].roll
                }
                addedStudents.push(newStudent2);
            }
        }
        let bool1 = true, k = -1, l = -1;
        for (let i = 0; i < addedStudents.length; i++) {
            for (let j = i + 1; j < addedStudents.length; j++) {
                if (addedStudents[i].roll === addedStudents[j].roll) {
                    bool1 = false;
                    k = i;
                    l = j;
                    break;
                }
            }
            if (!bool1)
                break;
        }
        if (!bool1) {
            alert('Student Id: ' + addedStudents[k].id + ' and Student Id: ' + addedStudents[l].id + ' have the same roll number!');
        }
        else {
            const msg1 = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "classid": props.data,
                    "student": addedStudents
                })
            };
            fetch("http://localhost:4000/addstudentstoclass", msg1)
                .then(res => res.json())
                .then(datum1 => {
                    console.log(datum1);
                    navigate('/routine');
                })
        }
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

        fetch("http://localhost:4000/getavailablestudentsfromclass", msg)
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
                        roll: "",
                        check: false
                    }
                    Students.push(newStudent);
                    setAssigned(true);
                }
            })
    }, []);
    // for (let i = 0; i < students.length && !assigned; i++) {
    //     const newStudent = {
    //         id: students[i].id,
    //         name: students[i].name,
    //         check: false
    //     }
    //     Students.push(newStudent);
    //     setAssigned(true);
    // }
    return (
        <div>
            <div className='stl'>
                <h1><b><u>Add Students to Class</u></b></h1>
                <br />
                {Students.map(student => {
                    return (
                        <div >
                            <Badge bg="secondary" className="bdgstl">
                                <Row className="g-2">
                                    <Col md>
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
                                    </Col>
                                    <Col md>
                                        <FloatingLabel controlId="floatingRoll" label="Set Roll" className='why'>
                                            <Form.Control type="number" placeholder="Roll" onChange={(e) => { student.roll = (e.target.value) }} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Badge>
                            <br />
                            <br />
                        </div>
                    )
                })}
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={(e) => { SubmitHandler(e) }}>Submit</Button>
                </div>
            </div>
            <div className='countmeter'>
                <Badge bg="secondary" className='SC'>Student Count: <b><u>{count}</u></b></Badge>
            </div>

        </div>
    )
}

export default Student_Select;
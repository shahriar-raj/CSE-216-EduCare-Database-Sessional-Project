import React, { useState } from 'react';
import './Student_Select.css';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Student_Select = (props) => {
    const students = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }, { id: 4, name: 'D' }, { id: 5, name: 'E' }, { id: 6, name: 'F' }];
    let [count, setCount] = useState(0);
    let [Students, setStudent] = useState([]);
    let [assigned, setAssigned] = useState(false);
    for (let i = 0; i < students.length && !assigned; i++) {
        const newStudent = {
            id: students[i].id,
            name: students[i].name,
            roll: "",
            check: false
        }
        Students.push(newStudent);
        setAssigned(true);
    }
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
                    <Button variant="success" size="lg" onClick={(e) => { console.log({ Students }) }}>Submit</Button>
                </div>
            </div>
            <div className='countmeter'>
                <Badge bg="secondary" className='SC'>Student Count: <b><u>{count}</u></b></Badge>
            </div>

        </div>
    )
}

export default Student_Select;
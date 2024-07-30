import React, { useState } from 'react';
import './Update_T.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Update_T = (props) => {
    let [subject, setSub] = useState("Bangla");
    let [teacher, setT] = useState(30001);
    const Subjects = ["Bangla", "English", "Math", "Science"];
    const Teachers = [{ id: 30001, name: "AB" }, { id: 30002, name: "CD" }, { id: 30003, name: "EF" }];
    const navigate = useNavigate();
    const savehandler = (e) => {
        e.preventDefault();
        console.log(subject);
        console.log(teacher);
        navigate('/classesinside');
    }
    return (
        <div className='UT'>
            <br />
            <br />
            <h1 className='HUT'><u><b>Update Teacher</b></u></h1>
            <br />
            <br />
            <Form>
                <Row className="g-2UT">
                    <Col md>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Select Subject"
                        >
                            <Form.Select aria-label="Floating label select example" onChange={(e) => { setSub(e.target.value); }}>
                                {Subjects.map(subject => {
                                    return <option value={subject}>{subject}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Select Teacher"
                        >
                            <Form.Select aria-label="Floating label select example" onChange={(e) => { setT(e.target.value); }}>
                                {Teachers.map(teacher => {
                                    return <option value={teacher.id}>{teacher.id} - {teacher.name}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>
            <br />
            <br />
            <Row className="g-2UT_">
                <Col md>
                    <Button variant="danger" onClick={(e) => { navigate('/classesinside'); }}>
                        Back
                    </Button>
                </Col>
                <Col md>
                    <Button variant="success" onClick={savehandler}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Update_T;
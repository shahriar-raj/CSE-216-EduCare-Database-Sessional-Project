import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ClassReg.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassReg = (props) => {
    let standards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [RoomNo, setRoomNo] = useState();
    const [Section, setSection] = useState("");
    const [Standard, setStandard] = useState(1);
    const [Division, setDivision] = useState("Not Applicable");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        console.log('button e click hoise');
        const msg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "roomno": RoomNo,
                "section": Section,
                "standard": Standard,
                "division": Division,
                "institution_id": props.data
            })
        };
        fetch("http://localhost:4000/ClassSignUp", msg)
            .then(res => res.json())
            .then(data => {
                console.log('button e click hoise abar abar');
                console.log(data);
                if(!data.done){
                   alert('This room is already assigned or class section name is taken!');
                }
                else {
                    props.setData(data.id);
                    navigate('/subjectsel');
                }
            });
    }
    return (
        <div className='form_c'>
            <h1><u><b>Class Register</b></u></h1>
            <br />
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingInputStandard" label="Standard">
                        <Form.Select aria-label="Default select example" onChange={(e) => { setStandard(e.target.value) }}>
                            {standards.map(stn => {
                                return <option value={stn}>{stn}</option>;
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingSection" label="Section">
                        <Form.Control type="text" placeholder="Section" onChange={(e) => { setSection(e.target.value) }} />
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <Row className="g-3">
                <Col>
                    <FloatingLabel controlId="floatingRoom" label="Room Number">
                        <Form.Control type="number" placeholder="Room" onChange={(e) => { setRoomNo(e.target.value) }} />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingInputDivision" label="Division">
                        <Form.Select aria-label="Default select example" onChange={(e) => { setDivision(e.target.value) }}>
                            <option value="Not Applicable">Not Applicable</option>;
                            <option value="Science">Science</option>;
                            <option value="Commerce">Commerce</option>;
                            <option value="Arts">Arts</option>;
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={(e) => { handleClick(e) }}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default ClassReg;
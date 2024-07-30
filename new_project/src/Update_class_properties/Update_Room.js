import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Update_Room.css';
import { useNavigate } from 'react-router-dom';

const Update_Room = (props) => {
    const navigate = useNavigate();
    const [RoomNo, setRoomNo] = useState("");
    const handleClick = (e) => {
        console.log(RoomNo);
        const msg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "classid": props.data,
                "roomno": RoomNo
            })
        };
        fetch("http://localhost:4000/updateroomnoverify", msg)
            .then(res => res.json())
            .then(data => {
                //console.log('button e click hoise abar abar');
                console.log(data);
                if (data) {
                    navigate('/classesinside');
                }
                else{
                    alert('This room is alreday assigned!');
                }
            })
    }
    return (
        <>
            <br />
            <br />
            <center>
                <h1><u><b>Update Room</b></u></h1>
                <br />
            </center>
            <div className='RUR'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Room Number"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="name" onChange={(e) => { setRoomNo(e.target.value) }} />
                </FloatingLabel>
            </div>
            <br />
            <Row className='RAS'>
                <Col md>
                    <Button variant="danger" onClick={(e) => { navigate('/classesinside'); }}>Back</Button>
                </Col>
                <Col md>
                    <Button variant="success" onClick={(e) => { handleClick(e) }}>Submit</Button>
                </Col>
            </Row>
        </>
    )
}

export default Update_Room;
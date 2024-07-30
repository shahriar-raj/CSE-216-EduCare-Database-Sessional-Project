import React, { useState } from 'react';
import './Individual.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';

const Individual = (props) => {
    const [ID, setID] = useState(0);
    const [Type, setType] = useState("Fine");
    const [Des, setDes] = useState("");
    const [Amount, setAmount] = useState(0);
    const navigate=useNavigate();
    const SubmitHandler = event => {
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "institutionid": props.data,
                "studentid": ID,
                "duetype": Type,
                "description": Des,
                "amount": Amount
            })
        };
        fetch("http://localhost:4000/addduestoindividual", msg1)
            .then(res => res.json())
            .then(datum1 => {
                console.log(datum1);
                if(!datum1){
                    alert('Student with this id does not exist in the institution!')
                }
                else {
                    navigate('/institution');
                }
            })
    }
    return (
        <>
            <div className='middleid'>
                <h1 className='HeadiD'><b><u>Assign Individual Fees</u></b></h1>
                <br />
                <br />
                <FloatingLabel controlId="floatingInputID" label="Student ID">
                    <Form.Control type="number" placeholder="ID" onChange={(e) => { setID(e.target.value) }} />
                </FloatingLabel>
                <br />
                <FloatingLabel controlId="floatingInputType" label="Fees Type">
                    <Form.Select aria-label="Default select example" onChange={(e) => { setType(e.target.value) }}>
                        <option value="Fine">Fine</option>
                        <option value="Late Fees">Late Fees</option>
                        <option value="Transportation Fees">Transportation Fees </option>
                    </Form.Select>
                </FloatingLabel>
                <br />
                <FloatingLabel controlId="floatingInputDescription" label="Description">
                    <Form.Control type="text" placeholder="Description" onChange={(e) => { setDes(e.target.value) }} />
                </FloatingLabel>
                <br />
                <FloatingLabel controlId="floatingInputAmount" label="Amount">
                    <Form.Control type="number" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} />
                </FloatingLabel>
                <br />
                <br />
                <div className='mid1id'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="danger" onClick={(e) => { navigate('/dues') }}>Back</Button>
                </div>
                <div className='mid2id'>
                    <Button variant="success" onClick={(e) => {SubmitHandler(e)}}>Submit</Button>
                </div>
            </div>
        </>
    )
}

export default Individual;
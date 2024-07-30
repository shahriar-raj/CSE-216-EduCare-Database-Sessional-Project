import React, { useEffect, useState } from 'react';
import './DuePayment.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';

const DuePayment = (props) => {
    const navigate = useNavigate();
    //const Dues_ = [{ id: 101, type: "Exam Fees", des: "2022", amount: 2000 }, { id: 102, type: "Annual Fees", des: "2022", amount: 10000 }, { id: 103, type: "Monthly fees", des: "April", amount: 1000 }, { id: 104, type: "Monthly fees", des: "July", amount: 1000 },]
    const [Dues, setDue] = useState([]);
    //const Dues_=[];
    const [OTP, setOTP] = useState("");
    const [id, setID] = useState(-1);
    const [assigned, setAssigned] = useState(false);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "guardianid": props.data
        })
    };
    useEffect(() => {
        console.log("Hello I am here");
        fetch("http://localhost:4000/getduesfromguardian", msg)
            .then(res => res.json())
            .then(datum => {
                console.log(datum);

                for (let i = 0; i < datum.rows.length; i++) {
                    if(Dues.length >= datum.rows.length){
                        break;
                    }
                    console.log("hello1");
                    const newDue = {
                        id: datum.rows[i].ID,
                        type: datum.rows[i].DUETYPE,
                        Des: datum.rows[i].DESCRIPTION,
                        Amount: datum.rows[i].AMOUNT
                    }
                    Dues.push(newDue);
                    setAssigned(true);
                }
                // for (let i = 0; i < Dues_.length && !assigned; i++) {
                //     console.log("hello");
                //     const newDue = {
                //         id: Dues_[i].id,
                //         type: Dues_[i].type,
                //         Des: Dues_[i].des,
                //         Amount: Dues_[i].amount,
                //     }
                //     Dues.push(newDue);
                //     setAssigned(true);
                // }
            })
    },[]);

    const paymentHandler = (e) => {
        console.log(id);
        console.log(OTP);
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "dueid": id,
                "otp": OTP
            })
        };
        fetch("http://localhost:4000/verifyotp", msg1)
            .then(res => res.json())
            .then(datum => {
                console.log(datum);
                if(datum){
                   navigate('/welcome2');
                }
                else{
                   alert('Invalid OTP'); 
                }
                
            })
    }

    return (
        <div className="dp">
            <br />
            <br />
            <h1 className='headdp'><u><b>Dues</b></u> </h1>
            <br />
            {Dues.map(due => {
                if (id != due.id) {
                    return (
                        <div className='dp_li'>
                            <Card
                                bg={'dark'}
                                key={'Primary'}
                                text={'white'}
                                style={{ width: '50rem' }}
                                className="mb-2"
                            >
                                <Card.Header><u><b>Due ID:</b></u>&nbsp;&nbsp; {due.id}</Card.Header>
                                <Card.Body>
                                    <Card.Title><u><b>Type:</b></u>&nbsp;&nbsp; {due.type} </Card.Title>
                                    <Card.Text>
                                        <div className='dp_l'>
                                            <b><u>Description:</u></b>&nbsp;&nbsp; {due.Des}
                                            <br />
                                            <b><u>Amount:</u></b>&nbsp;&nbsp; {due.Amount} taka
                                        </div>
                                        <div className='dp_r'>
                                            <Button variant="outline-success" className='btn_dp' onClick={(e) => { setID(due.id); setOTP(""); }}>Pay</Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    )
                }
                else {
                    return (
                        <div className='dp_li'>
                            <Card
                                bg={'dark'}
                                key={'Primary'}
                                text={'white'}
                                style={{ width: '50rem' }}
                                className="mb-2"
                            >
                                <Card.Header><u><b>Due ID:</b></u>&nbsp;&nbsp; {due.id}</Card.Header>
                                <Card.Body>
                                    <Card.Title><u><b>Type:</b></u>&nbsp;&nbsp; {due.type} </Card.Title>
                                    <Card.Text>
                                        <div className='dp_l'>
                                            <b><u>Description:</u></b>&nbsp;&nbsp; {due.Des}
                                            <br />
                                            <b><u>Amount:</u></b>&nbsp;&nbsp; {due.Amount} taka
                                        </div>
                                        <div className='dp_r'>

                                            <FloatingLabel
                                                controlId="floatingOTP"
                                                label="Enter OTP"
                                                className="mb-3_d"
                                            >
                                                <Form.Control className="f_dp" type="text" placeholder="OTP" value={OTP} onChange={(e) => { setOTP(e.target.value) }} />
                                            </FloatingLabel>
                                            <div className='dp_r1'>
                                                <CloseButton variant='white' onClick={(e) => { setID(-1); }} />
                                            </div>
                                            <div className='dp_r2'>
                                                <Button variant="outline-success" className='btn_dp_s' onClick={paymentHandler}>Ok</Button>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    )
                }
            })}
            <Button variant="outline-dark" className='btn_b_dp' onClick={(e) => { navigate('/guardian'); }}>Back</Button>
        </div>
    )
}

export default DuePayment;
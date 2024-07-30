import React, { useState } from 'react';
import './Dues.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dues = (props) => {
    //const ClassID = [{ id: 10001, standard: 6, section: 'A' }, { id: 10002, standard: 7, section: 'A' }, { id: 10003, standard: 8, section: 'B' }, { id: 10004, standard: 6, section: 'B' }, { id: 10005, standard: 9, section: 'A' }];
    //let [classes,setClasses] = useState([]);
    let [classes, setClass] = useState([]);
    const [Type, setType] = useState("Monthly Fees");
    const [Des, setDes] = useState("");
    const [Amount, setAmount] = useState(0);
    let [assigned, setAssigned] = useState(false);
    const navigate=useNavigate();
    const ClassID=[];
    const SubmitHandler = event =>{
        console.log(classes);
        console.log(Amount);
        console.log(Type);
        console.log(Des);
        const selectedClasses=[];
        for(let i = 0; i < classes.length; i++){
            if (classes[i].check) {
                selectedClasses.push(classes[i].id);
            }
        }
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "institutionid": props.data,
                "classid": selectedClasses,
                "type": Type,
                "amount": Amount,
                "description": Des 
            })
        };
        fetch("http://localhost:4000/assignduestoclasses", msg1)
                .then(res => res.json())
                .then(datum1 => {
                    console.log(datum1);
                    navigate('/institution');
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

        fetch("http://localhost:4000/getclassesinfo", msg)
        .then(res => res.json())
        .then(datum1 => {
            console.log(datum1);
            for(let i=0;i<datum1.rows.length;i++){
                if(ClassID.length >= datum1.rows.length){
                   break; 
                }
                const newClass1 = {
                    id: datum1.rows[i].ID,
                    standard: datum1.rows[i].STANDARD,
                    section: datum1.rows[i].SECTION
                }
                ClassID.push(newClass1);
             }
             for (let i = 0; i < ClassID.length && !assigned; i++) {
                if(classes.length >= datum1.rows.length){
                    break; 
                 }
                const newClass = {
                    id: ClassID[i].id,
                    standard: ClassID[i].standard,
                    section: ClassID[i].section,
                    check: false
                }
                classes.push(newClass);
                setAssigned(true);
            }
        })
    }, []);
    // for (let i = 0; i < ClassID.length && !assigned; i++) {
    //     const newClass = {
    //         id: ClassID[i].id,
    //         standard: ClassID[i].standard,
    //         section: ClassID[i].section,
    //         check: false
    //     }
    //     classes.push(newClass);
    //     setAssigned(true);
    // }
    return (
        <>
            <div className='left1d'>
                <h4><b>Select Class</b></h4>
                <br />
                {classes.map(class_ => {
                    return (
                        <div>
                            <Form.Check
                                inline
                                label={"(" + class_.id + ")-" + class_.standard + class_.section}
                                name={class_.id}
                                type='checkbox'
                                id={class_.id}
                                onChange={(e) => {
                                    if (class_.check === false) {
                                        class_.check = true;
                                        console.log(classes);
                                    }
                                    else {
                                        class_.check = false;
                                        console.log(classes);
                                    }
                                }} />
                            <br />
                            <br />
                        </div>
                    )
                })}

            </div>
            <div className='middled'>
                <h1 className='HeadD'><b><u>Assign Fees</u></b></h1>
                <br />
                <br />
                <FloatingLabel controlId="floatingInputType" label="Fees Type">
                    <Form.Select aria-label="Default select example" onChange={(e) => { setType(e.target.value) }}>
                        <option value="Monthly Fees">Monthly Fees</option>
                        <option value="Annual Fees">Annual Fees</option>
                        <option value="Exam Fees">Exam Fees </option>
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
                <div className='mid1d'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="danger" onClick={(e) => { navigate('/institution') }}>Back</Button>
                </div>
                <div className='mid2d'>
                    <Button variant="success" onClick={(e) => {SubmitHandler(e)}}>Submit</Button>
                </div>
            </div>
            <div className='rightd'>
                <Button variant="dark" className='btnd' onClick={(e) => { navigate('/dueslist') }}>
                    Unpaid Dues
                    <hr></hr>
                    Here you can see all the unpaid dues
                </Button>
                <br />
                <br />
                <br />
                <br />
                <Button variant="dark" className='btnd' onClick={(e) => { navigate('/individual') }}>
                    Individual Fees
                    <hr></hr>&nbsp;
                    Here you can assign individual fees
                    &nbsp;
                </Button>
            </div>
        </>
    )
}

export default Dues;
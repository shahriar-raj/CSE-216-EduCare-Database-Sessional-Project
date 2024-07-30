import React, { useState } from 'react';
import './Result_T.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Result_CT = (props) => {
    const navigate = useNavigate();
    //const Students = [{ id: 101, roll: 1, name: "A" }, { id: 103, roll: 2, name: "B" }, { id: 102, roll: 3, name: "C" }];
    let [assigned, setAssigned] = useState(false);
    let [assignedM, setAssignedM] = useState(false);
    let [Students_M, setStudent] = useState([]);

    // for (let i = 0; i < Students.length && !assignedM; i++) {
    //     const new_S = {
    //         i: i,
    //         id: Students[i].id,
    //         roll: Students[i].roll,
    //         name: Students[i].name,
    //         marks: 0
    //     }
    //     Students_M.push(new_S);
    //     setAssignedM(true);
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

    useEffect(() => {
        fetch("http://localhost:4000/getstudentsformarks", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for (let i = 0; i < datum.rows.length && !assignedM; i++) {
                if(Students_M.length >= datum.rows.length){
                   break; 
                }
                const new_S = {
                    i: i,
                    id: datum.rows[i].ID,
                    roll: datum.rows[i].ROLLNO,
                    name: datum.rows[i].NAME,
                    marks: 0
                }
                Students_M.push(new_S);
                setAssignedM(true);
            }
        })    
    },[]);

    const handleClick = (e) =>{
        const student=[];
        console.log(Students_M);
        for(let i=0;i<Students_M.length;i++){
            if(student.length >= Students_M.length){
              break;
            }
           const newStudent={
            id: Students_M[i].id,
            marks: Students_M[i].marks
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
        fetch("http://localhost:4000/updatectmarks", msg1)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            navigate('/class_t_ins');
        })
    }

    if(assignedM){
    return (
        <div className='RTD'>
            <br />
            <h1 className='HeadRT'><u><b>Class Test Marks</b></u></h1>
            <br />
            <br />
            <Row className='FM'>
                <Col md>
                    <h3 className='Head2RT'><u> Full Marks: 30</u></h3>
                </Col>
            </Row>
            <br />
            <br />
            {Students_M.map(student => {
                return (
                    <>
                        <div className='RTleft'>
                            <Row>
                                <Col md>
                                    <Badge bg="dark" className="bdgr">Roll: {student.roll}, Name: {student.name}</Badge>
                                </Col>
                                <Col md>
                                    <Form.Control type="number" placeholder="Marks" className='boxF' onChange={(e) => student.marks = (e.target.value)} />
                                </Col>
                            </Row>
                            <br />
                        </div>
                    </>
                )
            })}
            <br />
            <Row className='RAST'>
                <Col md className='RASTL'>
                    <Button variant="outline-danger" size="lg" onClick={(e) => { navigate('/class_t_ins'); }}>Back</Button>
                </Col>
                <Col md className='RASTR'>
                    <Button variant="outline-success" size="lg" onClick={(e) => { handleClick(e) }}>Submit</Button>
                </Col>
            </Row>
        </div>
    )
}
}

export default Result_CT;
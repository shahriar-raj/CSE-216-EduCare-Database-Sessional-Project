import React from 'react';
import './Classes_T.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Classes_T = (props) => {
    const navigate = useNavigate();
    //const Classes = [{ standard: 6, id: 30001, room: 103, section: "A", division: "Not Applicable", subject: "Science" }, { standard: 8, id: 30019, room: 105, section: "C", division: "Not Applicable", subject: "Math" },
    //{ standard: 10, id: 30008, room: 107, section: "A", division: "Science", subject: "Physics" }, { standard: 9, id: 30004, room: 109, section: "A", division: "Science", subject: "Physics" },
    //];
    const [bool1,setBool1]=useState(false);
    const [Classes,setClasses]=useState([]);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "teacherid": props.data
        })
    };
    useEffect(() => {
        fetch("http://localhost:4000/getclassfromteacher", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for(let i=0;i<datum.rows.length;i++){
                if(Classes.length >= datum.rows.length){
                    break;
                }
                const newClass={
                    standard: datum.rows[i].STANDARD,
                    id: datum.rows[i].ID,
                    room: datum.rows[i].ROOM_NO,
                    section: datum.rows[i].SECTION,
                    division: datum.rows[i].DIVISION,
                    subject: datum.rows[i].SUBJECTNAME
                }
                Classes.push(newClass);
            }
            setBool1(true);
        }) 
    },[])

    if(bool1){
    return (
        <div className='tc_1'>
            <center>
                <h1 className="HeadT"><u>Classes List</u></h1>
            </center>
            <ul className='TList' type="none">
                {Classes.map(Cla => {
                    return <li>
                        {
                            <Card
                                bg={'secondary'}
                                key={'Primary'}
                                text={'white'}
                                style={{ width: '50rem' }}
                                className="mb-2"
                            >
                                <Card.Header><b>{Cla.standard} {Cla.section}</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{Cla.subject}</Card.Title>
                                    <Card.Text>
                                        Room Number : {Cla.room}
                                        <br />
                                        Division : {Cla.division}
                                        <Button variant="outline-light" className='btntc' onClick={(e) => { 
                                            const newp={
                                                teacherid: props.data,
                                                classid: Cla.id,
                                                standard: Cla.standard,
                                                section: Cla.section,
                                                division: Cla.division,
                                                subject: Cla.subject
                                            }
                                            props.setData(newp);
                                            navigate('/class_t_ins'); }}>Go to Class</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        }
                    </li>;
                })}
            </ul>
            <div className='Btnbck'>
                <br />
                <br />
                <Button variant="outline-danger" size="lg" onClick={(e) => navigate('/teacher')}>
                    Back
                </Button>
            </div>
        </div>
    )
}
}

export default Classes_T;
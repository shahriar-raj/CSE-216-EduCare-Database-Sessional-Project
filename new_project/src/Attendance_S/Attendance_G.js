import React, { useState } from 'react';
// import "./Attendance_S.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Attendance_G = (props) => {
    const navigate = useNavigate();
    // const [Att, setAtt] = useState([{ subject: "Bangla", total: 10, present: 8, percen: 80 }, { subject: "English", total: 15, present: 9, percen: 60 }
    //     , { subject: "Math", total: 16, present: 10, percen: 62.5 }, { subject: "Science", total: 12, present: 9, percen: 75 }]);

    const [Att,setAtt]=useState([]);
    const [bool1,setBool1]=useState(false);

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
        fetch("http://localhost:4000/getattendancefromguardian", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for(let i=0;i<datum.length;i++){
                if(Att.length >= datum.length){
                    break;
                }
                const newAtt={
                    subject: datum[i].subject,
                    total: datum[i].total,
                    present: datum[i].present,
                    percen: datum[i].percen
                }
                Att.push(newAtt);
            }
            setBool1(true);
        })
    },[]);
    if(bool1){     
    return (
        <div className='trss'>
            <br />
            <h1 className='hrss'><u><b>Attendance Sheet</b></u></h1>
            <br />
            <br />
            <Table striped bordered hover variant="dark" >
                <thead>
                    <tr className='thead'>
                        <th><u>Subject</u></th>
                        <th><u>Total Classes</u></th>
                        <th><u>Classes Attended</u></th>
                        <th><u>Attendance Percentage</u></th>
                    </tr>
                </thead>
                <tbody>
                    {Att.map(att_ => {
                        return (
                            <tr>
                                <th>{att_.subject}</th>
                                <td>{att_.total}</td>
                                <td>{att_.present}</td>
                                <td>{att_.percen}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br />
            <Button variant="outline-dark" className='btn_b_rss' onClick={(e) => { navigate('/guardian'); }}>Back</Button>
        </div>
    )
}
}

export default Attendance_G;
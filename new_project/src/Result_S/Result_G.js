import React, { useState } from 'react';
// import './Result_S.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Result_G = (props) => {
    const navigate = useNavigate();
    // const [Marks, setMark] = useState([{ subject: "Bangla", ct: 35, ht: 45, total: 80, grade: "A+" }, { subject: "English", ct: 15, ht: 35, total: 50, grade: "D" }
    //     , { subject: "Math", ct: 10, ht: 23, total: 33, grade: "E" }, { subject: "ICT", ct: 25, ht: 55, total: 80, grade: "A+" }]);
    const [Marks,setMark]=useState([]);
    let [bool1,setBool1]=useState(false);

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
        fetch("http://localhost:4000/getresultfromguardian", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for(let i=0;i<datum.rows.length;i++){
                if(Marks.length >= datum.rows.length){
                    break;
                }
                const newMark={
                    subject: datum.rows[i].SUBJECTNAME,
                    ct: datum.rows[i].CTMARKS,
                    ht: datum.rows[i].HTMARKS,
                    total: datum.rows[i].TOTAL,
                    grade: datum.rows[i].GRADE
                }
                Marks.push(newMark);
            }
            setBool1(true);
        })    
    },[]);

    if(bool1){
    return (
        <div className='trss'>
            <br />
            <h1 className='hrss'><u><b>Result</b></u></h1>
            <br />
            <br />
            <Table striped bordered hover variant="dark" >
                <thead>
                    <tr className='thead'>
                        <th><u>Subject</u></th>
                        <th><u>Class Test Marks</u></th>
                        <th><u>Final Exam Marks</u></th>
                        <th><u>Total Marks</u></th>
                        <th><u>Grade</u></th>
                    </tr>
                </thead>
                <tbody>
                    {Marks.map(mark => {
                        return (
                            <tr>
                                <th>{mark.subject}</th>
                                <td>{mark.ct}</td>
                                <td>{mark.ht}</td>
                                <td>{mark.total}</td>
                                <td>{mark.grade}</td>
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

export default Result_G;
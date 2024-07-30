
import './Class_T_Ins.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Class_T_Ins = (props) => {
    const navigate = useNavigate();
    //const class_ = { standard: 6, section: "A", subject: "Science" };
    console.log(props.data);
    const [class_,setClass_]=useState();
    const [Routine_,setRoutine_]=useState([]);
    const [bool1,setBool1]=useState(false);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "classid": props.data.classid,
            "subject": props.data.subject
        })
    };
    useEffect(() => {
        fetch("http://localhost:4000/getroutinefromclasssubject", msg)
        .then(res => res.json())
        .then(datum => {
            console.log(datum);
            for(let i=0;i<datum.rows.length;i++){
                if(Routine_.length >= datum.rows.length){
                    break;
                }
                const newRoutine={
                    day: datum.rows[i].DAY,
                    period: datum.rows[i].PERIODNO
                }
                Routine_.push(newRoutine);
            }
            const newClass={
                standard: props.data.standard,
                section: props.data.section,
                subject: props.data.subject
            }
            setClass_(newClass);
            setBool1(true);

        })
    },[]);    
    
    //const Routine_ = [{ day: "Saturday", period: 1 }, { day: "Sunday", period: 2 }, { day: "Tuesday", period: 2 }, { day: "Thursday", period: 4 }];
    if(bool1){
    return (
        <>
            <div className='leftCIT'>
                <br />
                <h1 className='HCIT'><u><b>Class: {class_.standard}, Section: {class_.section}</b></u></h1>
                <h1 className='HCIT'><u><b>Subject: {class_.subject}</b></u></h1>
                <br />
                <br />
                <h2 className='LCIT'><b><u>Routine</u></b></h2>
                <br />
                {Routine_.map(r => {
                    return (
                        <>
                            <Badge bg="dark" className='BCIT'>Day: {r.day}, period: {r.period} </Badge>
                            <br />
                            <br />
                        </>
                    );
                })}
                <br />
                <br />
                <Button variant="outline-light" className='BTNCI' onClick={(e) => { 
                    const tid=props.data.teacherid;
                    props.setData(tid);
                    navigate('/classes_t'); }}>Back</Button>
            </div>
            <div className='rightCIT'>
                <Button variant="dark" className='BTNUCT' onClick={(e) => { navigate('/result_ct'); }}>Class Test Marks</Button>
                <Button variant="dark" className='BTNUHT' onClick={(e) => { navigate('/result_ht'); }}>Hall Test Marks</Button>
                <Button variant="dark" className='BTNATT' onClick={(e) => { navigate('/attendance'); }}>Attendance</Button>
            </div>
        </>
    )
}
}

export default Class_T_Ins;
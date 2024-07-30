import React from 'react';
import './ClassesInside.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const ClassesInside = (props) => {
    const navigate = useNavigate();

    //const class_ = { standard: 6, section: "A" };
    let [class_,setClass_] = useState({standard: -1, section: "Z"});
    const [Students,setStudents] = useState([]);
    const [bool1,setBool1] = useState(false);
    console.log(props.data);
    //const Students = [{ roll: 1, name: "Abul" }, { roll: 2, name: "Abid" }, { roll: 3, name: "Reaz" }, { roll: 4, name: "Razin" }, , { roll: 5, name: "Khondo" }]
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "classid": props.data
        })
    };

    const handleClick = (e) =>{
        fetch("http://localhost:4000/getinstitutionfromclass", msg)
                .then(res => res.json())
                .then(data => {
                    //console.log('button e click hoise abar abar');
                    console.log(data);
                    props.setData(data.rows[0].INSTITUTIONID);
                    navigate('/class');
                });
    }
    useEffect(() =>{
        async function fetchdata() {
            const res1 = await fetch("http://localhost:4000/getinfofromclass", msg)
            const result1 = await res1.json();
            console.log('Result1 is: ');
            console.log(result1);

            const newClass={
                standard: result1.rows[0].STANDARD,
                section: result1.rows[0].SECTION
            }
            setClass_(newClass);
            const res2 = await fetch("http://localhost:4000/getstudentfromclass", msg)
            const result2 = await res2.json();
            console.log('Result2 is: ');
            console.log(result2);
            for(let i=0;i<result2.rows.length;i++){
                if(Students.length >= result2.rows.length){
                    break;
                }
                const newStudent={
                    roll: result2.rows[i].ROLLNO,
                    name: result2.rows[i].NAME
                }
                Students.push(newStudent);
            }
            console.log('class_ is: ');
            console.log(class_);
            console.log('Students is: ');
            console.log(Students);
            setBool1(true);

        }
        if(!bool1)
          fetchdata();    
    },[]);
    if(bool1){
    return (
        <>
            <div className='leftCI'>
                <h1 className='HCI'><u><b>Class: {class_.standard} {class_.section}</b></u></h1>
                <br />
                <br />
                <h2 className='LCI'><b><u>Students List</u></b></h2>
                <br />
                {Students.map(Student => {
                    return (
                        <>
                            <Badge bg="dark" className='BCI'>Roll: {Student.roll}, Name: {Student.name} </Badge>
                            <br />
                            <br />
                        </>
                    );
                })}
                <br />
                <br />
                <Button variant="outline-light" className='BTNCI' onClick={(e) => { handleClick(e) }}>Back</Button>
            </div>
            <div className='rightCI'>
                {/* <Button variant="dark" className='BTNUPT' onClick={(e) => { navigate('/teacher_update'); }}>Update Teacher</Button> */}
                <Button variant="dark" className='BTNADDS' onClick={(e) => { navigate('/student_add'); }}>Add Students</Button>
                <Button variant="dark" className='BTNRMS' onClick={(e) => { navigate('/student_remove'); }}>Remove Students</Button>
                <Button variant="dark" className='BTNUPR' onClick={(e) => { navigate('/room_update'); }}>Update Room</Button>
                <Button variant="dark" className='BTNR' onClick={(e) => { navigate('/routine_i'); }}>Routine</Button>
            </div>
        </>
    )
}
}

export default ClassesInside;
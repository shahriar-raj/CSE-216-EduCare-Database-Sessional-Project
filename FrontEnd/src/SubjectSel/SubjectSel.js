import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './SubjectSel.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectSel = (props) => {
    //let subj = ['Bangla', 'Math', 'English'];
    //let Teachers_Id = [30001, 30002, 30003];
    //let Teachers_Name = ["A", "B", "C"];
    const [subj, setSubj] = useState([]);
    const [Teachers_Id, setTeachers_Id] = useState([]);
    const [Teachers_Name, setTeachers_Name] = useState([]);
    const classId = props.data;
    const [InsId, setInsId] = useState("");
    const navigate = useNavigate();
    const SubmitHandler = event => {
        console.log(Subjects);
        const chosenSubj = [];
        for(let i=0; i<Subjects.length;i++){
            if(Subjects[i].Check){
                chosenSubj.push(Subjects[i]);
            }
        }
        const msg1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "classid": props.data,
                "chosensubj": chosenSubj
            })
        };
        fetch("http://localhost:4000/subjectteacherrelation",msg1)
         .then(res => res.json())
           .then(data => {
          console.log('button e click hoise abar abar'); 
          console.log(data);
          navigate('/student_select');
           });
    }

    //console.log("Props data in loginpage " + props.data);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": props.data
        })
    };
    // useEffect(() => {
    //     fetch("http://localhost:4000/getinstitutionfromclass", msg)
    //         .then(res => res.json())
    //         .then(datum => {
    //             console.log('button e click hoise abar abar');
    //             //console.log(data.name);
    //             //adminname=data.rows[0].NAME;
    //             //setData(datum.rows[0]);
    //             setInsId(datum.rows[0]);
    //             console.log('Gotten ins is: ' + datum.rows[0]);
    //             console.log(InsId);
    //         })
    //         // console.log(InsId[0]);
    //         // const msg1 = {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json'
    //         //     },
    //         //     body: JSON.stringify({
    //         //         "id": InsId[0]
    //         //     })
    //         // };
    //         // fetch("http://localhost:4000/getteacherfrominstitution", msg1)
    //         // .then(res => res.json())
    //         // .then(datum1 => {
    //         //     console.log(datum1);
    //         //     for(let i=0;i<datum1.rows.length;i++){

    //         //         setTeachers_Id(Teachers_Id =>[...Teachers_Id,datum1.rows[i].ID]);
    //         //         setTeachers_Name(Teachers_Name =>[...Teachers_Name,datum1.rows[i].NAME]);
    //         //      }
    //         //     //console.log(data.name);
    //         //     //adminname=data.rows[0].NAME;
    //         //     //setData(datum.rows[0]);
    //         //     //insId=datum.id;
    //         // })
    // }, []);
    // console.log('Notun pawa ins id: ' + InsId.INSTITUTIONID);
    // const Institution_Id=InsId.INSTITUTIONID;
    // console.log('Ebar paisi: ' + Institution_Id);
    // const msg1 = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "id": InsId.INSTITUTIONID
    //     })
    // };

    useEffect(() => {

        fetch("http://localhost:4000/getteacherfromclass", msg)
        .then(res => res.json())
        .then(datum1 => {
            console.log(datum1);
            for(let i=0;i<datum1.rows.length;i++){

                setTeachers_Id(Teachers_Id =>[...Teachers_Id,datum1.rows[i].ID]);
                setTeachers_Name(Teachers_Name =>[...Teachers_Name,datum1.rows[i].NAME]);
             }
            //console.log(data.name);
            //adminname=data.rows[0].NAME;
            //setData(datum.rows[0]);
            //insId=datum.id;
        })
        fetch("http://localhost:4000/getsubjectfromclass", msg)
        .then(res => res.json())
        .then(datum1 => {
            console.log(datum1);
            for(let i=0;i<datum1.rows.length;i++){

                setSubj(subj =>[...subj,datum1.rows[i].NAME]);
             }
            //console.log(data.name);
            //adminname=data.rows[0].NAME;
            //setData(datum.rows[0]);
            //insId=datum.id;
        })
    }, []);

    const Teachers = [{ name: Teachers_Name[0], id: Teachers_Id[0] }];
    for (let i = 1; i < Teachers_Id.length/2; i++) {
        const newTeacher = {
            name: Teachers_Name[i],
            id: Teachers_Id[i]
        };
        Teachers.push(newTeacher);
    }
    console.log('The teachers are: ');
    console.log(Teachers);
    const Subj1 = [];
    for (let i = 0; i < subj.length/2; i++) {
        Subj1.push(subj[i]);
    }
    const Subjects = [];
    for (let j = 0; j < Subj1.length; j++) {
        const newSubject = {
            name: Subj1[j],
            Check: false,
            id: Teachers[0].id
        };
        Subjects.push(newSubject);
    }
    console.log('The subs are: ');
    console.log(Subjects);
    // for (let i = 0; i < subj.length/2; i++) {
    //     Subj1.push(subj[i]);
    // }
    return (
        <div className='m_s'>
        <div className='form_su'>
            <h1><u><b>Subject Register</b></u></h1>
            <br />
            <Form>
                {Subjects.map(sub => {
                    return (<div className='se'>
                        <Row className="g-2">
                            <Col md>
                                <Form.Check
                                    type="switch"
                                    id={sub.name}
                                    label={sub.name}
                                    className="switches"
                                    value={sub.name}
                                    onChange={(e) => {
                                        if (sub.Check === false) {
                                            sub.Check = true;
                                        }
                                        else {
                                            sub.Check = false;
                                        }
                                    }}
                                />
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Select Teacher"
                                    className='options'
                                >
                                    <Form.Select aria-label="Floating label select example" onChange={(e) => { sub.id = e.target.value; }}>
                                        {Teachers.map(teacher => {
                                            return <option value={teacher.id}>{teacher.id} - {teacher.name}</option>
                                        })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>);
                })}
            </Form>
            <br />
            <div className="d-grid gap-2">
                <Button variant="success" size="lg" className='btn_c' onClick={SubmitHandler}>
                    Submit
                </Button>
            </div>
        </div>
        </div>
    )
}


export default SubjectSel;
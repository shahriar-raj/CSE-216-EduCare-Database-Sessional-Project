import React from 'react';
import './Class.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from'react';

const Class = (props) => {
    // let Standard = [1, 2, 3];
    // let Id = [1000, 20000, 3000];
    // let RoomNo = [101, 102, 103];
    // let Section = ['A', 'B', 'C'];
    // let Session = [2015, 2020, 2020]
    // let Division = ['Science', 'Arts', 'Commerce'];
    const navigate=useNavigate();
    const [Id, setId] = useState([]);
    const [Standard, setStandard] = useState([]);
    const [RoomNo, setRoomNo] = useState([]);
    const [Section, setSection] = useState([]);
    const [Division, setDivision] = useState([]);
    let listLength=0;
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": props.data
        })
    };

    const handleClick = (e) =>{
        e.preventDefault();
        navigate('/institution');
    }    
    useEffect(() => {    
        fetch("http://localhost:4000/getclassesInfo", msg)
        .then(res => res.json())
        .then(datum => {
            console.log('button e click hoise abar abar');
            //console.log(data.name);
            //adminname=data.rows[0].NAME;
            for(let i=0;i<datum.rows.length;i++){
               console.log(datum.rows[i]);
            }
            listLength=datum.rows.length;
            for(let i=0;i<datum.rows.length;i++){
        
                setId(Id =>[...Id,datum.rows[i].ID]);
                setStandard(Standard =>[...Standard,datum.rows[i].STANDARD]);
                setRoomNo(RoomNo =>[...RoomNo,datum.rows[i].ROOM_NO]);
                setSection(Section =>[...Section,datum.rows[i].SECTION]);
                setDivision(Division =>[...Division,datum.rows[i].DIVISION]);
             }
            //  console.log('Length of Name: ' + Name.length);
            //  for(let i=0;i<Name.length;i++){
        
            //     console.log(Name[i]);
            //  }
            //setData(datum.rows[0]);
            //console.log(data);
        })}, []);
    const Classes = [{ standard: Standard[0], id: Id[0], room: RoomNo[0], section: Section[0], division: Division[0] }];
    for (let i = 1; i < Standard.length/2; i++) {
        const newClass = {
            standard: Standard[i],
            id: Id[i],
            room: RoomNo[i],
            section: Section[i],
            division: Division[i]
        };
        Classes.push(newClass);
        console.log(Classes);
    }
    return (
        <>
            <center>
                <h1 className="Head"><u>Classes List</u></h1>
            </center>
            <ul className='InsList' type="none">
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
                                    <Card.Title>{Cla.id}</Card.Title>
                                    <Card.Text>
                                        ROOM NO. = {Cla.room}
                                        <br />
                                        Division = {Cla.division}
                                        <Button variant="dark" className='btnc' onClick={(e) =>
                                            {props.setData(Cla.id); 
                                            navigate('/classesinside');}}>
                                                Go to Class</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        }
                    </li>;
                })}
            </ul>
            <Button variant="danger" size="lg" className="bck" onClick={(e) => navigate('/institution')}>
                Back
            </Button>
            <Button variant="success" size="lg" className="add" onClick={(e) => navigate('/classreg')}>
                Add Classes
            </Button>
        </>
    )
}

export default Class;
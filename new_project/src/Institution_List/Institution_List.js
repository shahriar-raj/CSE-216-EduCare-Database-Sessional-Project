import React from 'react';
import './Institution_List.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

const Institution_list = (props) => {
    //console.log("Props data is: " + props.data);
    const navigate=useNavigate();
    const [Id, setId] = useState([]);
    const [Name, setName] = useState([]);
    const [Itype, setItype] = useState([]);
    const [Email, setEmail] = useState([]);
    const [WebsiteLink, setWebsiteLink] = useState([]);
    const [District, setDistrict] = useState([]);
    const [Thana, setThana] = useState([]);
    const [PostOffice, setPostOffice] = useState([]);
    let listLength=0;
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const handleClick = (e) =>{
        e.preventDefault();
        navigate('/admin');
    }    
    useEffect(() => {    
        fetch("http://localhost:4000/getInstitutionInfo", msg)
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
                setName(Name =>[...Name,datum.rows[i].NAME]);
                setItype(Itype =>[...Itype,datum.rows[i].ITYPE]);
                setEmail(Email =>[...Email,datum.rows[i].EMAIL]);
                setWebsiteLink(WebsiteLink =>[...WebsiteLink,datum.rows[i].WEBSITELINK]);
                setDistrict(District =>[...District,datum.rows[i].DISTRICT]);
                setThana(Thana =>[...Thana,datum.rows[i].THANA]);
                setPostOffice(PostOffice =>[...PostOffice,datum.rows[i].POSTOFFICE]);
                console.log(i + ' bar call howar por Length of Name: ' + Name.length);
             }
             console.log('Length of Name: ' + Name.length);
             for(let i=0;i<Name.length;i++){
        
                console.log(Name[i]);
             }
            //setData(datum.rows[0]);
            //console.log(data);
        })}, []);
    const Schools = [{ name: Name[0], id: Id[0], thana:Thana[0], itype:Itype[0], district:District[0], website:WebsiteLink[0], email:Email[0], post:PostOffice[0]}];
    for (let i = 1; i < Name.length/2; i++) {
        const newIns = {
            name: Name[i],
            id: Id[i], 
            thana:Thana[i], 
            itype:Itype[i], 
            district:District[i], 
            website:WebsiteLink[i], 
            email:Email[i], 
            post:PostOffice[i]
        };
        Schools.push(newIns);
        console.log(Schools);
    }
    return (
        <div className='pg'>
        <center>
        <h1 className="Head"><u>Institution List</u></h1>
        </center>
            <ul className='InsList' type="none">
                {Schools.map(School => {
                    return <li>
                        { /*{School.name} {School.id} <a>{School.thana}</a> <center><img src="school.png" width={"100px"} height={"100px"} /></center>; */}
                        <Card
                            bg={'secondary'}
                            key={'Primary'}
                            text={'white'}
                            style={{ width: '50rem' }}
                            className="mb-2"
                        >
                            <Card.Header>{School.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>{School.id} </Card.Title>
                                <Card.Text>
                                    {School.itype}  {School.thana}
                                    <br />
                                    <a href="{School.website}" target={'_blank'}>{School.website}</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </li>;
                })}
            </ul>
            <div className='buttons'>
            <Button variant="danger" size="lg" className="bck" onClick={(e) => {handleClick(e)}}>
                Back to Profile
            </Button>
            <Button variant="success" size="lg" className="add" onClick={(e) => navigate('/i_signup')}>
                Add Institution
            </Button>
            </div>
        </div>
    )
}

export default Institution_list;


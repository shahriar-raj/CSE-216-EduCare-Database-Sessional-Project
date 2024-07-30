import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Institution_SignUp.css';
import { useState, useEfefct } from 'react';
import { useNavigate } from 'react-router-dom';

const Institution_SIgnUp = (props) => {
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [WebsiteLink, setWebsiteLink] = useState("");
    const [Itype, setItype] = useState("Primary School");
    const [District, setDistrict] = useState("Dhaka");
    const [Thana, setThana] = useState("");
    const [PostOffice, setPostOffice] = useState();
    let districts = ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Jamalpur', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Mymensingh', 'Narayanganj', 'Narsingdi', 'Netrokona', 'Rajbari', 'Shariatpur', 'Sherpur', 'Tangail', 'Bogra', 'Joypurhat',
        'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Rajshahi', 'Sirajgonj', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon', 'Barguna',
        'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur', 'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Coxs Bazar', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Habiganj', 'Maulvibazar', 'Sunamganj', 'Sylhet',
        'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'];
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        let v = false;
        let d = false
        let c = true;
        for (let i = 0; i < Email.length; i++) {
            if (Email[i] === '@')
                v = true;
            if (Email[i] === '.')
                d = true;
        }

        if (Password.length < 8 || Password.length > 16) {
            alert("Password must be between 8 to 16 characters");
        }
        else if (!(v && d)) {
            alert("Please Enter a valid Email Address");
        }
        else if (Name.length === 0) {
            alert("Name field cannot be empty");
        }
        else if (Thana.length === 0) {
            alert("Thana field cannot be empty");
        }
        else {
            console.log('button e click hoise');
            const msg = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": Name,
                    "password": Password,
                    "email": Email,
                    "itype": Itype,
                    "websitelink": WebsiteLink,
                    "district": District,
                    "thana": Thana,
                    "postoffice": PostOffice
                })
            };
            fetch("http://localhost:4000/InstitutionSignUp", msg)
                .then(res => res.json())
                .then(data => {
                    console.log('button e click hoise abar abar');
                    console.log(data);
                    navigate('/institution_list');
                });
        }
    }
    return (
        <div className='form_i'>
            <h1><u><b>Institution Register</b></u></h1>
            <br />
            <Row className="g-2">
                <Col md>
                    <FloatingLabel
                        controlId="floatingName"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="name" value={Name} onChange={(e) => { setName(e.target.value) }} />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingWeb"
                label="Website Link"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="https://example.edu" value={WebsiteLink} onChange={(e) => { setWebsiteLink(e.target.value) }} />
            </FloatingLabel>
            <br />
            <Row className="g-2">
                <Col md>
                    <FloatingLabel
                        controlId="floatingType"
                        label="Institution_Type"
                        className="mb-3"
                    >
                        <Form.Select aria-label="Floating label select example" value={Itype} onChange={(e) => { setItype(e.target.value) }}>
                            {/* <option>Select Gender</option> */}
                            <option value="Primary School">Primary School</option>
                            <option value="High School">High School</option>
                            <option value="College">College</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingDistrict" label="District">
                        <Form.Select aria-label="Floating label select example" value={District} onChange={(e) => { setDistrict(e.target.value) }}>
                            {districts.map(district => {
                                return (<option value={district}>{district}</option>)
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <Row className="g-2">
                <Col md>
                    <FloatingLabel
                        controlId="floatingThana"
                        label="Thana"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Thana" value={Thana} onChange={(e) => { setThana(e.target.value) }} />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingPost" label="Post Office">
                        <Form.Control type="number" placeholder="Post" value={PostOffice} onChange={(e) => { setPostOffice(e.target.value) }} />
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <div className="d-grid gap-2">
                <Button variant="success" size="lg" onClick={(e) => { handleClick(e) }}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Institution_SIgnUp
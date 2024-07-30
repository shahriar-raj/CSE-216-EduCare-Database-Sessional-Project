import React from 'react';
import './Information.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Header from '../shared/components/Header';
import { useNavigate } from 'react-router-dom';

const Information = () => {
    const navigate=useNavigate();
    return (
        <div>
            <Header />
        <div className='in'>
            <div className='inl'>
                <Image src="teacher1.png" width={"400px"} height={"400px"} />
                <br />
                <br />
                <br />
                <Button variant="success" size="lg">
                    Added Teachers
                </Button>
            </div>
            <div className='inr'>
                <Image src="school1.png" width={"400px"} height={"400px"} />
                <br />
                <br />
                <br />
                <Button variant="primary" size="lg" onClick={(e) => {navigate('/guest-institution')}}>
                    Added Institutions
                </Button>
            </div>
        </div>
        </div>
    )
}

export default Information;
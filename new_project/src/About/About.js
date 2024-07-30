import React from 'react';
import './About.css';
import Footer from '../Footer/Footer';
import Header from '../shared/components/Header';

const About = () => {
    
    return (
        <div>
           <Header/>
        <>
            <div className='ab'>
                <h1 className='head'><b><u>About</u></b></h1>
                <div className='body'>
                    <p>Educare, an educational institution management database that mainly focuses to automate the day to day management works like this-</p>
                    <ul type="square">
                        <li>Attendance Keeping</li>
                        <li>Results Publishing</li>
                        <li>Routine Management</li>
                        <li>Teachers and Students Information Keeping</li>
                        <li>Dues Information and so on.</li>
                    </ul>
                    <p>It is not a single institution database, rather it keeps track of different institutions and their students, teachers</p>
                </div>
                <div className='i1'>
                    <img src="student.png" width={"180px"} height={"180px"} />
                </div>
                <div className='i2'>
                    <img src="teacher.png" width={"190px"} height={"190px"} />
                </div>
                <div className='i3'>
                    <img src="exam.png" width={"190px"} height={"190px"} />
                </div>
                <div className='i4'>
                    <img src="routine.png" width={"190px"} height={"190px"} />
                </div>
            </div>
            <Footer />
        </>
        </div>
    )
}

export default About;
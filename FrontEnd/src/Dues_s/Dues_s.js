import React from 'react';
import './Dues_s.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dues_s = (props) => {
    const navigate = useNavigate();
    //const Dues_ = [{ id: 101, type: 'Monthly Fees', Des: "July", Amount: 1500 }, { id: 102, type: 'Exam Fees', Des: "term Final", Amount: 2000 }, { id: 103, type: 'Monthly Fees', Des: "August", Amount: 1500 }, { id: 104, type: 'Annual Fees', Des: "2022", Amount: 1000 },]
    const [Dues_,setDues_] = useState([]);
    const Dues=[];
    // for (let i = 0; i < Dues_.length; i++) {
    //     const newDue = {
    //         no_: i + 1,
    //         id: Dues_[i].id,
    //         type: Dues_[i].type,
    //         Des: Dues_[i].Des,
    //         Amount: Dues_[i].Amount,
    //     }
    //     Dues.push(newDue);
    // }
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "studentid": props.data
        })
    };
    useEffect(() => {
        console.log("Hello I am here");
        fetch("http://localhost:4000/getduesfromstudent", msg)
            .then(res => res.json())
            .then(datum => {
                console.log(datum);
                for (let i = 0; i < datum.rows.length; i++) {
                    // if (Dues.length >= datum.rows.length) {
                    //     break;
                    // }
                    const newDue = {
                        no_: i + 1,
                        id: datum.rows[i].ID,
                        type: datum.rows[i].DUETYPE,
                        Des: datum.rows[i].DESCRIPTION,
                        Amount: datum.rows[i].AMOUNT
                    }
                    setDues_(Dues_ =>[...Dues_,newDue]);
                }
                console.log('Dues for student: ');
                console.log(Dues_);
            })
    }, []);
    for (let i = 0; i < Dues_.length/2; i++) {
        // if (Dues.length >= datum1.rows.length) {
        //     break;
        // }
        const newDue = {
            no_: i + 1,
            id: Dues_[i].id,
            type: Dues_[i].type,
            Des: Dues_[i].Des,
            Amount: Dues_[i].Amount,
        }
        Dues.push(newDue);
    }
    console.log('Unpaid Dues: ');
    console.log(Dues);
    return (
        <div className='Duesl'>
            <br />
            <h1 className='HDL'><b><u>Unpaid Dues</u></b></h1>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Due Id</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Dues.map(due => {
                        return (
                            <tr>
                                <td>{due.no_}</td>
                                <td>{due.id}</td>
                                <td>{due.type}</td>
                                <td>{due.Des}</td>
                                <td>{due.Amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <br />
            <div className="d-grid gap-2">
                <center>
                    <Button variant="outline-dark" size="lg" className='btn_b_rn' onClick={(e) => { navigate('/student'); }}>
                        Back
                    </Button>
                </center>
            </div>
        </div >
    )
}

export default Dues_s;
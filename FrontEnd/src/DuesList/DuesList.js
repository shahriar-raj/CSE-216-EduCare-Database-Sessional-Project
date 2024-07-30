import React from 'react';
import './DuesList.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DuesList = (props) => {
    //const Dues_ = [{ id: 10001, type: 'Monthly Fees', Des: "July", Amount: 1500 }, { id: 10002, type: 'Exam Fees', Des: "term Final", Amount: 2000 }, { id: 10001, type: 'Monthly Fees', Des: "August", Amount: 1500 }, { id: 10005, type: 'Annual Fees', Des: "2022", Amount: 1000 },]
    const [Dues_, setDues_] = useState([]);
    let bool1=false;
    const Dues= [];
    const navigate=useNavigate();
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
    fetch("http://localhost:4000/getunpaiddues", msg)
        .then(res => res.json())
        .then(datum1 => {
            console.log(datum1);
            for (let i = 0; i < datum1.rows.length; i++) {
                // if (Dues_.length >= datum1.rows.length) {
                //     break;
                // }
                const newDues1 = {
                    id: datum1.rows[i].STUDENTID,
                    type: datum1.rows[i].DUETYPE,
                    Des: datum1.rows[i].DESCRIPTION,
                    Amount: datum1.rows[i].AMOUNT
                }
                setDues_(Dues_ =>[...Dues_,newDues1]);
            }
            console.log(Dues_);
            // for (let i = 0; i < Dues_.length; i++) {
            //     if (Dues.length >= datum1.rows.length) {
            //         break;
            //     }
            //     const newDue = {
            //         no_: i + 1,
            //         id: Dues_[i].id,
            //         type: Dues_[i].type,
            //         Des: Dues_[i].Des,
            //         Amount: Dues_[i].Amount,
            //     }
            //     Dues.push(newDue);
            // }
            // console.log('Unpaid Dues: ');
            // console.log(Dues);
            bool1=true;
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
                        <th>Student Id</th>
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
                <Button variant="outline-dark" size="lg" className='btndl'  onClick={(e) => { navigate('/dues') }}>
                    Back
                </Button>
            </div>
        </div >
    )
}

export default DuesList;
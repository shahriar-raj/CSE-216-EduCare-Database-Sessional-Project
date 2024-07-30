import React, { useState, useEffect } from 'react';
import './Routine_S.css';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Routine_S = (props) => {
    const navigate = useNavigate();
    const [Table_, setTable_] = useState([]);
    const msg = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": props.data,
        })
    };
    //let [count_,setCount_] = useState(0);
    const [count,setCount] = useState([]);
    const [Tables,setTables] = useState([]);
    const [days_,setDays_] = useState([]);
    const [dayName,setDayName] = useState([]);
    let [bool1,setBool1] = useState(false);
    let [bool2,setBool2] = useState(false);
    useEffect(() => {
        async function fetchdata() {
            const res1 = await fetch("http://localhost:4000/getroutinefromstudent", msg)
            const result1 = await res1.json();
            console.log('Result1 is: ');
            console.log(result1);
            for (let i = 0; i < result1.rows.length; i++) {
                if (Table_.length >= result1.rows.length) {
                    break;
                }
                const newTable = {
                    day: result1.rows[i].DAY,
                    period: result1.rows[i].PERIODNO,
                    value: result1.rows[i].SUBJECT
                }
                Table_.push(newTable);
            }
            console.log('Table_ is: ');
            console.log(Table_);
            console.log("hello");
            //let count_ = 0;
            // for (let i = 0; i < Table_.length; i++) {
            //     //console.log("hello");
            //     if (Tables.length >= result1.rows.length) {
            //         break;
            //     }
            //     if (Table_[0].day === Table_[i].day) {
            //         console.log('milse');
            //        //setCount_(count_+1);
            //         const newC = {
            //             id: i + 1
            //         }
            //         console.log('newC is: ');
            //         console.log(newC);
            //         count.push(newC);
            //     }
            //     const newTab = {
            //         no_: i,
            //         day: Table_[i].day,
            //         period: Table_[i].period,
            //         value: Table_[i].value,
            //     }
            //     Tables.push(newTab);
            // }
            for(let i=1;i<100;i++){
                if(i !== count.length + 1){
                   break; 
                }
                let bool1=false;
                for(let j=0;j<Table_.length;j++){
                    if(Table_[j].period === i){
                        bool1=true;
                        const newC = {
                            id: i
                        }
                        console.log('newC is: ');
                        console.log(newC);
                        count.push(newC);
                        break;
                    }
                }
                if(!bool1){
                   break;
                }
            }
            console.log('Count is: ');
            console.log(count);
            const dayName1=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
            for(let i=0;i<dayName1.length;i++){
                if(i === 0 && dayName.length > 0){
                   break; 
                }
                for(let j=0;j<Table_.length;j++){
                    if(Table_[j].day === dayName1[i]){
                       dayName.push(dayName1[i]);
                       break;
                    }
                }
            }
            console.log('DayName is: ');
            console.log(dayName);
            // for (let i = 0; i < Table_.length; i++) {
            //     //console.log("hello");
            //     if (Tables.length >= result1.rows.length) {
            //         break;
            //     }
            //     // if (Table_[0].day === Table_[i].day) {
            //     //     console.log('milse');
            //     //    //setCount_(count_+1);
            //     //     const newC = {
            //     //         id: i + 1
            //     //     }
            //     //     console.log('newC is: ');
            //     //     console.log(newC);
            //     //     count.push(newC);
            //     // }
            //     const newTab = {
            //         no_: i,
            //         day: Table_[i].day,
            //         period: Table_[i].period,
            //         value: Table_[i].value,
            //     }
            //     Tables.push(newTab);
            // }
            for(let i=0;i<dayName.length;i++){
                if(i === 0 && Tables.length > 0){
                   break; 
                }
                for(let j=0;j<count.length;j++){
                    for(let k=0;k<Table_.length;k++){
                        if(dayName[i] === Table_[k].day && count[j].id === Table_[k].period){
                            const newTab = {
                                no_: i*count.length+j,
                                day: Table_[k].day,
                                period: Table_[k].period,
                                value: Table_[k].value,
                            }
                            Tables.push(newTab);
                        }
                    }
                }
            }
            console.log('Tables is: ');
            console.log(Tables);
            let d = Table_.length / count.length;
            for (let i = 0; i < d; i++) {
                if (days_.length >= d) {
                    break;
                }
                days_.push({ id: i });
            }
            //console.log("the count is: " + count_);
            console.log("Days are " + days_.length);
            console.log(days_);
            setBool1(true);
            setBool2(true);
        }
        fetchdata();
    }, []);
    // const Table_ = [{ day: "Saturday", period: 1, value: "Bangla" }, { day: "Saturday", period: 2, value: "" }, { day: "Saturday", period: 3, value: "Math" },
    // { day: "Sunday", period: 1, value: "English" }, { day: "Sunday", period: 2, value: "Bangla" }, { day: "Sunday", period: 3, value: "Science" },
    // { day: "Tuesday", period: 1, value: "" }, { day: "Tuesday", period: 2, value: "Math" }, { day: "Tuesday", period: 3, value: "Science" },
    // { day: "Thursday", period: 1, value: "" }, { day: "Thursday", period: 2, value: "Math" }, { day: "Thursday", period: 3, value: "Science" },];
    // console.log("hello");
    // let count_ = 0;
    // const count = [];
    // const Tables = [];
    // for (let i = 0; i < Table_.length; i++) {
    //     console.log("hello");
    //     if(Tables.length >= Table_.length){
    //        break; 
    //     }
    //     if (Table_[0].day === Table_[i].day) {
    //         count_ = count_ + 1;
    //         const newC = {
    //             id: count_
    //         }
    //         console.log(newC);
    //         count.push(newC);
    //     }
    //     const newTab = {
    //         no_: i,
    //         day: Table_[i].day,
    //         period: Table_[i].period,
    //         value: Table_[i].value,
    //     }
    //     Tables.push(newTab);
    // }
    // let d = Table_.length / count.length;
    // const days_ = [];
    // for (let i = 0; i < d; i++) {
    //     if(days_.length >= d){
    //        break; 
    //     }
    //     days_.push({ id: i });
    // }
    // console.log("the count is:" + count_);
    // console.log("Days are" + days_.length);
    if(bool1){
    return (
        <div className='rtn_s'>
            <br />
            <br />
            <h1><b><u>Class Routine</u></b></h1>
            <br />
            <br />
            <Table striped bordered hover variant="dark" className='table_r'>
                <thead>
                    <tr>
                        <th>#</th>
                        {count.map(c => {
                            return (<th>Period {c.id}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {days_.map(d_ => {
                        return (
                            <>
                                <tr>
                                    {Tables.map(tab => {
                                        if (tab.no_ / count.length === d_.id) {
                                            return (<><th>{tab.day}</th> <td>{tab.value}</td></>);
                                        };
                                        if (Math.floor(tab.no_ / count.length) === d_.id) {
                                            console.log(tab.no_ + " " + d_.id);
                                            return (<td>{tab.value}</td>)
                                        }
                                    })}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            <br />
            <Button variant="outline-dark" className='btn_b_rn' onClick={(e) => { navigate('/student'); }}>Back</Button>
        </div>
    )
}
}
export default Routine_S;
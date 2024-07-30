import React from 'react';
import './Routine.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';

const Routine = (props) => {
    // const subjects = [{ name: 'Bangla', c: 0, id: 30001 }, { name: 'English', c: 1, id: 30002 }, { name: 'Math', c: 2, id: 30003 }, { name: 'ICT', c: 3, id: 30004 }, { name: 'Physics', c: 4, id: 30005 }];
    // const Days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    // const times = [1, 2, 3, 4, 5];
    const navigate = useNavigate();
    const [subjects,setSubjects] = useState([]);
    const [Days,setDays] = useState([]);
    const [times,setTimes] = useState([]);
    // const [subjects1,setSubjects1] = useState([]);
    // const [Days1,setDays1] = useState([]);
    // const [times1,setTimes1] = useState([]);
    // const subjects = [];
    // const Days = [];
    // const times = [];
    let [Table, setTable] = useState([]);
    let [Table1, setTable1] = useState([]);
    let [count, setCount] = useState(0);
    // let bool1=false;
    let [bool1,setBool1] = useState(false);
    let [bool2,setBool2] = useState(false);
    //let [bool3,setBool3] = useState(false);
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

    //     fetch("http://localhost:4000/getdaysfromclass", msg)
    //         .then(res => res.json())
    //         .then(datum1 => {
    //             console.log(datum1);
    //             //if (!bool1) {
    //             //setBool1(true);
    //             for (let i = 0; i < datum1.rows.length; i++) {
    //                 setDays(Days1 => [...Days1, datum1.rows[i].DAY]);
    //             }
    //             //}
    //             //console.log(data.name);
    //             //adminname=data.rows[0].NAME;
    //             //setData(datum.rows[0]);
    //             //insId=datum.id;
    //         })
    //         .then(() => {
    //             fetch("http://localhost:4000/getperiodsfromclass", msg)
    //                 .then(res => res.json())
    //                 .then(datum1 => {
    //                     console.log(datum1);
    //                     //if (!bool2) {
    //                     //setBool2(true);
    //                     for (let i = 0; i < datum1.rows.length; i++) {
    //                         setTimes(times1 => [...times1, datum1.rows[i].PERIODNO]);
    //                     }
    //                     //}
    //                     //console.log(data.name);
    //                     //adminname=data.rows[0].NAME;
    //                     //setData(datum.rows[0]);
    //                     //insId=datum.id;
    //                 })
    //                 .then(() => {
    //                     fetch("http://localhost:4000/getsubjectsfromclass", msg)
    //                         .then(res => res.json())
    //                         .then(datum1 => {
    //                             console.log(datum1);
    //                             //if (!bool3) {
    //                             //setBool3(true);
    //                             for (let i = 0; i < datum1.rows.length; i++) {
    //                                 const newsub = {
    //                                     name: datum1.rows[i].SUBJECTNAME,
    //                                     c: i,
    //                                     id: datum1.rows[i].TEACHERID
    //                                 }
    //                                 setSubjects(subjects1 => [...subjects1, newsub]);
    //                             }
    //                             bool1=true;
    //                             //}
    //                             //console.log(data.name);
    //                             //adminname=data.rows[0].NAME;
    //                             //setData(datum.rows[0]);
    //                             //insId=datum.id;
    //                         })
    //                 })
    //         })
    // }, []);
    // // const msg = {
    // //     id: props.data
    // // }
    // // useEffect(() => {
    // //     Axios.post("http://localhost:4000/getdaysfromclass", msg).then((response) => {
    // //         console.log(response);
    // //         setDays(response.data);
    // //     });

    // //     Axios.post("http://localhost:4000/getperiodsfromclass", msg).then((response) => {
    // //         console.log(response);
    // //         setTimes(response.data);
    // //     });

    // //     Axios.get("http://localhost:4000/getsubjectsfromclass", msg).then((datum1) => {
    // //         console.log(datum1);
    // //         for(let i=0;i<datum1.length;i++){
    // //             const newsub = {
    // //                 name: datum1[i].SUBJECTNAME,
    // //                 c: i,
    // //                 id: datum1[i].TEACHERID
    // //             }
    // //             setSubjects(subjects1 =>[...subjects1,newsub]);
    // //          }
    // //     });
    // // }, []);
    useEffect(() => {
        if(count===0){
        async function fetchdata() {
            try {
                const res1 = await fetch("http://localhost:4000/getdaysfromclass", msg);
                const result1 = await res1.json();
                console.log('Result1 is: ');
                console.log(result1);
                for (let i = 0; i < result1.rows.length; i++) {
                    if(Days.length >= result1.rows.length){
                        break;
                    }
                    Days.push(result1.rows[i].DAY);
                }
                // setDays1(result1.rows);
                // setDays(result1.rows);
                const res2 = await fetch("http://localhost:4000/getperiodsfromclass", msg);
                const result2 = await res2.json();
                console.log('Result2 is: ');
                console.log(result2);
                for (let i = 0; i < result2.rows.length; i++) {
                    if(times.length >= result2.rows.length){
                        break;
                    }
                    times.push(result2.rows[i].PERIODNO);
                }
                // setTimes1(result2.rows);
                // setTimes(result2.rows);
                const res3 = await fetch("http://localhost:4000/getsubjectsfromclass", msg);
                const result3 = await res3.json();
                console.log('Result3 is: ');
                console.log(result3);

                for (let i = 0; i < result3.rows.length; i++) {
                    if(subjects.length >= result3.rows.length){
                        break;
                    }
                    const newsub = {
                        name: result3.rows[i].SUBJECTNAME,
                        c: i,
                        id: result3.rows[i].TEACHERID
                    }
                    subjects.push(newsub);
                }
                setBool1(true);
                // console.log('The days1 are: ');
                // console.log(Days1);
                // console.log('The times1 are');
                // console.log(times1);
                // console.log('The subjects1 are: ');
                // console.log(subjects1);
                // console.log("First Count:"+count);
                // for (let i = 0; i < Days1.length/2 && count === 0 && !bool2; i++) {
                //     if(Days.length >= result1.rows.length){
                //         break;
                //     }
                //     Days.push(Days1[i]);
                // }
                // for (let i = 0; i < times1.length/2 && count === 0 && !bool2; i++) {
                //     if(times.length >= result2.rows.length){
                //         break;
                //     }
                //     times.push(times1[i]);
                // }
                // for (let i = 0; i < subjects1.length/2 && count === 0 && !bool2; i++) {
                //     if(subjects.length >= result3.rows.length){
                //         break;
                //     }
                //     subjects.push(subjects1[i]);
                // }
                console.log('The days are: ');
                console.log(Days);
                console.log('The times are');
                console.log(times);
                console.log('The subjects are: ');
                console.log(subjects);
                console.log('The bool is ' + bool1);
                for (let i = 0; i < result1.rows.length && count === 0; i++) {
                    // if(i === Days.length-1)
                    //    setBool2(true);
                    if(Table.length >= result1.rows.length * result2.rows.length)
                       break;   
                    for (let j = 0; j < result2.rows.length; j++) {
                        // console.log('Days[i]: ' + Days[i]);
                        // console.log('times[j]: ' + times[j]);
                        const newTable = {
                            day: Days[i],
                            period: times[j],
                            assigned: false,
                            temp: false,
                            value: ""
                        }
                        Table.push(newTable);
                        if(Table.length >= result1.rows.length * result2.rows.length)
                           break;
                        //console.log(Table);
                        //console.log("count is:" + count);
                    }
                }
                // for (let i = 0; i < Table1.length/2 && count === 0 && !bool2; i++) {
                //     Table[i]=Table1[i];
                // }
                // for (let i = 0; i < Days.length && count === 0 && !bool2; i++) {
                //     if(i === Days.length-1)
                //        setBool2(true);
                //     for (let j = 0; j < times.length; j++) {
                //         console.log('Days[i]: ' + Days[i]);
                //         console.log('times[j]: ' + times[j]);
                //         const newTable = {
                //             day: Days[i],
                //             period: times[j],
                //             assigned: false,
                //             temp: false,
                //             value: ""
                //         }
                //         Table.push(newTable);
                //         console.log(Table);
                //     }
                // }
                //makeTable();
            }
            catch (e) {
                console.error(e);
            }
        }
            fetchdata();
    }
    }, []);
        // console.log('The days are: ');
        // console.log(Days);
        // console.log('The times are');
        // console.log(times);
        // console.log('The subjects are: ');
        // console.log(subjects);
        // console.log('The bool is ' + bool1);
        // for (let i = 0; i < Days.length && count === 0 && bool1; i++) {
        //     for (let j = 0; j < times.length; j++) {
        //         const newTable = {
        //             day: Days[i],
        //             period: times[j],
        //             assigned: false,
        //             temp: false,
        //             value: ""
        //         }
        //         Table.push(newTable);
        //     }
        // }
    

    const updateCount = event => {
        const dayTimes=[];
        {
            Table.map(tab => {
                if (tab.temp && !tab.assigned) {
                    const dayTimes1={
                        day: tab.day,
                        period: tab.period,
                        subject: tab.value
                    }
                    dayTimes.push(dayTimes1);
                }
            })
        }
        console.log(dayTimes);
        if (dayTimes.length > 0) {
            const msg2 = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "classid": props.data,
                    "table": dayTimes
                })
            };
            fetch("http://localhost:4000/routinevalidation", msg2)
                .then(res => res.json())
                .then(data => {
                    console.log('button e click hoise abar abar');
                    console.log(data);
                    if (data.isValid) {
                        count = count + 1;
                        setCount(count);
                        {
                            Table.map(tab => {
                                if (tab.temp === true) {
                                    tab.assigned = true;
                                }
                            })
                        }
                        if (count === subjects.length) {
                            console.log('Count paisi');
                            const msg1 = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "classid": props.data,
                                    "Table": Table,
                                    "subjects": subjects
                                    // "days": Days,
                                    // "times": times
                                })
                            };
                            fetch("http://localhost:4000/insertroutine", msg1)
                            .then(res => res.json())
                            .then(datum => {
                                //console.log('button e click hoise abar abar');
                                console.log(datum);
                                //adminname=data.rows[0].NAME;
                                //setData(datum.rows[0]);
                                props.setData(datum.institutionid);
                                navigate('/institution');
                            })
                        }
                    }
                    else {
                        setCount(count);
                        alert('Teacher has classes on ' + data.day + ' in period ' + data.time);
                    }
                });
        }
        else{
            count = count + 1;
            setCount(count);
        }
        console.log('Count is: ' + count);
        // {
        //     Table.map(tab => {
        //         if (tab.temp === true) {
        //             tab.assigned = true;
        //         }
        //     })
        // }
        console.log('Submit hoise');
        console.log(Table);
        // if (count === subjects.length - 1) {
        //     console.log('Count paisi');
        //     const msg1 = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "classid": props.data,
        //             "Table": Table,
        //             "subjects": subjects
        //             // "days": Days,
        //             // "times": times
        //         })
        //     };
        //     fetch("http://localhost:4000/insertroutine", msg1)
        //     .then(res => res.json())
        //     .then(datum => {
        //         //console.log('button e click hoise abar abar');
        //         console.log(datum);
        //         //adminname=data.rows[0].NAME;
        //         //setData(datum.rows[0]);
        //         props.setData(datum.institutionid);
        //         navigate('/institution');
        //     })
        // }
    }

    console.log('Table Print:');
    console.log(Table);
    if(bool1){
    return (
        <div>
            <p className='MainH'><b>Routine Plan</b></p>
            {subjects.map(subj => {
                if (subj.c === count) {
                    return (
                        <div className='Ro'>
                            <h1>Select Routine for <u><b>{subj.name}</b></u></h1>
                            <table border={5} cellPadding={5} className="Table1">
                                <tr>
                                    <th>Days</th>
                                    {times.map(time => {
                                        return <th>Period {time}</th>;
                                    })}
                                </tr>
                                {Days.map(day => {
                                    return (
                                        <tr>
                                            <th>{day}</th>
                                            {Table.map(tab => {
                                                if (tab.day === day) {
                                                    if (tab.assigned === false) {
                                                        return (<td><Form.Check
                                                            inline
                                                            label={tab.value}
                                                            name={tab.value}
                                                            type='checkbox'
                                                            id={tab.value} onClick={(e) => {
                                                                if (tab.temp === false) {
                                                                    tab.temp = true;
                                                                    tab.value = subj.name;
                                                                    console.log({ tab });
                                                                }
                                                                else {
                                                                    tab.temp = false;
                                                                    tab.value = "";
                                                                    console.log({ tab });
                                                                }
                                                            }} /></td>);
                                                    }
                                                    else {
                                                        return (<td>{tab.value}</td>);
                                                    }
                                                }
                                            })}
                                        </tr>
                                    )
                                })
                                }
                            </table>
                            <br />
                            <div className="d-grid gap-2">
                                <Button variant="success" size="lg" onClick={updateCount} className="btnrn">Submit</Button>
                            </div>
                        </div>
                    )
                }
            })}
        </div >
    )
}
}

export default Routine;
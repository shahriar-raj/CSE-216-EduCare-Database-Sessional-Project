import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import './TimeSel.css';
import { useNavigate } from 'react-router-dom';

const TimeSel = (props) => {
    const days = [{ day: 'Saturday', value: false }, { day: 'Sunday', value: false }, { day: 'Monday', value: false }, { day: 'Tuesday', value: false }, { day: 'Wednesday', value: false }, { day: 'Thursday', value: false }, { day: 'Friday', value: false }];
    let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    let [start_time_h, setStart_h] = useState([0]);
    let [start_time_m, setStart_m] = useState([0]);
    let [end_time_h, setEnd_h] = useState([0]);
    const [end_time_m, setEnd_m] = useState([0]);
    const [periods, setCount] = useState([1]);
    const Periods = [];
    const workingdays= [];
    const navigate=useNavigate();
    const addPeriodHandler = event => {
        event.preventDefault();
        let UserCount = periods.length + 1;
        setCount(periods.concat(UserCount));
        setStart_h(start_time_h.concat(0));
        setStart_m(start_time_m.concat(0));
        setEnd_h(end_time_h.concat(0));
        setEnd_m(end_time_m.concat(0));
        // setCount(periods.concat(UserCount));
        console.log(UserCount);
        console.log(periods);
    };

    const saveHandler = event => {
        event.preventDefault();
        console.log(periods);
        console.log(start_time_h);
        console.log(start_time_m);
        console.log(end_time_h);
        console.log(end_time_m);
        console.log(days);
        for (let i = 0; i < periods.length; i++) {
            const newPeriod = {
                num: periods[i],
                start: start_time_h[i] + '.' + start_time_m[i],
                end: end_time_h[i] + '.' + end_time_m[i]
            }
            Periods.push(newPeriod);
        }
        console.log(Periods);
        for (let i = 0; i < days.length; i++) {
            if(days[i].value){
               workingdays.push(days[i].day);
            }
        }
        console.log(workingdays);
        const msg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "periods": Periods,
                "workingdays": workingdays,
                "institutionid": props.data
            })
        };
    
        console.log('button e click hoise abar');
        fetch("http://localhost:4000/selectworkinghours",msg)
         .then(res => res.json())
           .then(data => {
          console.log('button e click hoise abar abar'); 
          console.log(data);
          navigate('/institution');
           });
    }

    return (
        <>
            <div className="TimeLeft">
                <p className='TimeHead1'><u> Periods </u></p>
                <p className='para'>Start Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End Time</p>
                {periods.map(period => {
                    return (
                        <div key={period}>
                            <Row className="g-3ti">
                                <Col md className='normal'>
                                    Period - {period}
                                </Col>
                                <Col md>
                                    <Row className="g-2">
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingHourGrid"
                                                label="Select Hour"
                                                className='options'
                                            >
                                                <Form.Select aria-label="Floating label select example" onChange={(e) => { start_time_h[period - 1] = Number(e.target.value) }}>
                                                    console.log({period});
                                                    {hours.map(hour => {
                                                        if (Math.floor(hour / 10) === 0) {
                                                            return <option value={hour}>0{hour}</option>
                                                        }
                                                        else {
                                                            return <option value={hour}>{hour}</option>
                                                        }
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingMinuteGrid"
                                                label="Select Minute"
                                                className='options'
                                            >
                                                <Form.Select aria-label="Floating label select example" onChange={(e) => { start_time_m[period - 1] = Number(e.target.value); }}>
                                                    {minutes.map(minute => {
                                                        if (Math.floor(minute / 10) === 0) {
                                                            return <option value={minute}>0{minute}</option>
                                                        }
                                                        else {
                                                            return <option value={minute}>{minute}</option>
                                                        }
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md>
                                    <Row className="g-2">
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingHourGrid"
                                                label="Select Hour"
                                                className='options'
                                            >
                                                <Form.Select aria-label="Floating label select example" className='g-2yes' onChange={(e) => { end_time_h[period - 1] = Number(e.target.value); }}>
                                                    {hours.map(hour => {
                                                        if (Math.floor(hour / 10) === 0) {
                                                            return <option value={hour}>0{hour}</option>
                                                        }
                                                        else {
                                                            return <option value={hour}>{hour}</option>
                                                        }
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingMinuteGrid"
                                                label="Select Minute"
                                                className='options'
                                            >
                                                <Form.Select aria-label="Floating label select example" className='g-2yes' onChange={(e) => {
                                                    // console.log(period);
                                                    // console.log(e.target.value);
                                                    // console.log(typeof (parseInt(e.target.value)));
                                                    // console.log(end_time_m[period - 1]);
                                                    end_time_m[period - 1] = Number(e.target.value);
                                                }}>
                                                    {minutes.map(minute => {
                                                        if (Math.floor(minute / 10) === 0) {
                                                            return <option value={minute}>0{minute}</option>
                                                        }
                                                        else {
                                                            return <option value={minute}>{minute}</option>
                                                        }
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
                <Button variant="danger" className='backto'>Back</Button>
                <Button variant="dark" onClick={addPeriodHandler}>Add Period</Button>
            </div>
            <div className="TimeRight">
                <p className='TimeHead'><u> Days </u></p>
                {days.map(day => {
                    return (
                        <div>
                            <Form.Check
                                inline
                                label={day.day}
                                name={day.day}
                                type='checkbox'
                                id={day.day}
                                onChange={(e) => {
                                    if (day.value === false) {
                                        day.value = true;
                                    }
                                    else {
                                        day.value = false;
                                    }
                                }}
                            />
                            <br />
                        </div>)
                })}
                <br />
                <Button variant="success" className='TimeBtn' onClick={saveHandler}>Save</Button>
            </div>
        </>
    )
}

export default TimeSel;
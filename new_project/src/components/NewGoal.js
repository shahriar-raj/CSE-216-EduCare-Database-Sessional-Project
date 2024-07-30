import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

import './NewGoal.css';

const NewGoal = props => {
    let [UserInput, setInput] = useState('');
    const addGoalHandler = event => {
        event.preventDefault();
        const newGoal = {
            id: Math.random().toString(),
            text: UserInput
        };
        props.onAddGoal(newGoal);
        setInput('');
        console.log(newGoal);
    };

    const textChangeHandler = event => {
        setInput(event.target.value);
    }

    const removeGoalHandler = event => {
        event.preventDefault();
        console.log(props);
    }

    return (
        <>
            <form className='F' onSubmit={addGoalHandler}>
                <div className="input-group mb-3">
                    <input type="text" class="form-control" value={UserInput} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" onChange={textChangeHandler} />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon1">submit</button>
                </div>
            </form>
        </>
    );
};

export default NewGoal;
import React from 'react';

const List = props => {
    console.log(props.io);
    return (
        <ol className='home-list'>
            {/* {[<li>Hello</li>,
            <li>This</li>,
            <li>WORKS</li>]} */}
            {props.io.map(gg => {
                return <li key={gg.id}>{gg.text}</li>;
            })}

            {/* {props.io.map(gg => {
                return <li>{gg.id}</li>;
            })} */}
        </ol>
    )
};

export default List;
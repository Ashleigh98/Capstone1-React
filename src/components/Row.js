import React from 'react';
import Cell from './Cell';

const Row = props =>{
//render cells using a map function and pass down data to the cell component
let cells = props.cells.map((data, index)=>{
return (
    <Cell key={index} data={data} revealCell={props.revealCell} flag={props.flag}/>
)
})
return(
    <div className='row'>{cells}</div>
)   
};

export default Row;
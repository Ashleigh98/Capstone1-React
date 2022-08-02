import React from 'react';
import { FaFlag } from 'react-icons/fa';

const Cell = props => {
    
    let displayCell =()=>{
        /*check if cell is open 
        nest the 2nd if statement in the 1st one which gives instructions based on the count condition
        if the count is 0 then it will open a blank div
        else if it has a mine it will show the mine
        else it will reveal the mine count around the clicked cell
        otherwise if the cell isnt open */
        if (props.data.isRevealed){
            if(props.data.count===0){
                //opens empty cell
                return(
                    <div 
                    onClick={()=>props.revealCell(props.data)}
                    onContextMenu={e=>{e.preventDefault()}} //prevent default removes the original rightclick action
                    className='open cell'>
                    </div>
                )
            } else if (props.data.hasMine){
                return(
                    //can place a flag
                    <div 
                    onClick={()=>props.revealCell(props.data)} 
                    onContextMenu={e=>{e.preventDefault();props.flag(props.data)}}
                    className='open cell mine'>
                    </div>
                )
            }else{
                return(
                    //reveal the mine count around the clicked cell
                    <div 
                    onClick={()=>props.revealCell(props.data)} 
                    className='open cell count'
                    onContextMenu={e=>{e.preventDefault()}}>
                        {props.data.count}
                    </div>
                ) 
            }
        }else if(props.data.hasFlag){
            return(
                //when right clicked a flag will be put down
                <div 
                className='open cell' 
                onContextMenu={e=>{e.preventDefault(); props.flag(props.data)}} >
                    <FaFlag className='flagIcon'/>
                </div>
            )
        } else {
            return(
            //closed cell
            <div 
            onClick={()=>props.revealCell(props.data)} 
            className='closed cell'
                onContextMenu={e=>{e.preventDefault(); props.flag(props.data)}}>
            </div>
            )
        }
    };
    return displayCell() //return the function
};

export default Cell;
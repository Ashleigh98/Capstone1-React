import React from 'react';
import swal from 'sweetalert'

/*In the top of the board there is a flag count, a play button and a help button */
const BoardTop = props =>{
    //I used sweetalert to show the instructions
    let requestHelp = () => {
        swal({
          title:'How to play:', 
          text: 'Click on the closed cells. Once it opens, it will show the bomb counts around the cell and if there are no bombs around it it will open blank cells. The count shows the amount of bombs around the center cell you clicked on. You have flags that can be placed down where you think there might be a bomb. You can click the flag once you have placed it to remove it from the board. Try to avoid all the bombs to win!',
          button: 'OK! You\'ve got this ',
        })
      }
    return(
        <div className='board-top'>
            <div className='flagsLeft'>Flags Used: {props.numOfFlags}</div>
            <button className='play-again' onClick={()=>window.location.reload(false)}>Reset</button>
            <button className='help' onClick={()=>requestHelp()} >Need Help?</button>
            </div>
    )
};

export default BoardTop;
import React, {Component} from 'react';
import './minesweeper.css'
import Board from './components/Board';
import BoardTop from './components/BoardTop';
import swal from 'sweetalert'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      rows: 10,
      columns: 10,
      flags: 0,
      numOfMines: 15,
      openCells: 0,
    }
}
/*I made a win function with sweetalert with a reset button that reloads the page and refreshes the board */
win = () =>{
    swal({
      text: 'Congratulations, you won!!',
      button: 'Reset',
    }).then(function(){ 
    window.location.reload();
    })
  }

flagClick = (amount) => {
  this.setState({
    flags: this.state.flags + amount //the amount lets the flag count decrease or increase
  })
}
/*I used sweetalert to make a popup for when a mine is clicked
and shows the user lost
the reset button will reload the page*/ 
gameOver = () => {
  swal({
    text:'Game over, You Lose',
    button: 'Reset',
  }).then(function(){ 
  window.location.reload();
  })
}

render(){
  //pass down the following as props
    return(
      <div className='App'>
        <h1>Minesweeper</h1>
        <div className='minesweeper-container'>
          <BoardTop 
          numOfFlags={this.state.flags}/>
          <Board 
          rows={this.state.rows} 
          columns={this.state.columns} 
          flagClick={this.flagClick}
          numOfMines={this.state.numOfMines}
          openCells={this.state.openCells}
          gameOver={this.gameOver}
          win={this.win}
          /> 
        </div>
        </div>
    )
  }
}

export default App;

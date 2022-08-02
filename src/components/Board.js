import React, {Component} from 'react';
import Row from '../components/Row';

/*I used Milkstarz Making Simple Minesweeper in React! on Youtube:https://www.youtube.com/watch?v=tfz1TssUfzM
to understand how to do this task*/ 

/*create state by using the board function below for the rows
the rows are essentiall the whole board*/
class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            rows: this.makeBoard(props) // the rows are the whole board which passes through props
        };
    }
    //function to make the board
    makeBoard = props => {
        let board = [];  //board set to an empty array (grid is a 2D array)
        /*nest for loops to create the rows and columns and use props passed down from parent component
        a lot of tutorials were similar with how the board is made but i prefer this way*/
        for(let r = 0; r < props.rows; r++){
         board.push([]); //push in empty array into board
            //create the cells and push the following information for each cell
            for(let c = 0; c< props.columns ; c++){
                board[r].push({
                //columns(j) will be  x and rows(i) will be y
                x: c,
                y: r,
                count: 0, //this will be the count for the amount of mines around a cell
                isRevealed: false,
                hasMine:false,
                hasFlag: false,
                })
            }
        }
        /*put mines into random cells
        create random rows and columns for the mines to be put in
        use math floor and random to get random cells
       */
        for(let i = 0; i < props.numOfMines; i++){
            let anyRow = Math.floor(Math.random()*props.rows);
            let anyColumn = Math.floor(Math.random()*props.columns);
            let cell = board[anyRow][anyColumn];
            /* the if statement checks if there is a mine already in the cell
            if there is a mine it goes back one increment so that one cell cant have more than 1 mine each */
            if(cell.hasMine){
                i--;
            }else{
                cell.hasMine = true
            }
        }
        return board;
    };

    //open cell function 
    revealCell = cell => {
        //make async function, it needs to wait until all the mines are found first
        let mineCount = new Promise(resolve => {
            let mines = this.locateMines(cell); //let mines = the function , pass through the cell
            resolve(mines); // resolve the mines
        });

        mineCount.then(mineNumber =>{ //get the mines then the following can happen

            let rows = this.state.rows; //get rows/board
            let openCell = this.props.openCells;
            let targetCell = rows[cell.y][cell.x]; //the x and y value in the board is used to target a specific cell
            
            if (targetCell.hasMine && openCell === 0){
            /*I just returned the gameOver function if a user clicks on a mine instead of showing the mine
            a popup shows that the user lost and they are able to reset the board*/ 
                return(
                    this.props.gameOver()
                )
            } else {
            /*if the cell doesnt have a flag and isnt open then the cell will open because isRevealed is set to true
            it will also show the number of mines(count) around the clicked cell */
                if(!cell.hasFlag && !targetCell.isRevealed){
        
                    targetCell.isRevealed = true;
                    targetCell.count = mineNumber;
                    this.setState({rows}); //set the state
                    
                    /*the following statement checks if there isnt a mine in the cell 
                    and if the surrounding mine count is 0, it will reveal the empty cells around the target  */
                    if(!targetCell.hasMine && mineNumber ===0){
                        this.revealAroundCell(cell);
                    }
                    /* the openClass varaible stores the number of open cells
                    the plus one makes up for the one missing */
                    let openClass = document.querySelectorAll('.open').length +1;
                    let totalCells = this.props.rows * this.props.columns // stores amount of all cells which is the area of the board
                    
                    /* the statement checks if the number of open cells match the amount of all the cells in the board 
                    except for the mines 
                    I did it this way because it isnt complicated*/
                    if(openClass === (totalCells - this.props.numOfMines)){
                        this.props.win() //call win function from app.js
                    }
                }
            }
        })
    }
   
    flag = cell =>{
        let rows = this.state.rows //get the board again
        cell.hasFlag =!cell.hasFlag; //allows the user to set a flag or to click it again to take it back
        this.setState({rows}) // set rows
        /*I made this so that when clicked it adds 1 to the flag count to show how many flags are used 
        and minuses 1 when removed*/
        this.props.flagClick(cell.hasFlag? 1:-1)
    }
    /*I used the youtube channel mentioned above to understand the following 2 functions
    this way was the easiest to understand because the same logic is used for the revealCellAround function so I used it instead of other examples
    which were much longer and more confusing*/
    locateMines = cell => { //to find all the mines
        let minesAround = 0; 
        /*if target cell is at position 0
        then let previous row = -1 and the row after the target row <= 1
        so that it loops from the previous cell to the cell after */
        for(let row = -1; row <= 1; row++){ 
            for (let column = -1; column <= 1; column++){ //same logic for the columns as the rows
                /*in case cell is on the end of the board (we check if it is positive),
                we don't want to return something that is not on the board.
                if the position of the cell and the index is >=0 and the same for the columns
                then the if statement will continue and if the condition isnt met it will do nothing*/
                if(cell.y + row >= 0 && cell.x + column >= 0){
                    /*check if the cell is valid within the row and column */
                    if(cell.y + row < this.state.rows.length && cell.x + column < this.state.rows[0].length){
                        /* lastly, we have to check if the cell that we are on has mine and is not at 0 (on the edges of the board), 
                        then only can we increment the minesAround count*/
                        if(this.state.rows[cell.y + row][cell.x + column].hasMine &&!(row === 0 && column === 0)){
                            minesAround++
                        }
                    }
                }
            }
        } 
        return minesAround ;
    }  
    //open surrounding cells
    revealAroundCell = cell => {
        let rows= this.state.rows; // get the board
        //same logic as the locateMine function
        for(let row = -1 ; row <= 1; row++){
            for(let column = -1; column <= 1; column++){
                if(cell.y + row >= 0 && cell.x + column >= 0){
                    if(cell.y + row < rows.length && cell.x + column < rows[0].length){
                        /* the diffrent part of this function is that it checks if the cell doesn't have a mine and isnt revealed
                        only then will it call the open cell function */
                        if(!rows[cell.y + row][cell.x + column].hasMine && !rows[cell.y + row][cell.x + column].isRevealed){
                            this.revealCell(rows[cell.y +row][cell.x + column]) //pass through the cell on the board
                        }
                    }
                }
            }
        }
    }
    render(){
    //render the rows using a map function with the keys being the index and pass down data to the row and cell component
    let rows = this.state.rows.map((row, index) => {
        return(
            <Row 
            cells={row} 
            key={index}
            revealCell={this.revealCell}
            flag={this.flag}
            />
        )
    })
    return(
        <div className='board'>
            {rows}
        </div>
    )
    }
};

export default Board;
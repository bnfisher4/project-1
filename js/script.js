/*----- constants -----*/
const PLAYERS = {
    'null': 'white',
    '1': 'Black',
    '-1': 'Red'
};


/*----- app's state (variables) -----*/
let grid;
let turn;
let winner;


/*----- cached element references -----*/
const messageEl = document.getElementById('message');
const slotsEls = document.querySelectorAll('.slot');
const dropEls = document.querySelectorAll('#drop');


/*----- event listeners -----*/
document.getElementById('restart').addEventListener('click', init);
// I want the drop button to release a game piece
document.getElementById('drop').addEventListener('click', handleClick);


/*----- functions -----*/
//need a function to toggle turns
//also need a function to release game piece to lowest empty row
function handleClick(evt) {
    if(winner) {
        return;
    }
    if (evt.target.tagName !== 'BUTTON') {
        return;
    }
    // call a function that will loop over particular index of the sub array
    let selectedColumn = evt.target.dataset.column;
    
    if(handleCheckColumn(selectedColumn)) {
        turn *= -1;
        winner = checkForWin();
        render();
    }
}
    
init();

function init() {
    //Player one starts
    turn = 1;
    //empty game board (grid)
    grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];
    //no winner when game starts
    winner = false;
    render();
}

function handleCheckColumn(columnIdx) {
   if (grid.every((elem) => !!elem[columnIdx])) return false;
    for(let i = 0; i < grid.length; i++) {
       if(grid[i][columnIdx]) {
           grid[i - 1][columnIdx] = turn;
           return true;
        } else if (i === grid.length - 1) {
            grid[i][columnIdx] = turn;
            return true;
       }
   }
   render();
}


function checkForWin() {
    let row = 0;
    let col = 0;
    while(row !== 6 && col !== 7) {
        let currentPosition = grid[row][col];
        //vertical
        if(grid[row - 1] !== undefined && grid[row - 2] !== undefined  && grid[row - 3] !== undefined ) {
            if (grid[row][col] == 1 && 
                grid[row - 1][col] == 1 && 
                grid[row - 2][col] == 1 && 
                grid[row - 3][col] == 1 ||
                grid[row][col] == -1 && 
                grid[row - 1][col] == -1 && 
                grid[row - 2][col] == -1 && 
                grid[row - 3][col] == -1) {
                    return currentPosition;
            }
        }
        //horizontal
        if (grid[row][col] == 1 &&
            grid[row][col - 1] == 1 && 
            grid[row][col - 2] == 1 && 
            grid[row][col - 3] == 1 ||
            grid[row][col] == -1 && 
            grid[row][col - 1] == -1 && 
            grid[row][col - 2] == -1 && 
            grid[row][col - 3] == -1) {
                return currentPosition;
        } 
        if (grid[row][col] == 1 &&
            grid[row][col + 1] == 1 && 
            grid[row][col + 2] == 1 && 
            grid[row][col + 3] == 1 ||
            grid[row][col] == -1 && 
            grid[row][col + 1] == -1 && 
            grid[row][col + 2] == -1 && 
            grid[row][col + 3] == -1) {
                return currentPosition;
        }
        row++
        if(row === 6) {
            row = 0
            col++
        }
    }
}


//I want to change the background color of the selected column idx
//the color should correspond with the player's turn

function render() {
    grid.forEach(function(rowArr, row) {
        rowArr.forEach(function(slot, idx) {
            slotsEls[(row * 7) + idx].style.backgroundColor = PLAYERS[slot]
        }) 
        //(row * 7) + idx <- This takes the row and multiples it by the
        // num of columns and then adds the idx of that column 
        // Ex) slot 10 = (row2 *7) + 3
    });
    if(!winner) {
        messageEl.textContent = `${PLAYERS[turn]}'s Turn`
    } else if (winner) {
        messageEl.textContent = `${PLAYERS[winner]} WINS!`
    };
}
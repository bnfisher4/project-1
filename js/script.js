/*----- constants -----*/
const PLAYERS = {
    'null': 'white',
    '1': 'Black',
    '-1': 'Green'
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
    let selectedColumn = evt.target.dataset.column;
    //console.log(selectedColumn)
    // call a function that will loop over particular index of the sub array
    handleCheckColumn(selectedColumn);

    if (evt.target.tagName !== 'BUTTON')
    return;

    turn *= -1;
    render();
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
   for(let i = 0; i < grid.length; i++) {
       if(grid[i][columnIdx]) {
           grid[i - 1][columnIdx] = turn;
           return;
        } else if (i === grid.length - 1) {
            grid[i][columnIdx] = turn;
       }
   }
   render();
}


function checkForWinner() {
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++)
        if(Math.abs(grid[i][j] + grid[i + 1][j] + grid[i +2][j] + grid[i + 3][j]) === 4)
        //return grid[row[i][j]];
        console.log(grid[i][j]);
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

     //console.log('grid: ', grid)
}
 //console.log(slotsEls);

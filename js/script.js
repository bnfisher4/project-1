/*----- constants -----*/
const PLAYERS = {
    'null': 'white',
    '1': 'black',
    '-1': 'green'
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
    console.log(selectedColumn)
    // call a function that will loop over particular index of the sub array
    handleCheckColumn(selectedColumn);
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


// function checkForWinner() {
//     for(let i = 0; i < grid.length; i++) {
//         if(Math.abs()
//     }
// }



function render() {
    grid.forEach(function(rowArr, row) {
        rowArr.forEach(function(slot, idx) {
            slotsEls[(row * 7) + idx].style.backgroundColor = PLAYERS[slot]
        }) 
        //(row * 7) + idx <- This takes the row and multiples it by the
        // num of columns and then adds the idx of that column 
        // Ex) slot 10 = (row2 *7) + 3

        //I want to change the background color of the selected column idx
        //if the bottom row is null or slot below is taken
        //using the drop button above the column
        //the color should correspond with the player's turn
    });
     console.log('grid: ', grid)
}
 console.log(slotsEls);

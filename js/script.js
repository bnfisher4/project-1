/*----- constants -----*/
const PLAYERS = {
    null: 'white',
    '1': 'blue',
    '-1': 'green'
};

 

/*----- app's state (variables) -----*/
let grid;
let turn;
let winner;

/*----- cached element references -----*/
const messageEl = document.getElementById('message');
const slotsEls = document.querySelectorAll('.slot');

/*----- event listeners -----*/
document.getElementById('restart').addEventListener('click', init);
// I want the drop button to release a game piece
document.getElementById('drop').addEventListener('click', handleClick);



/*----- functions -----*/
//need a function to toggle turns
//also need a function to release game piece to lowest empty row
function handleClick(evt) {
    let selectedColumn = evt.target.dataset.column;
    
    turn *= -1;
    render();
}
    
init();

function init() {
    //Player one starts
    turn = 1;
    //empty game board (grid)
    grid = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ];
    //no winner when game starts
    winner = false;
    render();
}

function render() {

}


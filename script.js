'use strict';

// Elements put inside variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');

let diceEl = document.querySelector('.dice');
let playing = true;

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

diceEl.classList.add('hidden');


current0El.textContent = 0;
current1El.textContent = 0;
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayer = 0;
let currentScore = 0;
const scores = [0, 0];

// button roll funtion
function buttonRoll() {
    if (playing) {
        // Random dice number
        let dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //Dice change on click
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // Add in current score
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 1 ? 0 : 1;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }
    }
}

btnRoll.addEventListener('click', buttonRoll);

// btn hold function
function buttonHold() {
    if (playing) {
        // Add score to total
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;

        // winner
        if (scores[activePlayer] >= 50) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.remove('hidden');;
        } else {
            activePlayer = activePlayer === 1 ? 0 : 1;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');

        }
    }
}
btnHold.addEventListener('click', buttonHold);

function newGame() {
    playing = true;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    scores[0] = 0;
    scores[1] = 0;
    diceEl.classList.add('hidden');
    activePlayer = activePlayer === 1 ? 0 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

};

btnNew.addEventListener('click', newGame);
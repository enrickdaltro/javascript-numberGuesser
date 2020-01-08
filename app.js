// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const input = document.querySelector('#guess-input');
const btnSubmit = document.querySelector('#guess-btn');
const message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// event listener for btn guess
btnSubmit.addEventListener('click', guessingNumber);

// play again event listener
game.addEventListener('mousedown', playAgain);

// playAgain funciotn
function playAgain(e) {
    e.target.className === 'play-again' ? window.location.reload() : '';
}
// guessing number function
function guessingNumber() {
    // transfor our input into a number
    let guess = parseInt(input.value);
    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        gameOver(true, `Congratulations, you win! ${winningNum} is correct!`);
    } else {
        // wrong number
        guessesLeft -= 1;
        // Game over - Lost
        if (guessesLeft === 0) {
            gameOver(false, `You lost! The correct answer was ${winningNum}`);
        } else {
            // Game continues - answer wrong
            // change border color
            input.style.borderColor = 'red';
            // set message
            setMessage(
                `${guess} is not correct, ${guessesLeft} guesses left`,
                'red'
            );
            // clear input
            input.value = '';
        }
    }
}
// game over
function gameOver(won, msg) {
    let color;
    won === true ? (color = 'green') : (color = 'red');
    // disable input
    input.disabled = true;
    // change border color
    input.style.borderColor = color;
    // change text message
    message.style.color = color;
    // set message
    setMessage(msg);
    // play again?
    btnSubmit.value = 'Play Again';
    btnSubmit.className += 'play-again';
}
// get winning num function
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// set message function
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

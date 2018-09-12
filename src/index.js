import getPuzzle from './Requests'
import Hangman from './Hangman'

const puzzleElement = document.querySelector('#puzzle');
const guessesElement = document.querySelector('#guesses');
let game;

window.addEventListener('keypress', e => {
    const guess = e.key;
    game.makeGuess(guess);
    render()
});

const render = () => {
    puzzleElement.innerHTML = '';
    guessesElement.textContent = game.statusMessage;

    game.puzzle.split('').forEach((letter) => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        puzzleElement.appendChild(letterElement)
    });
};

const startGame = async () => {
    const puzzle = await getPuzzle('2');
    game = new Hangman(puzzle, 5);
    render()
};

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

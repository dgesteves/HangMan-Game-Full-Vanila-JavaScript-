class Hangman {
    constructor(word, guessesRemaining) {
        this.word = word.toLowerCase().split('');
        this.guessesRemaining = guessesRemaining;
        this.guessedLetters = [];
        this.status = 'playing';
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.guessesRemaining}.`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else {
            return 'Great work! You guessed the word.'
        }
    }

    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ');
        if (this.guessesRemaining === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

    get puzzle() {
        let puzzle = '';
        this.word.forEach(letter => puzzle = this.guessedLetters.includes(letter) || letter === ' ' ? puzzle += letter : puzzle += '*');
        return puzzle;
    }

    makeGuess(guess) {
        guess = guess.toLowerCase();
        const isUnique = !this.guessedLetters.includes(guess);
        const isBadGuess = !this.word.includes(guess);
        if (this.status !== 'playing') {
            return
        }
        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess];
        }
        if (isUnique && isBadGuess) {
            this.guessesRemaining--;
        }
        this.calculateStatus();
    }
}

export {Hangman as default}

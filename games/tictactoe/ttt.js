let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}


class TicTacToe {
    constructor() {
        // Load saved game state or initialize new game
        const savedState = this.loadGameState();
        
        if (savedState) {
            this.currentPlayer = savedState.currentPlayer;
            this.board = savedState.board;
            this.gameActive = savedState.gameActive;
            this.score = savedState.score;
        } else {
            this.currentPlayer = 'X';
            this.board = Array(9).fill('');
            this.gameActive = true;
            this.score = {
                X: parseInt(localStorage.getItem('Xwins')) || 0,
                O: parseInt(localStorage.getItem('Owins')) || 0
            };
        }

        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.result = document.querySelector('.result');
        this.playAgainBtn = document.querySelector('.play-again');
        this.currentPlayerDisplay = document.querySelector('.current-player');
        this.xScoreDisplay = document.querySelector('.x-score');
        this.oScoreDisplay = document.querySelector('.o-score');

        // Initialize
        this.initializeGame();
        this.updateScore();
        
        // If there's a saved game, restore the board display
        if (savedState) {
            this.restoreBoardDisplay();
            if (!this.gameActive) {
                this.playAgainBtn.hidden = false;
                if (this.checkWin()) {
                    this.result.textContent = `${this.currentPlayer} Wins!`;
                } else if (this.checkDraw()) {
                    this.result.textContent = "It's a Draw!";
                }
            }
        }
    }

    saveGameState() {
        const gameState = {
            currentPlayer: this.currentPlayer,
            board: this.board,
            gameActive: this.gameActive,
            score: this.score
        };
        localStorage.setItem('tictactoeState', JSON.stringify(gameState));
    }

    loadGameState() {
        const savedState = localStorage.getItem('tictactoeState');
        return savedState ? JSON.parse(savedState) : null;
    }

    restoreBoardDisplay() {
        this.cells.forEach((cell, index) => {
            const value = this.board[index];
            if (value) {
                cell.textContent = value;
                cell.dataset.player = value;
                cell.disabled = true;
            }
        });
        this.currentPlayerDisplay.textContent = this.currentPlayer;
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        this.playAgainBtn.addEventListener('click', () => this.resetGame());
    }

    handleCellClick(cell) {
        const index = cell.dataset.index;

        if (this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.dataset.player = this.currentPlayer;
            cell.disabled = true;

            if (this.checkWin()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.switchPlayer();
            }
            
            // Save game state after each move
            this.saveGameState();
        }
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.result.textContent = `${this.currentPlayer} Wins!`;
        this.score[this.currentPlayer]++;
        localStorage.setItem(`${this.currentPlayer}wins`, this.score[this.currentPlayer]);
        this.updateScore();
        this.playAgainBtn.hidden = false;
        this.saveGameState();
    }

    handleDraw() {
        this.gameActive = false;
        this.result.textContent = "It's a Draw!";
        this.playAgainBtn.hidden = false;
        this.saveGameState();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.currentPlayerDisplay.textContent = this.currentPlayer;
    }

    updateScore() {
        this.xScoreDisplay.textContent = this.score.X;
        this.oScoreDisplay.textContent = this.score.O;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.currentPlayerDisplay.textContent = this.currentPlayer;
        this.result.textContent = '';
        this.playAgainBtn.hidden = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.disabled = false;
            cell.dataset.player = '';
        });
        
        // Save the reset game state
        this.saveGameState();
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

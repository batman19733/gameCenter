localStorage.clear()
class CheckersGame {
    constructor() {
        this.board = [];
        this.selectedPiece = null;
        this.currentPlayer = 'red';
        this.validMoves = [];
        this.isProcessing = false;
        this.gameOver = false;
        this.playerWins = parseInt(localStorage.getItem('checkers_player_wins')) || 0;
        this.aiWins = parseInt(localStorage.getItem('checkers_ai_wins')) || 0;
        this.updateStatsDisplay();
        this.initializeBoard();
        this.setupEventListeners();
    }

    updateStatsDisplay() {
        document.getElementById('player-wins').textContent = this.playerWins;
        document.getElementById('ai-wins').textContent = this.aiWins;
    }

    initializeBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        this.board = [];

        for (let row = 0; row < 8; row++) {
            this.board[row] = [];
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = `cell ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.style.position = 'relative';
                boardElement.appendChild(cell);

                if ((row + col) % 2 === 1) {
                    if (row < 3) {
                        this.createPiece(row, col, 'black-piece');
                    } else if (row > 4) {
                        this.createPiece(row, col, 'red');
                    }
                }
            }
        }
        this.updateStatus();
    }

    createPiece(row, col, type) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const piece = document.createElement('div');
        piece.className = `piece ${type}`;
        piece.style.position = 'relative';
        piece.style.zIndex = '999';
        cell.appendChild(piece);
        this.board[row][col] = { type, isKing: false };
    }

    setupEventListeners() {
        document.getElementById('board').addEventListener('click', (e) => {
            if (this.isProcessing || this.gameOver || this.currentPlayer !== 'red') return;
            
            const cell = e.target.closest('.cell');
            if (!cell) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.handleCellClick(row, col);
        });

        document.getElementById('play-again').addEventListener('click', () => {
            this.gameOver = false;
            this.currentPlayer = 'red';
            this.initializeBoard();
            document.getElementById('play-again').classList.remove('visible');
        });
    }

    handleCellClick(row, col) {
        const piece = this.board[row][col];

        // If clicking on a red piece
        if (piece?.type === 'red') {
            this.clearSelection();
            const moves = this.getValidMoves(row, col);
            if (moves.length > 0) {
                this.selectedPiece = { row, col };
                document.querySelector(`[data-row="${row}"][data-col="${col}"] .piece`).classList.add('selected');
                this.validMoves = moves;
                this.showValidMoves();
            }
            return;
        }

        // If clicking on a valid destination
        if (this.selectedPiece) {
            const move = this.validMoves.find(m => m.toRow === row && m.toCol === col);
            if (move) {
                this.movePiece(move);
                this.clearSelection();
                if (!this.checkWinner()) {
                    setTimeout(() => this.makeAIMove(), 300);
                }
            } else {
                this.clearSelection();
            }
        }
    }

    clearSelection() {
        if (this.selectedPiece) {
            const piece = document.querySelector(`[data-row="${this.selectedPiece.row}"][data-col="${this.selectedPiece.col}"] .piece`);
            if (piece) piece.classList.remove('selected');
            document.querySelectorAll('.valid-move').forEach(cell => cell.classList.remove('valid-move'));
            this.selectedPiece = null;
            this.validMoves = [];
        }
    }

    showValidMoves() {
        this.validMoves.forEach(move => {
            const cell = document.querySelector(`[data-row="${move.toRow}"][data-col="${move.toCol}"]`);
            if (cell) cell.classList.add('valid-move');
        });
    }

    movePiece(move) {
        const { fromRow, fromCol, toRow, toCol, isJump, jumpedRow, jumpedCol } = move;
        
        // Get elements
        const fromCell = document.querySelector(`[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toCell = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
        const piece = fromCell.querySelector('.piece');
        
        // Calculate movement
        const rect = toCell.getBoundingClientRect();
        const fromRect = fromCell.getBoundingClientRect();
        const deltaX = rect.left - fromRect.left;
        const deltaY = rect.top - fromRect.top;

        // Animate movement
        piece.style.transition = 'transform 0.3s ease-out';
        piece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        setTimeout(() => {
            // Reset piece position and move it to new cell
            piece.style.transition = '';
            piece.style.transform = '';
            toCell.appendChild(piece);

            // Update board state
            this.board[toRow][toCol] = this.board[fromRow][fromCol];
            this.board[fromRow][fromCol] = null;

            // Handle captured piece
            if (isJump) {
                const jumpedCell = document.querySelector(`[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`);
                const jumpedPiece = jumpedCell.querySelector('.piece');
                if (jumpedPiece) {
                    jumpedPiece.style.transition = 'opacity 0.2s';
                    jumpedPiece.style.opacity = '0';
                    setTimeout(() => jumpedPiece.remove(), 200);
                }
                this.board[jumpedRow][jumpedCol] = null;
            }

            // Handle king promotion
            if ((this.board[toRow][toCol].type === 'red' && toRow === 0) ||
                (this.board[toRow][toCol].type === 'black-piece' && toRow === 7)) {
                this.board[toRow][toCol].isKing = true;
                piece.classList.add('king');
            }

            // Switch turns
            this.currentPlayer = this.currentPlayer === 'red' ? 'black-piece' : 'red';
            this.updateStatus();
        }, 300);
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const moves = [];
        const directions = piece.isKing ? [-1, 1] : piece.type === 'red' ? [-1] : [1];

        // Check for jumps first
        for (const dRow of directions) {
            for (const dCol of [-1, 1]) {
                if (this.canJump(row, col, dRow, dCol)) {
                    moves.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: row + dRow * 2,
                        toCol: col + dCol * 2,
                        isJump: true,
                        jumpedRow: row + dRow,
                        jumpedCol: col + dCol
                    });
                }
            }
        }

        // If no jumps are available, check for regular moves
        if (moves.length === 0) {
            for (const dRow of directions) {
                for (const dCol of [-1, 1]) {
                    const newRow = row + dRow;
                    const newCol = col + dCol;
                    if (this.isValidMove(newRow, newCol)) {
                        moves.push({
                            fromRow: row,
                            fromCol: col,
                            toRow: newRow,
                            toCol: newCol,
                            isJump: false
                        });
                    }
                }
            }
        }

        return moves;
    }

    canJump(row, col, dRow, dCol) {
        const newRow = row + dRow * 2;
        const newCol = col + dCol * 2;
        const jumpedRow = row + dRow;
        const jumpedCol = col + dCol;

        if (!this.isValidMove(newRow, newCol)) return false;

        const jumpedPiece = this.board[jumpedRow]?.[jumpedCol];
        return jumpedPiece && jumpedPiece.type !== this.board[row][col].type;
    }

    isValidMove(row, col) {
        if (row < 0 || row > 7 || col < 0 || col > 7) return false;
        return !this.board[row][col];
    }

    makeAIMove() {
        this.isProcessing = true;
        let allMoves = [];
        let jumpMoves = [];

        // Collect all possible moves
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row]?.[col]?.type === 'black-piece') {
                    const moves = this.getValidMoves(row, col);
                    moves.forEach(move => {
                        if (move.isJump) jumpMoves.push(move);
                        else allMoves.push(move);
                    });
                }
            }
        }

        // Prefer jumps over regular moves
        const moveToMake = jumpMoves.length > 0 ? 
            jumpMoves[Math.floor(Math.random() * jumpMoves.length)] :
            allMoves[Math.floor(Math.random() * allMoves.length)];

        if (moveToMake) {
            this.movePiece(moveToMake);
            setTimeout(() => {
                this.checkWinner();
                this.isProcessing = false;
            }, 300);
        } else {
            this.isProcessing = false;
        }
    }

    checkWinner() {
        let redPieces = 0;
        let blackPieces = 0;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    if (piece.type === 'red') redPieces++;
                    else blackPieces++;
                }
            }
        }

        if (redPieces === 0) {
            this.endGame('AI');
            return true;
        } else if (blackPieces === 0) {
            this.endGame('Player');
            return true;
        }
        return false;
    }

    endGame(winner) {
        this.gameOver = true;
        if (winner === 'Player') {
            this.playerWins++;
            document.getElementById('status').textContent = 'You won! 🎉';
        } else {
            this.aiWins++;
            document.getElementById('status').textContent = 'AI won!';
        }
        localStorage.setItem('checkers_player_wins', this.playerWins);
        localStorage.setItem('checkers_ai_wins', this.aiWins);
        this.updateStatsDisplay();
        document.getElementById('play-again').classList.add('visible');
    }

    updateStatus() {
        if (!this.gameOver) {
            document.getElementById('status').textContent = 
                this.currentPlayer === 'red' ? 'Your turn' : 'AI is thinking...';
        }
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    new CheckersGame();
}); 
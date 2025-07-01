function evaluateBoard() {
    let score = 0;
    const pieceCounts = countAllPieces();

    if (pieceCounts.kingb === 0) score -= 99999999;
    if (pieceCounts.kingw === 0) score += 50000000;

    score += pieceCounts.pawnb;
    score -= pieceCounts.pawnw;

    score += pieceCounts.horseb * 3;
    score -= pieceCounts.horsew * 3;

    score += pieceCounts.bishopb * 3;
    score -= pieceCounts.bishopw * 3;

    score += pieceCounts.rookb * 5;
    score -= pieceCounts.rookw * 5;

    score += pieceCounts.queenb * 9;
    score -= pieceCounts.queenw * 9;

    score += amountOfXInRowY('pawnb', 7) * 9;
    score -= amountOfXInRowY('pawnw', 0) * 9;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = grid[row][col];
            if (piece === 'pawnb') score += row * 0.3;
            if (piece === 'pawnw') score -= (7 - row) * 0.3;
        }
    }

    score += findLegalMoves('b').length * 0.1;
    score -= findLegalMoves('w').length * 0.1;

    return score;
}
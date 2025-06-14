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

    return score;
}
function evaluateBoard(depth) {
    let score = 0

    let piecesAmount = checkAmountOfEveryThing()

    if (piecesAmount.blackKing === 0) {score -= 99999; score -= depth}
    if (piecesAmount.whiteKing === 0) {score += 9999; score += depth}

    score += piecesAmount.blackPawn * 1
    score -= piecesAmount.whitePawn * 1

    score += piecesAmount.blackRook * 5
    score -= piecesAmount.whiteRook * 5

    score += piecesAmount.blackKnight * 3
    score -= piecesAmount.whiteKnight * 3
    
    score += piecesAmount.blackBishop * 3
    score -= piecesAmount.whiteBishop * 3

    score += piecesAmount.blackQueen * 9
    score -= piecesAmount.whiteQueen * 9

    score += findLegalMoves('b').length * 0.1;
    score -= findLegalMoves('w').length * 0.1;
    return score
}
function checkAmountOfEveryThing() {
    const counts = {
        whitePawn: 0,
        blackPawn: 0,
        whiteRook: 0,
        blackRook: 0,
        whiteKnight: 0,
        blackKnight: 0,
        whiteBishop: 0,
        blackBishop: 0,
        whiteQueen: 0,
        blackQueen: 0,
        whiteKing: 0,
        blackKing: 0
    };

    for (let i = 0; i < index ** 2; i++) {
        const cell = grid[i];
        if (cell && cell !== 0) {
            switch (cell) {
                case 1: counts.blackPawn++; break;
                case 2: counts.blackRook++; break;
                case 3: counts.blackKnight++; break;
                case 4: counts.blackBishop++; break;
                case 5: counts.blackKing++; break;
                case 6: counts.blackQueen++; break;
                case 7: counts.whitePawn++; break;
                case 8: counts.whiteRook++; break;
                case 9: counts.whiteKnight++; break;
                case 10: counts.whiteBishop++; break;
                case 11: counts.whiteKing++; break;
                case 12: counts.whiteQueen++; break;
            }
        }
    }

    return counts;
}
function isDraw() {
    if (findLegalMoves('w')?.[0] === undefined & findLegalMoves('b')?.[0] === undefined & findAmountOfColor('w') !== 0 & findAmountOfColor('b') !== 0) {
        return true
    } else return false
}

function countAllPieces() {
    const pieceCounts = {
        pawnb: 0, pawnw: 0,
        horseb: 0, horsew: 0,
        bishopb: 0, bishopw: 0,
        rookb: 0, rookw: 0,
        queenb: 0, queenw: 0,
        kingb: 0, kingw: 0,
    };
    for(let i=0; i < index**2; i++) {
        let [row, col] = AFN(i);
        const cell = grid[row][col];
        if(cell && pieceCounts.hasOwnProperty(cell)) {
            pieceCounts[cell]++;
        }
    }
    return pieceCounts;
}
function findAmountOfColor(color) {
    let count = 0
    for(let i=0; i<index**2;i++) {
        let [row, col] = AFN(i)
        if(grid[row][col] !== null) {
            let c = grid[row][col]
            c = c.split('').pop('')
            if (c === color) {
                count++
            }
        }
    }
    return count
}
function didXwin(color) {
    if (findLegalMoves(color)?.[0] === undefined & findLegalMoves(color === 'w'? 'b':'w')?.[0] !== undefined) {
        return true
    } else return false
}
let currentDepth = 2
let lastMove;
function botTurn() {
    if (lastMove !== undefined) {
        let {put, remove} = lastMove
        let [removeAA, removeAB] = put
        let [removeBA, removeBB] = remove
        if((removeAA + removeAB) % 2 === 0) {q(`c${NFA([removeAA, removeAB])}`).style.backgroundColor = 'white' } else {q(`c${NFA([removeAA, removeAB])}`).style.backgroundColor = '#6AB293'}
        if((removeBA + removeBB) % 2 === 0) {q(`c${NFA([removeBA, removeBB])}`).style.backgroundColor = 'white' } else {q(`c${NFA([removeBA, removeBB])}`).style.backgroundColor = '#6AB293'}
    }
    const moves = findLegalMoves('b')
    let bestScore = -Infinity
    let bestMove;
    let removedSpot;
    let bestPiece
    const startTime = performance.now();
    for(let i = 0; i<moves.length;i++) {
        let {put, remove} = moves[i]
        let [putR, putC] = put
        let [removeR, removeC] = remove
        removedSpot = grid[removeR][removeC]
        let removedPut = grid[putR][putC]
        grid[putR][putC] = removedSpot
        grid[removeR][removeC] = null
        score = minimax(currentDepth, false)
        grid[putR][putC] = removedPut
        grid[removeR][removeC] = removedSpot
        if (score > bestScore) {
            bestScore = score
            bestMove = {put: [putR, putC], remove: [removeR, removeC]}
            bestPiece = grid[removeR][removeC]
        }
    }
    lastMove = bestMove
    let {put, remove} = bestMove
    let [putR, putC] = put
    q(`c${NFA([putR, putC])}`).style.backgroundColor = 'green'
    let [removeR, removeC] = remove
    q(`c${NFA([removeR, removeC])}`).style.backgroundColor = 'lightgreen'
    bestPiece = bestPiece.split('')
    bestPiece.pop()
    bestPiece = bestPiece.join('').replace(',','')
    g$q([[putR, putC]], bestPiece, 'black')
    grid[removeR][removeC] = null
    q(`c${NFA([removeR, removeC])}`).innerHTML = ''
    makeQueen()
    q('tr').innerHTML = 'Your turn'
    disableKill = false
    disable = false
    const endTime = performance.now();
    const estimatedTimeFor10Runs = (endTime - startTime) * 10;
    if (estimatedTimeFor10Runs <= 3500) {
        currentDepth++;
    }
}
function minimax(depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
   if (depth === 0 | isDraw() | didXwin('w') | didXwin('b')) {
       return evaluateBoard()
   }

    if (isMaximizing) {
        const moves = findLegalMoves('b')
        let bestScore = -Infinity
        for(let i =0; i<moves.length;i++) {
            let {put, remove} = moves[i]
            let [putR, putC] = put
            let [removeR, removeC] = remove
            let removedSpot = grid[removeR][removeC]
            let removedPut = grid[putR][putC]
            grid[putR][putC] = removedSpot
            grid[removeR][removeC] = null
            score = minimax(depth-1, false, alpha, beta)
            grid[putR][putC] = removedPut
            grid[removeR][removeC] = removedSpot
            if (score > bestScore) {
                bestScore = score
            }
            alpha = Math.max(alpha, score)
            if (beta <= alpha) return bestScore;
        }
        return bestScore
    } else {
        const moves = findLegalMoves('w')
        let bestScore = Infinity
        for(let i =0; i<moves.length;i++) {
        let {put, remove} = moves[i]
        let [putR, putC] = put
        let [removeR, removeC] = remove
        let removedSpot = grid[removeR][removeC]
        let removedPut = grid[putR][putC]
        grid[putR][putC] = removedSpot
        grid[removeR][removeC] = null
        score = minimax(depth-1, true, alpha, beta)
        grid[putR][putC] = removedPut
        grid[removeR][removeC] = removedSpot
        if (score < bestScore) {
            bestScore = score
        }
        beta = Math.min(beta, score)
        if (beta <= alpha) return bestScore;
        }
        return bestScore
    }
}
let tillEndSpots = []
let tillEndRemoveSpot = []
function findLegalMoves(color) {
    let legalMoves = []
    for(let i = 0; i<index**2;i++) {
        let [r, c] = AFN(i)
        if (grid[r][c] !== null) {
            let side = grid[r][c]
            side = side.split('').pop()
            if (side === color) {
                let piece = grid[r][c].split('') // to here
                piece.pop()
                piece = piece.join().replaceAll(',', '')
                if (piece === 'pawn') {
                    if (r === (color === 'b' ? 1:6)) {
                        if (grid[r+(color === 'b' ? 2:-2)]?.[c] === null && grid[r+(color === 'b' ? 1:-1)]?.[c] === null) {
                            
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c], remove: [r, c]})
                            legalMoves.push({put: [r+(color === 'b' ? 2:-2), c], remove: [r, c]})
                        }
                        else if (grid[r+(color === 'b' ? 1:-1)]?.[c] === null) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c], remove: [r, c]})
                        } // move 

                        let leftKill = grid[r+(color === 'b' ? 1:-1)]?.[c-1]
                        if (leftKill) {leftKill = leftKill.split('').pop()}

                        let rightKill = grid[r+(color === 'b' ? 1:-1)]?.[c+1]
                        if (rightKill) {rightKill = rightKill.split('').pop()}

                        if (leftKill === (color === 'b'? 'w':'b')) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c-1], remove: [r, c]})
                        } 
                        if (rightKill === (color === 'b'? 'w':'b')) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c+1], remove: [r, c]})
                        }// kill
                    } else {
                        if (r+1 > 7) return
                        let nextColor = grid[r+(color === 'b'? 1:-1)]?.[c]

                        if (nextColor === null) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c], remove: [r, c]}) // move
                        }

                        let leftKill = grid[r+(color === 'b' ? 1:-1)]?.[c-1] // kill
                        if (leftKill !== null & leftKill !== undefined) {leftKill = leftKill.split('').pop()}

                        let rightKill = grid[r+(color === 'b' ? 1:-1)]?.[c+1]
                        if (rightKill !== null & rightKill !== undefined) {rightKill = rightKill.split('').pop()}

                        if (leftKill === (color === 'b'? 'w':'b')) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c-1], remove: [r, c]})
                        } 
                        if (rightKill === (color === 'b'? 'w':'b')) {
                            legalMoves.push({put: [r+(color === 'b' ? 1:-1), c+1], remove: [r, c]})
                        }// kill
                    }
                }
                if (piece !== 'pawn') {
                    moves = pieces[piece].legalMoves
                    if (moves[0] === '...') {
                        tillEndSpots = []
                        tillEndRemoveSpot = [r, c]
                        moves.forEach(move => {
                            if (move !== '...') {
                                moveTillEnd(move, [r, c], color)
                            }
                        })
                        tillEndSpots.forEach(spot => {
                            legalMoves.push(spot)
                        })
                    } else {
                        moves.forEach(move => {
                            let [row, col] = move
                            if (r+row > 7 | c+col > 7 | r+row < 0 | c+col < 0 ) return
                            let spot = grid[r+row][c+col]
                            if (spot !== null & spot !== undefined) {
                                spot = spot.split('').pop()
                            }
                            if (spot === color) return
                            legalMoves.push({put: [r+row, c+col], remove: [r, c]})
                        })
                    }
                }
            }
        }
    }
    return legalMoves
}
function moveTillEnd(move, currentMove, color) {
    let [r, c] = currentMove
    let [row, col] = move
    if (r+row > 7 | c+col > 7 | r+row < 0 | c+col < 0 ) return
    let newPlaceColor = grid[r+row][c+col]
    if (newPlaceColor !== null & newPlaceColor !== undefined) {
        newPlaceColor = newPlaceColor.split('').pop()
    }
    if (newPlaceColor === color) return
    tillEndSpots.push({put: [r+row, c+col], remove: tillEndRemoveSpot})
    r = r+row
    c = c+col
    if (newPlaceColor === (color === 'b'? 'w':'b')) return
    moveTillEnd(move, [r,c], color)
}
function makeQueen() {
    for(let i =0;i<index**2;i++) {
        let [row, col] = AFN(i)
        if (row === 0) {
            if (grid[row][col] === 'pawnw') {
                g$q([[row, col]], 'queen', 'white')
            }
        }
        if (row === 7) {
            if (grid[row][col] === 'pawnb') {
                g$q([[row, col]], 'queen', 'black')
            } 
        }
    }
}
function amountOfXInRowY(piece, row) {
    count = 0
    for(let col = 0; col<8; col++) {
        if(grid[row][col] === piece) {count++}
    }
    return count
}
const index = 8
let boardHTML = ''

const whitePiece = num => `<div class="piece white p${num}w" onclick="showGrayMoves(event)">w</div>`
const grayPiece = (num, spot) => `<div class="piece gray g${num}g" onclick="moveTo(${spot}, ${num})">g</div>`
const blackPiece = num => `<div class="piece black p${num}b">b</div>`
for(i = 0; i<index**2;i++) {
    boardHTML += `<div class="cube c${i}a center-div"></div>`
}
q('board').innerHTML = boardHTML
grid = Array.from({length: index}, () => Array(index).fill(null))

for(i = 0; i<index**2;i++) {
    let [row, col] = TTAFN(i)
    const whiteCube = row % 2 === 1? (col % 2 === 1? true:false):(col % 2 === 0? true:false)
    const black = row < 3? (row % 2 === 0? (col % 2 === 1? true:false):(col % 2 === 0? true:false)):false
    const white = row > 4? (row % 2 === 0? (col % 2 === 1? true:false):(col % 2 === 0? true:false)):false
    if (whiteCube) {q(`c${i}a`).classList.add('light')} else {q(`c${i}a`).classList.add('dark')}
    if (white) {
        q(`c${i}a`).innerHTML = whitePiece(i)
        let [row, col] = TTAFN(i)
        grid[row][col] = 'w'
    }
    if (black) {
        q(`c${i}a`).innerHTML = blackPiece(i)
        grid[row][col] = 'b'
    }
}
let grayMoves = []
function showGrayMoves(e) {
    classNum = Number(e.target.className.split(' ')[2].replace(/[^0-9]/g, ''))
    let [row, col] = TTAFN(classNum)
    if (grayMoves[0] !== undefined) {
        grayMoves.forEach(move => {
            let [row, col] = move
            q(`c${TTNFA([row, col])}a`).innerHTML = ''
            grayMoves = []
        })
    } // remove old gray pieces

    if (grid[row-1]?.[col-1] === null) {
        q(`c${TTNFA([row-1, col-1])}a`).innerHTML = grayPiece(TTNFA([row-1, col-1]), 1)
        grayMoves.push([row-1, col-1])
    }
    if (grid[row-1]?.[col+1] === null) {
        q(`c${TTNFA([row-1, col+1])}a`).innerHTML = grayPiece(TTNFA([row-1, col+1]), 2)
        grayMoves.push([row-1, col+1])
    }
    if(grid[row-1]?.[col-1] === 'b' & grid[row-2]?.[col-2] === null) {
        q(`c${TTNFA([row-2, col-2])}a`).innerHTML = grayPiece(TTNFA([row-2, col-2]), 3)
        grayMoves.push([row-2, col-2])
    }
    if(grid[row-1]?.[col+1] === 'b' & grid[row-2]?.[col+2] === null) {
        q(`c${TTNFA([row-2, col+2])}a`).innerHTML = grayPiece(TTNFA([row-2, col+2]), 4)
        grayMoves.push([row-2, col+2])
    }   // show avaiable moves
}
function moveTo(spot, num) {
    if (grayMoves[0] !== undefined) {
        grayMoves.forEach(move => {
            let [row, col] = move
            q(`c${TTNFA([row, col])}a`).innerHTML = ''
            grayMoves = []
        })
    } // remove old gray pieces
    let [row, col] = TTAFN(num)
    grid[row][col] = 'w'
    q(`c${num}a`).innerHTML = whitePiece(num)
    if (spot === 1) {grid[row+1][col+1] = null; q(`c${TTNFA([row+1, col+1])}a`).innerHTML = ''}
    else if (spot === 2) {grid[row+1][col-1] = null; q(`c${TTNFA([row+1, col-1])}a`).innerHTML = ''}
    else if (spot === 3) {grid[row+2][col+2] = null; q(`c${TTNFA([row+2, col+2])}a`).innerHTML = ''; grid[row+1][col+1] = null; q(`c${TTNFA([row+1, col+1])}a`).innerHTML = ''}
    else if (spot === 4) {grid[row+2][col-2] = null; q(`c${TTNFA([row+2, col-2])}a`).innerHTML = ''; grid[row+1][col-1] = null; q(`c${TTNFA([row+1, col-1])}a`).innerHTML = ''}
    checkIfGameIsOver()
    botTurn()
}
function botTurn() {
    let moves = findLegalMoves('b')
    let bestScore = -Infinity
    let score;
    let bestMove;
    moves.forEach(move => {
        grid[move.put.row][move.put.col] = 'b'
        grid[move.remove.row][move.remove.col] = null
        if (move.kill !== undefined) {
            grid[move.kill.row][move.kill.col] = null
        }
        score = minimax(4, false)
        grid[move.put.row][move.put.col] = null
        grid[move.remove.row][move.remove.col] = 'b'
        if (move.kill !== undefined) {
            grid[move.kill.row][move.kill.col] = 'w'
        }

        if (score > bestScore) {
            bestScore = score
            bestMove = {
                put: {row: move.put.row, col: move.put.col},
                remove: {row: move.remove.row, col: move.remove.col},
                
            }
            if (move.kill !== undefined) {
                bestMove.kill = {row: move.kill.row, col: move.kill.col}
            }
        }
    })
    grid[bestMove.put.row][bestMove.put.col] = 'b'
    q(`c${TTNFA([bestMove.put.row, bestMove.put.col])}a`).innerHTML = blackPiece() // put

    grid[bestMove.remove.row][bestMove.remove.col] = null
    q(`c${TTNFA([bestMove.remove.row, bestMove.remove.col])}a`).innerHTML = '' // remove

    if (bestMove.kill !== undefined) {
        grid[bestMove.kill.row][bestMove.kill.col] = null
        q(`c${TTNFA([bestMove.kill.row, bestMove.kill.col])}a`).innerHTML = '' // kill
    }
    checkIfGameIsOver()
}
function minimax(depth, isMaximizing) {
    if (depth <= 0 | draw() | findCountOf('b') === 0 | findCountOf('w') === 0) {
        return evaluateBoard(depth)
    }

    if (isMaximizing) {
        let moves = findLegalMoves('b')
        let bestScore = -Infinity
        let score;
        moves.forEach(move => {
            grid[move.put.row][move.put.col] = 'b'
            grid[move.remove.row][move.remove.col] = null
            if (move.kill !== undefined) {
                grid[move.kill.row][move.kill.col] = null
            }
            score = minimax(depth-1, false)
            grid[move.put.row][move.put.col] = null
            grid[move.remove.row][move.remove.col] = 'b'
            if (move.kill !== undefined) {
                grid[move.kill.row][move.kill.col] = 'w'
            }
            if (score > bestScore) {
                bestScore = score
            }
        })
        return bestScore
    } else {
        let moves = findLegalMoves('w')
        let bestScore = Infinity
        let score;
        moves.forEach(move => {
            grid[move.put.row][move.put.col] = 'w'
            grid[move.remove.row][move.remove.col] = null
            if (move.kill !== undefined) {
                grid[move.kill.row][move.kill.col] = null
            }
            score = minimax(depth-1, true)
            grid[move.put.row][move.put.col] = null
            grid[move.remove.row][move.remove.col] = 'w'
            if (move.kill !== undefined) {
                grid[move.kill.row][move.kill.col] = 'b'
            }
            if (score < bestScore) {
                bestScore = score
            }
        })
        return bestScore
    }
}
function evaluateBoard(depth) {
    let score = 0
    score += findCountOf('b')
    score -= findCountOf('w')
    score += amountOfXInRowy('b', 7) * 2
    score -= amountOfXInRowy('w', 0) * 2
    score += amountOfXInRowy('b', 6) / 2
    score -= amountOfXInRowy('w', 1) / 2
    if (findCountOf('w') === 0) score *= 2
    if (findCountOf('b') === 0) score /= 2
    return score + depth
}
function draw() {
    if (findLegalMoves('w')[0] === undefined & findCountOf('w') !== 0 | findLegalMoves('b')[0] === undefined && findCountOf('b') !== 0) return true
}
function amountOfXInRowy(p, row) {
    count = 0
    for(let col = 0; col < index; col ++) {
        if (grid[row][col] === p) {count++}
    }; return count
}
function findCountOf(p) {
    count = 0
    for(let row = 0; row< index; row++) {
        for(let col=0; col<index; col++) {
            if (grid[row][col] === p) {
                count++
            }
        }
    }
    return count
}
function findLegalMoves(p) {
    let putANDremoveBlack = []
    let putANDremoveWhite = []
    for(let row = 0; row<index; row++) {
        for(let col = 0; col<index; col++) {
            isBlack = row % 2 === 0? (col % 2 === 1? true:false):(col % 2 === 0? true:false)
            if (isBlack) {
                if (grid[row][col] === null) {
                    if (p === 'b') {
                        if(grid[row-1]?.[col-1] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: {row: row-1, col: col-1}
                            })
                        }
                        if(grid[row-1]?.[col+1] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row-1, col: col+1}
                            })
                        }
                        if(grid[row-1]?.[col-1] === 'w' & grid[row-2]?.[col-2] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row-2, col: col-2},
                                kill: { row: row-1, col: col-1}
                            })
                        }
                        if(grid[row-1]?.[col+1] === 'w' & grid[row-2]?.[col+2] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row-2, col: col+2},
                                kill: { row: row-1, col: col+1}
                            })
                        }
                    } else { // black
                    if(grid[row+1]?.[col-1] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: {row: row+1, col: col-1}
                        })
                    }
                    if(grid[row+1]?.[col+1] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: { row: row+1, col: col+1}
                        })
                    }
                    if(grid[row+1]?.[col-1] === 'b' & grid[row+2]?.[col-2] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: { row: row+2, col: col-2},
                            kill: { row: row+1, col: col-1}
                        })
                    }
                    if(grid[row+1]?.[col+1] === 'b' & grid[row+2]?.[col+2] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: { row: row+2, col: col+2},
                            kill: { row: row+1, col: col+1}
                        })
                        }
                } // white
                }
            }
        }
    }
    return p === 'b'? putANDremoveBlack:putANDremoveWhite
}

function q(qury) {
    return document.querySelector(`.${qury}`)
} 
function TTNFA(spot) {
    let [row, col] = spot
    return row*index+col
}
function TTAFN(num) {
    row = Math.floor(num / index)
    col = num % index
    return [row, col]
}
function checkIfGameIsOver() {
    if (draw()) {
        q('result').innerHTML = 'Draw!!!'
    }
    else if(findCountOf('b') === 0) {
        q('result').innerHTML = 'You won!!'
    }
    else if (findCountOf('w') === 0) {
        q('result').innerHTML = 'You lost!!'
    }
    else if(findLegalMoves('w') === 0) {
        q('result').innerHTML = 'You lost!!'
    }
    else if(findLegalMoves('b') === 0) {
        q('result').innerHTML = 'You won!!'
    }
}
const index = 8
let boardHTML = ''

let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}


const whitePiece = num => `<div class="piece white p${num}w" onclick="showGrayMoves(event)">w</div>`
const grayPiece = (num, spot) => `<div class="piece gray g${num}g" onclick="moveTo(${spot}, ${num})">g</div>`
const blackPiece = num => `<div class="piece black p${num}b">b</div>`
const kingBlack = num => `<div class="king KB k${num}b">♚</div>`
const kingWhite = num => `<div class="KW 100 k${num}w king" onclick="showGrayMoves(event)">♔</div>`
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
    makeAking()
    classNum = Number(e.target.className.split(' ')[2].replace(/[^0-9]/g, ''))
    num3 = Number(e.target.className.split(' ')[1].replace(/[^0-9]/g, ''))

    let [row, col] = TTAFN(classNum)
    if (grayMoves[0] !== undefined) {
        grayMoves.forEach(move => {
            let [row, col] = move
            q(`c${TTNFA([row, col])}a`).innerHTML = ''
            grayMoves = []
        })
    } // remove old gray pieces

    if (num3 == 100) {
        if (grid[row-1]?.[col-1] === null) {
            q(`c${TTNFA([row-1, col-1])}a`).innerHTML = grayPiece(TTNFA([row-1, col-1]), 11)
            grayMoves.push([row-1, col-1])
        }
        if (grid[row-1]?.[col+1] === null) {
            q(`c${TTNFA([row-1, col+1])}a`).innerHTML = grayPiece(TTNFA([row-1, col+1]), 22)
            grayMoves.push([row-1, col+1])
        }
        if(grid[row-1]?.[col-1] === 'b' & grid[row-2]?.[col-2] === null) {
            q(`c${TTNFA([row-2, col-2])}a`).innerHTML = grayPiece(TTNFA([row-2, col-2]), 33)
            grayMoves.push([row-2, col-2])
        }
        if(grid[row-1]?.[col+1] === 'b' & grid[row-2]?.[col+2] === null) {
            q(`c${TTNFA([row-2, col+2])}a`).innerHTML = grayPiece(TTNFA([row-2, col+2]), 44)
            grayMoves.push([row-2, col+2])
        }
        if (grid[row+1]?.[col-1] === null) {
            q(`c${TTNFA([row+1, col-1])}a`).innerHTML = grayPiece(TTNFA([row+1, col-1]), 5)
            grayMoves.push([row+1, col-1])
        }
        if (grid[row+1]?.[col+1] === null) {
            q(`c${TTNFA([row+1, col+1])}a`).innerHTML = grayPiece(TTNFA([row+1, col+1]), 6)
            grayMoves.push([row+1, col+1])
        }
        if(grid[row+1]?.[col-1] === 'b' & grid[row+2]?.[col-2] === null) {
            q(`c${TTNFA([row+2, col-2])}a`).innerHTML = grayPiece(TTNFA([row+2, col-2]), 7)
            grayMoves.push([row+2, col-2])
        }
        if(grid[row+1]?.[col+1] === 'b' & grid[row+2]?.[col+2] === null) {
            q(`c${TTNFA([row+2, col+2])}a`).innerHTML = grayPiece(TTNFA([row+2, col+2]), 8)
            grayMoves.push([row+2, col+2])
        }
        return
    }


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
    if (spot === 1 | spot === 2 | spot === 3 | spot === 4) {
        grid[row][col] = 'w'
        q(`c${num}a`).innerHTML = whitePiece(num)
    } else {
        grid[row][col] = 'kw'
        q(`c${num}a`).innerHTML = kingWhite(num)
    }

    if (spot === 1 | spot === 11) {grid[row+1][col+1] = null; q(`c${TTNFA([row+1, col+1])}a`).innerHTML = ''}
    else if (spot === 2 | spot === 22) {grid[row+1][col-1] = null; q(`c${TTNFA([row+1, col-1])}a`).innerHTML = ''}
    else if (spot === 3 | spot === 33) {grid[row+2][col+2] = null; q(`c${TTNFA([row+2, col+2])}a`).innerHTML = ''; grid[row+1][col+1] = null; q(`c${TTNFA([row+1, col+1])}a`).innerHTML = ''}
    else if (spot === 4 | spot === 44) {grid[row+2][col-2] = null; q(`c${TTNFA([row+2, col-2])}a`).innerHTML = ''; grid[row+1][col-1] = null; q(`c${TTNFA([row+1, col-1])}a`).innerHTML = ''}
    else if (spot === 5) {grid[row-1][col+1] = null; q(`c${TTNFA([row-1, col+1])}a`).innerHTML = ''}
    else if (spot === 6) {grid[row-1][col-1] = null; q(`c${TTNFA([row-1, col-1])}a`).innerHTML = ''}
    else if (spot === 7) {grid[row-2][col+2] = null; q(`c${TTNFA([row-2, col+2])}a`).innerHTML = ''; grid[row-1][col+1] = null; q(`c${TTNFA([row-1, col+1])}a`).innerHTML = ''}
    else if (spot === 8) {grid[row-2][col-2] = null; q(`c${TTNFA([row-2, col-2])}a`).innerHTML = ''; grid[row-1][col-1] = null; q(`c${TTNFA([row-1, col-1])}a`).innerHTML = ''}
    makeAking()
    q('result').innerHTML = 'bot thinking...'
    botTurn()
}
async function botTurn() {
    await new Promise(x => setTimeout(x, 1))
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
    q('result').innerHTML = 'Your turn'
    makeAking()
}
function makeAking() {
    for(let col = 0; col<index;col++) {
        if (grid[0][col] === 'w') {grid[0][col] = 'kw'; q(`c${TTNFA([0, col])}a`).innerHTML = kingWhite(TTNFA([0, col]))}
        else if (grid[7][col] === 'b') {grid[7][col] = 'kb'; q(`c${TTNFA([7, col])}a`).innerHTML = kingBlack(TTNFA([7, col]))}
    }
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
    if (findCountOf('w') === 0) {return 10000}
    if (findCountOf('b') === 0) {return -10000}
    let score = 0

    score += findCountOf('kb') * 5
    score -= findCountOf('kw') * 10
    score += (findCountOf('b')-1) * 3
    score -= findCountOf('w') * 3

    score += findLegalMoves('b').length * 0.5
    score -= findLegalMoves('w').length * 0.5

    score += depth
    return score
}
function draw() {
    if (findLegalMoves('w')[0] === undefined & findLegalMoves('b')[0] === undefined & findCountOf('b') !== 0 & findCountOf('w') !== 0) return true
}
function findCountOf(p) {
    count = 0
    for(let row = 0; row< index; row++) {
        for(let col=0; col<index; col++) {
            if (grid[row][col] === p) {
                count++}}}
    return count}

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
                        if((grid[row-1]?.[col-1] === 'w' | grid[row-1]?.[col-1] === 'KW') & grid[row-2]?.[col-2] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row-2, col: col-2},
                                kill: { row: row-1, col: col-1}
                            })
                        }
                        if((grid[row-1]?.[col+1] === 'w' | grid[row-1]?.[col-1] === 'KW') & grid[row-2]?.[col+2] === 'b') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row-2, col: col+2},
                                kill: { row: row-1, col: col+1}
                            })
                        }
                        if (findCountOf('kb') > 0) {
                            if(grid[row+1]?.[col-1] === 'kb') {
                                putANDremoveBlack.push({
                                put: {row, col},
                                remove: {row: row+1, col: col-1}
                            })}

                            if(grid[row+1]?.[col+1] === 'kb') {
                                putANDremoveBlack.push({
                                put: {row, col},
                                remove: {row: row+1, col: col+1}
                            })}

                            if((grid[row+1]?.[col-1] === 'w' | grid[row+1]?.[col-1] === 'kw') & grid[row+2]?.[col-2] === 'kb') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row+2, col: col-2},
                                kill: { row: row+1, col: col-1}
                            })}

                            if((grid[row+1]?.[col+1] === 'w' | grid[row+1]?.[col+1] === 'kw') & grid[row+2]?.[col+2] === 'kb') {
                            putANDremoveBlack.push({
                                put: {row, col},
                                remove: { row: row+2, col: col+2},
                                kill: { row: row+1, col: col+1}
                            })}
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
                    if((grid[row+1]?.[col-1] === 'b' | grid[row-1]?.[col-1] === 'kb') & grid[row+2]?.[col-2] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: { row: row+2, col: col-2},
                            kill: { row: row+1, col: col-1}
                        })
                    }
                    if((grid[row+1]?.[col+1] === 'b' | grid[row-1]?.[col-1] === 'kb') & grid[row+2]?.[col+2] === 'w') {
                        putANDremoveWhite.push({
                            put: {row, col},
                            remove: { row: row+2, col: col+2},
                            kill: { row: row+1, col: col+1}
                        })
                        }

                    if (findCountOf('kw') > 0) {
                        if(grid[row+1]?.[col-1] === 'kw') {
                            putANDremoveBlack.push({
                            put: {row, col},
                            remove: {row: row+1, col: col-1}
                        })}

                        if(grid[row+1]?.[col+1] === 'kw') {
                            putANDremoveBlack.push({
                            put: {row, col},
                            remove: {row: row+1, col: col+1}
                        })}

                        if((grid[row+1]?.[col-1] === 'b' | grid[row+1]?.[col-1] === 'kb') & grid[row+2]?.[col-2] === 'kw') {
                        putANDremoveBlack.push({
                            put: {row, col},
                            remove: { row: row+2, col: col-2},
                            kill: { row: row+1, col: col-1}
                        })}

                        if((grid[row+1]?.[col+1] === 'b' | grid[row+1]?.[col+1] === 'kb') & grid[row+2]?.[col+2] === 'kw') {
                        putANDremoveBlack.push({
                            put: {row, col},
                            remove: { row: row+2, col: col+2},
                            kill: { row: row+1, col: col+1}
                        })}
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
    if(findCountOf('b') === 0) {
        q('result').innerHTML = 'You won!!'
        return true
    }
    else if (findCountOf('w') === 0) {
        q('result').innerHTML = 'You lost!!'
        return true
    }
    else if(findLegalMoves('w') === 0) {
        q('result').innerHTML = 'You lost!!'
        return true
    }
    else if(findLegalMoves('b') === 0) {
        q('result').innerHTML = 'You won!!'
        return true
    }
    return false
}
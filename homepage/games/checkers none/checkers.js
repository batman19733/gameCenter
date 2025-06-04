const index = 8
let boardHTML = ''
for(i=0; i<8**2;i++) {
    let [row, col] = TTAFN(i)
    boardHTML+= `<div class="c${i}a cube ${row % 2 === 0? (col % 2 === 0? 'light':'dark'):(col % 2 === 1? 'light':'dark')}"></div>`
}
q('board').innerHTML = boardHTML // make board
let grid = Array.from({length: index}, () => Array(index).fill(null)) // make grid
for(i=0; i<8**2;i++) {
    let [row, col] = TTAFN(i)
    isDark = row < 3? (row % 2 === 0? (col % 2 === 1? true:false):(col % 2 === 0? true:false)):false
    isWhite = row > 4? (row % 2 === 1? (col % 2 === 0? true:false):(col % 2 ===1? true:false)):false
    if (isDark) {grid[row][col] = 'b'; q(`c${TTNFA([row, col])}a`).innerHTML = `<div class="piece p${TTNFA([row, col])}b black">b</div>`}
    if (isWhite) {grid[row][col] = 'w'; q(`c${TTNFA([row, col])}a`).innerHTML = `<div class="piece p${TTNFA([row, col])}w white ava" onclick="findMove(event)">w</div>`}
}
let moves = []
let oldSpot;
function findMove(e) {
    oldSpot = []
    if (moves[0] !== undefined) {
        moves.forEach(move => {
            let [row, col] = move
            num = TTNFA([row, col])
            q(`c${num}a`).innerHTML = ''
            moves = []
        })
    }
    classNum = Number(e.target.className.split(' ')[1].replace(/[^0-9]/g, ''))
    let [row, col] = TTAFN(classNum)
    if (row !== 0) {
        if (col === 0 && grid[row-1][col+1] === null) {moves.push([row-1, col+1])}
        if (col === 7 && grid[row-1][col-1] === null) {moves.push([row-1, col-1])} else {
            if(grid[row-1][col+1] === null) {moves.push([row-1, col+1])}
            if(grid[row-1][col-1] === null) {moves.push([row-1, col-1])}
        }
        if (col >= 2 & row >= 2) {
            if (grid[row-1][col-1] === 'b' & grid[row-2][col-2] === null) {moves.push([row-2, col-2]);oldSpot.push([row-1, col-1])}
        }
        if (col <= 5 & row >= 2) {
            if (grid[row-1][col+1] === 'b' & grid[row-2][col+2] === null) {moves.push([row-2, col+2]);oldSpot.push([row-1, col+1])}
        }
        oldSpot.push([row, col])
        moves.forEach(move => {
            let [row, col] = move
            num = TTNFA([row, col])
            q(`c${num}a`).innerHTML = `<div onclick="moveTo([${row}, ${col}])" class="piece gray p${num}g">g</div>`
        })
    }
}
async function moveTo(spot) {
    moves.forEach(move => {
        let [row, col] = move
        num = TTNFA([row, col])
        q(`c${num}a`).innerHTML = ''
        moves = []
    })
    oldSpot.forEach(spot => {
        q(`c${TTNFA(spot)}a`).innerHTML = ''
        let [row, col] = spot
        grid[row][col] = null
        oldSpot = []
    })
    q(`c${TTNFA(spot)}a`).innerHTML = `<div class="piece p${TTNFA(spot)}w white ava" onclick="findMove(event)">w</div>`
    let [row2, col2] = spot
    grid[row2][col2] = 'w'
    await new Promise(resolve => setTimeout(resolve, 200))
    bestMove()
}
function bestMove() {
    const moves = findLagelMoves()
    let bestScore = -Infinity
    let doMove = {}
    moves.forEach(move => {
        let [row, col] = move
        grid[row][col] = 'b'
        score = minimax()
        grid[row][col] = null
        if(score > bestScore) {
            bestScore = score
            doMove = {row, col}
        }
        
    })
    let {row, col} = doMove
    if (doMove.row === undefined) {
        console.log('you won or tie')
        return
    }
    grid[row][col] = 'b'
    q(`c${TTNFA([row, col])}a`).innerHTML = `<div class="piece p${TTNFA([row, col])}b black">b</div>`
    let remove;
    if (row !== 0) {
        if (col === 0 && grid[row-1][col+1] === 'b') {remove = [row-1, col+1]}
        else if (col === 7 && grid[row-1][col-1] === 'b') {remove = [row-1, col-1]}
        else if(grid[row-1][col+1] === 'b') {remove = [row-1, col+1]}
        else if(grid[row-1][col-1] === 'b') {remove = [row-1, col-1]}
    }
    let [row2, col2] = remove
    grid[row2][col2] = null
    q(`c${TTNFA([row2, col2])}a`).innerHTML = ''
}
function minimax() {
    return 1
}
function findLagelMoves() {
    let legalMoves = []
    for(let i=0; i<index**2;i++) {
        let [row, col] = TTAFN(i)
        if (row !== 0) {
            if (grid[row][col] === null) {
                isDark = row % 2 === 0? (col % 2 === 1? true:false):(col % 2 === 0? true:false)
                if (col === 0 & grid[row-1][col+1] === 'b') {legalMoves.push([row, col])}
                else if (col === 7 && grid[row-1][col-1] === 'b') {legalMoves.push([row, col])}
                else {
                    if(grid[row-1][col-1] === 'b') {legalMoves.push([row, col])}
                    else if(grid[row-1][col+1] === 'b') {legalMoves.push([row, col])}
                }
            }
        }
    }
    return legalMoves
}

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function TTAFN (num) {
    row = Math.floor(num / index)
    col = num % index
    return [row, col]
}
function TTNFA(array) {
    let [row, col] = array
    return row * index + col
}
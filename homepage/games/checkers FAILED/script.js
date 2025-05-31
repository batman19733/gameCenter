const index = 8

const blackPiece = (spot) => `<div class="blackPiece b${spot}p"></div>`
const whitePiece = spot => `<div class="whitePiece w${spot}p" onclick="check(event)"></div>`
const grayPiece = (spot, pos) => `<div class="grayPiece g${spot}p" onclick="moveTo(${spot}, ${pos})"></div>`
const grid = Array.from({ length: 8 }, () => Array(8).fill('')) // make logic grid
let boardHTML = ''
for (let row = 0; row < index; row++) { // make board
    for (let col = 0; col < index; col++) {
        const isWhite = (row + col) % 2 === 0;
        boardHTML += `<div class='cube ${isWhite ? 'whiteCube' : 'darkCube'} c${row * index + col}a'>${row < 3 && row % 2 === 0 && col % 2 == 1? (grid[row][col] = 'b', blackPiece(TTNFA([row, col]))) : ''}${row < 3 && row % 2 === 1 && col % 2 == 0? (grid[row][col] = 'b', blackPiece(TTNFA([row, col]))) : ''}${row > 4 && row % 2 == 1 && col % 2 === 0 ? (grid[row][col] = 'w', whitePiece(TTNFA([row, col]))):''}${row > 4 && row % 2 == 0 && col % 2 === 1 ? (grid[row][col] = 'w', whitePiece(TTNFA([row, col]))):''}</div>`;}}
q('board').innerHTML = boardHTML; // make board



let disabled = false
function check(e) {
    if (disabled) return
    classNum = Number(e.target.className.split(' ')[1].replace('w','').replace('p',''))
    showAvaible(classNum)
}
function botTurn() {
    const moves = legalMoves()
    let bestSCore = -Infinity
    let move;
    let deleteSpot
    moves.forEach(testMove => {
        let [row, col, del] = testMove
        grid[row][col] = 'b'
        let score = minimax(3, false)
        grid[row][col] = ''
        if (score > bestSCore) {
            bestSCore = score
            move = {row, col}
            deleteSpot = del
        }
    })
    grid[move.row][move.col] = 'b'
    grid[move.row-1][move.col+deleteSpot] = ''
    q(`c${TTNFA([move.row, move.col])}a`).innerHTML = blackPiece(TTNFA([move.row, move.col]))
    q(`c${TTNFA([move.row-1, move.col+deleteSpot])}a`).innerHTML = ''
    disabled = false
}
function minimax() {
    return 1
}
function legalMoves() {
    let moves = []
    for(let row = 0; row < index; row++){for(let col = 0; col < index; col++) {if((row+col) % 2 === 1) {if(grid[row][col] === ''){if (row > 0){if (col === 0) {if (grid[row-1][+1] === 'b') {moves.push([row, col, 1])}} else if (col === 7){if (grid[row-1][col-1] === 'b') {moves.push([row, col, -1])}} else{if (grid[row-1][+1] === 'b') {moves.push([row, col, 1])} else if (grid[row-1][col-1] === 'b') {moves.push([row, col, -1])}}}}}}}
    return moves
}
function moveTo(spot, pos) {
    disabled = true
    q(`c${TTNFA(oldSpot)}a`).innerHTML = ''
    let [row, col] = oldSpot
    grid[row][col] = ''
    if (pos) {
        grid[row-1][col+pos] = ''
        q(`c${TTNFA([row-1,col+pos])}a`).innerHTML = ''
    }
    graySpot.forEach(spot => {
        let [row, col] = spot
        q(`c${TTNFA([row, col])}a`).innerHTML = ''
        graySpot = []
    })
    q(`c${spot}a`).innerHTML = whitePiece(spot)
    let [row2, col2] = TTAFN(spot)
    grid[row2][col2] = 'w'
    botTurn()
}
let graySpot = []
let oldSpot;
function showAvaible(CN) {
    if (graySpot[0] !== undefined) {
        graySpot.forEach(spot => {
            let [row, col] = spot
            q(`c${TTNFA([row, col])}a`).innerHTML = ''
            graySpot = []
        })
    }
    const GA = TTAFN(CN)
    const [row, col] = GA
    if (row - 1 >= 0 && col - 1 >= 0) { // up left
        if (grid[row-1][col-1] === '') {
            q(`c${TTNFA([row-1, col-1])}a`).innerHTML = grayPiece(TTNFA([row-1, col-1]))
            graySpot.push([row-1, col-1])
            oldSpot = [row, col]}}

    if (row - 1 >= 0 && col + 1 >= 0) { // up right
        if (grid[row-1][col+1] === '') {
            q(`c${TTNFA([row-1, col+1])}a`).innerHTML = grayPiece(TTNFA([row-1, col+1]))
            graySpot.push([row-1, col+1])
            oldSpot = [row, col]}}

    if (row - 2 >= 0 && col + 2 >= 0) { // up jump right
        if (grid[row-1][col+1] === 'b' && grid[row-2][col+2] === '') {
            q(`c${TTNFA([row-2, col+2])}a`).innerHTML = grayPiece(TTNFA([row-2, col+2]), 1)
            graySpot.push([row-2, col+2])
            oldSpot = [row, col]}}

    if (row - 2 >= 0 && col - 2 >= 0) { // up jump left
        if (grid[row-1][col-1] === 'b' && grid[row-2][col-2] === '') {
            q(`c${TTNFA([row-2, col-2])}a`).innerHTML = grayPiece(TTNFA([row-2, col-2]), -1)
            graySpot.push([row-2, col-2])
            oldSpot = [row, col]}}
}
function TTAFN(num) {
    let row = Math.floor(num / index)
    let col = num % index
    return [row, col]
}
function TTNFA(array) {
    let [row, col] = array
    return sum = (row*index)+col
}
function q(qury) {
    return document.querySelector(`.${qury}`)
}
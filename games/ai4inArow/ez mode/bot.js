let index = 9
if (window.innerWidth <= 450) {
    q('PlayAgainButton').style.position = 'absolute'
    q('PlayAgainButton').style.top = '80%'
}

let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}

let boardHTML = ''
for(let i=0; i<index**2;i++) {
    boardHTML += `<div class='cube c${i}a'></div>`
}
q('board').innerHTML = boardHTML

let grid = Array.from({ length: index }, () => Array(index).fill(''));

let disabled = false
const check = async e => {
    if (disabled) return
    disabled = true
    let classNum = e.target.className.split(' ')[1]
    classNum = Number(classNum.replace('c', '').replace('a', ''))
    q(`c${classNum}a`).innerHTML = 'r'
    q(`c${classNum}a`).removeEventListener('click', check)
    q(`c${classNum}a`).style.backgroundColor = 'salmon'
    let [row, col] = turnToArrayFromNumber(classNum)
    grid[row][col] = 'r'
    moveDown(classNum, 'r', 'salmon')
}

async function moveDown(classNum, player, color) {
    await new Promise(x => setTimeout(x, 100))
    let [row, col] = turnToArrayFromNumber(classNum)
    if(row+1 < index && grid[row+1][col] === '') {
        q(`c${classNum}a`).addEventListener('click', check) // add click event before going down
        q(`c${classNum+index}a`).removeEventListener('click', check) // remove event listener to the one below

        q(`c${classNum}a`).innerHTML = '' // remove text
        q(`c${classNum}a`).style.backgroundColor = 'rgb(160, 160, 160)' // remove color

        q(`c${classNum+index}a`).innerHTML = player // add text to 1 under
        q(`c${classNum+index}a`).style.backgroundColor = color // add color to 1 under

        grid[row][col] = ''
        grid[row+1][col] = player
        classNum += index
        let [r, c] = turnToArrayFromNumber(classNum)
        if (r +1 < index) {moveDown(classNum, player, color)} else {
            before()
            return
        }
    } else {
        before()
        return
    }
}
async function before() {
    if(didXwon('r', 'r', 'r', 'r')) {
        gameOver('red won!')
        return
    }
    q('turn').innerHTML = 'bot thinking...'
    await new Promise(x => setTimeout(x, 400))
    q('turn').innerHTML = 'Your turn'
    bestMove()
}
function bestMove() {
    let nums = findLowestPos()
    let score;
    let bestScore = -Infinity
    let move;
    let rr = canStopHelp('r', 'r')
    if (rr) {place(rr); }
    let rb = canStopHelp('r', 'b')
    if (rr) {place(rb); }
    let br = canStopHelp('b', 'r')
    if (br) {place(br); }
    let bb = canStopHelp('b', 'b')
    if (bb) {place(bb);}
    if(didXwon('b', 'b', 'b', 'b') === true) {
        gameOver('blue won!')
        return
    }
    for(let [row, col] of nums) {
        grid[row][col] = 'b'
        score = minimax(3, false)
        if (score > bestScore) {
            bestScore = score
            move = {row, col}
        }
        grid[row][col] = ''
    }
    grid[move.row][move.col] = 'b'
    q(`c${turnToNumberFromArray([move.row, move.col])}a`).innerHTML = 'b'
    q(`c${turnToNumberFromArray([move.row, move.col])}a`).style.backgroundColor = 'lightblue'
    q(`c${turnToNumberFromArray([move.row, move.col])}a`).removeEventListener('click', check)
    if(didXwon('b', 'b', 'b', 'b') === true) {
        gameOver('blue won!')
        return
    }
    disabled = false
}
function place(spot) {
    let [row, col] = spot
    grid[row][col] = 'b'
    q(`c${turnToNumberFromArray([row, col])}a`).innerHTML = 'b'
    q(`c${turnToNumberFromArray([row, col])}a`).style.backgroundColor = 'lightblue'
    q(`c${turnToNumberFromArray([row, col])}a`).removeEventListener('click', check)
    disabled = false
}
document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})
function minimax(depth, isMaximizing) {
    if (depth === 0 || didXwon('b', 'b', 'b', 'b') || didXwon('r', 'r', 'r', 'r') || Draw()) {
        return evaluateBoard()
    }
    if(isMaximizing) {
        let nums = findLowestPos()
        let score;
        let bestScore = -Infinity
        let move;
        for(let [row, col] of nums) {
            grid[row][col] = 'b'
            score = minimax(depth-1, false)
            if (score > bestScore) {
                bestScore = score
                move = {row, col}
            }
            grid[row][col] = ''
        }
        return bestScore
    } else {
        let nums = findLowestPos()
        let score;
        let bestScore = Infinity
        let move;
        for(let [row, col] of nums) {
            grid[row][col] = 'r'
            score = minimax(depth-1, true)
            if (score < bestScore) {
                bestScore = score
                move = {row, col}
            }
            grid[row][col] = ''
        }
        return bestScore
    }
}

function evaluateBoard() {
    let score = 0
    if (didXwon('b', 'b', 'b', 'b')) score += 5000 //win
    if (didXwon('r', 'r', 'r', 'r')) score += -5000 // lose

    if (didXwon('r', 'r', 'r', '')) score += -500 // almost lose
    if (didXwon('', 'r', 'r', 'r')) score += -500 // almost lose
    if (didXwon('r', '', 'r', 'r')) score += -500 // almost lose
    if (didXwon('r', 'r', '', 'r')) score += -500 // almost lose

    if (didXwon('r', 'r', 'r', 'b')) score += 250 // blocked /////
    if (didXwon('b', 'r', 'r', 'r')) score += 350 // blocked /////
    if (didXwon('r', 'b', 'r', 'r')) score += 250 // blocked /////
    if (didXwon('r', 'r', 'b', 'r')) score += 250 // blocked  /////

    if (didXwon('b', 'b', 'b', '')) score += 500 // almost win /////
    if (didXwon('', 'b', 'b', 'b')) score += 500 // almost win /////
    if (didXwon('b', '', 'b', 'b')) score += 500 // almost win /////
    if (didXwon('b', 'b', '', 'b')) score += 500 // almost win /////

    if (canStopHelp('r', 'b')) score += -600 // help lose
    if (canStopHelp('b', 'r')) score += 600 // help win /////

    if (nearRED()) score += 1
    return score
}

function nearRED() {
    for(let row=1; row<grid.length; row++) { 
        for(let col=1; col<index-1;col++) {
            if (
                (grid[row][col] === 'r' && grid[row][col+1] === 'b') ||
                (grid[row][col] === 'r' && grid[row-1][col] === 'b') ||
                (grid[row][col] === 'r' && grid[row][col-1] === 'b')
            ) {return true}
        }
    }
}
function canStopHelp(color1, color2) {
    for(let row=0; row<grid.length-1; row++) { 
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === color1 && grid[row][col+1] === color1 && grid[row][col+2] === color1 && grid[row+1][col+3] === color2 && grid[row][col+3] === '') {
                return [row, col+3]
            }
        }
    }
    for(let row=0; row<grid.length-1; row++) { 
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === color1 && grid[row][col+1] === color1 && grid[row][col+3] === color1 && grid[row+1][col+2] === color2 && grid[row][col+2] === '') {
                return [row, col+2]
            }
        }
    }
    for(let row=0; row<grid.length-1; row++) { 
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === color1 && grid[row][col+3] === color1 && grid[row][col+2] === color1 && grid[row+1][col+1] === color2 && grid[row][col+1] === '') {
                return [row, col+1]
            }
        }
    }
    for(let row=0; row<grid.length-1; row++) { 
        for(let col=0; col<index-3;col++) {
            if(grid[row][col+3] === color1 && grid[row][col+1] === color1 && grid[row][col+2] === color1 && grid[row+1][col] === color2 && grid[row][col] === '') {
                return [row, col]
            }
        }
    }
    return false
}
function didXwon(move1, move2, move3, move4) {
    for(let row=0; row<grid.length; row++) { // Check win in row
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === move1 && grid[row][col+1] === move2 && grid[row][col+2] === move3 && grid[row][col+3] === move4) {
                return true
            }
        }
    }
    for(let col=0; col<grid.length; col++) { // Check win in col
        for(let row=0; row<index-3;row++) {
            if(grid[row][col] === move1 && grid[row+1][col] === move2 && grid[row+2][col] === move3 && grid[row+3][col] === move4) {
                return true
            }
        }
    }
    for(let row=0; row<grid.length-3; row++) { // Check win in row
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === move1 && grid[row+1][col+1] === move2 && grid[row+2][col+2] === move3 && grid[row+3][col+3] === move4) {
                return true
            }
        }
    }
    for(let row=3; row<grid.length; row++) { // Check win in row
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === move1 && grid[row-1][col+1] === move2 && grid[row-2][col+2] === move3 && grid[row-3][col+3] === move4) {
                return true
            }
        }
    }
    return false
}
function Draw() {
    let count = 0
    for(let row=0; row<grid.length; row++) { 
        for(let col=0; col<index;col++) {
            if(grid[row][col] !== '') {
                count++
            }
        }
    }
    if (count === index ** 2) {
        return true
    } else {
        return false
    }
}
function findLowestPos() {
    let allNums = []
    for(let col =0; col<index;col++) {
        if (grid[0][col] === '') {
            let [r, c] = goDownGrid(0, col)
            allNums.push([r, c])
        }
    }
    return allNums
}
function goDownGrid(row, col) {
    if (row + 1 < index) {
        if (grid[row + 1][col] === '') {
            return goDownGrid(row + 1, col)
        } else  {
            return [row, col]
        } 
    } else {
        return [row, col]
    } 
}
function q(qury) {
    return document.querySelector(`.${qury}`)
}
function turnToArrayFromNumber(num) {
    let row = Math.floor(num / index)
    let col = num % index
    return [row, col]
}
function turnToNumberFromArray(array) {
    let [row, col] = array
    return sum = (row*index)+col
}
function gameOver(text) {
    q('turn').innerHTML = text
    document.querySelectorAll('.cube').forEach(cube => {
        cube.removeEventListener('click', check)
    })
    q('PlayAgainButton').hidden = false
}
function playAgain() {
    grid = Array.from({ length: index }, () => Array(index).fill(''));
    q('PlayAgainButton').hidden = true
    document.querySelectorAll('.cube').forEach(cube => {
        cube.innerHTML = ''
        cube.addEventListener('click', check)
        disabled = false
        cube.style.backgroundColor = 'rgb(160, 160, 160)'
    })
}
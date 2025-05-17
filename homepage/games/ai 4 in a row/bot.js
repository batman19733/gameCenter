let index = 9

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
            botTurn()
            return
        }
    } else {
        botTurn()
        return
    }
}

function botTurn() {
    miniMax()
    disabled = false
}


document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

function miniMax(depth, botTurn) {
    let testGrid = copyGrid()
    let lowestNums = findLowestPos(testGrid)
    if (depth === 0 ) {
        return evaluateBoard(testGrid)
    }

    let bestScore = 0
    let bestMove = null
    
    if(botTurn = true) {
        for(let [row, col] of lowestNums) {
            testGrid[row][col] = 'b'
            let score = evaluateBoard(testGrid)
            miniMax(depth -1, botTurn = false)
            if (score > bestScore) {
                bestScore = score
                bestMove = [row, col]
            }
        }
    } else {
        for(let [row, col] of lowestNums) {
            testGrid[row][col] = 'r'
            let score = evaluateBoard(testGrid)
            miniMax(depth -1, botTurn = true)
            if (score > bestScore) {
                bestScore = score
                bestMove = [row, col]
            }
        }
    }

    if(bestMove !== null) {
        let [row, col] = bestMove
        grid[row][col] = 'b'
        let classNum = turnToNumberFromArray(bestMove)
        q(`c${classNum}a`).innerHTML = 'b'
        q(`c${classNum}a`).removeEventListener('click', check)
        q(`c${classNum}a`).style.backgroundColor = 'lightblue'
    }
}

function evaluateBoard(testGrid, willBotWin) {
    let score = 0
    if(willBotWin) {
        if (didXwon(testGrid, 'b', 'b', 'b', 'b')) {score += Infinity}
        else if (didXwon(testGrid, 'r', 'r', 'r', 'b')) {score += 1000}
        else if (didXwon(testGrid, 'r', 'r', 'b', 'r')) {score += 1000}
        else if (didXwon(testGrid, 'r', 'b', 'r', 'r')) {score += 1000}
        else if (didXwon(testGrid, 'b', 'r', 'r', 'r')) {score += 1000}
    }
    else {
        if (didXwon(testGrid, 'r', 'r', 'r', 'r')) {score += Infinity}
        else if (didXwon(testGrid, 'b', 'b', 'b', 'r')) {score += 1000}
        else if (didXwon(testGrid, 'b', 'b', 'r', 'b')) {score += 1000}
        else if (didXwon(testGrid, 'b', 'r', 'b', 'b')) {score += 1000}
        else if (didXwon(testGrid, 'r', 'b', 'b', 'b')) {score += 1000}
    }
    return score
}

function didXwon(gridP, move1, move2, move3, move4) {
    let grid = gridP
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
    return false
}
function checkIfCanWin(gridE, move) {
    let grid = gridE
    for(let row=0;row<grid.length;row++) { // Check win in row
        for(let col=0; col<index-3;col++) {
            if(grid[row][col] === move && grid[row][col+1] === move && grid[row][col+2] === move && grid[row][col+3] === '') {
                if (row+1 < index) {
                    if(grid[row+1][col+3] !== '') {
                        return  [row, col+3]
                    }
                } else {
                    return [row, col+3]
                }
            }
        }
    }

    for(let col=0;col<grid.length;col++) { // check win in col
        for(let row=0; row<index-2;row++) {
            if(grid[row][col] === move && grid[row+1][col] === move && grid[row+2][col] === move) {
                if (row-1 >= 0) {
                    if(grid[row-1][col] === '') {
                        return [row-1, col]
                    }
                }
            }
        }
    }

    for(let col=0;col<grid.length-3;col++) { // check win from top left
        for(let row=0; row<index-3;row++) {
            if (grid[row][col] === move && grid[row+1][col+1] === move && grid[row+2][col+2] === move && grid[row+3][col+3] === '') {
                if (row+3 === 8) {
                    return [row+3, col+3]
                } else {
                    if (grid[row+4][col+3] !== '') {
                        return [row+3, col+3]
                    }
                }
            }
        }
    }

    for(let col=3;col<grid.length;col++) { // check win from top right
        for(let row=0; row<index-3;row++) {
            if (grid[row][col] === move && grid[row+1][col-1] === move && grid[row+2][col-2] === move && grid[row+3][col-3] === '') {
                if (row+3 === 8) {
                    return [row+3, col-3]
                } else {
                    if (grid[row+4][col-3] !== '') {
                        return [row+3, col-3]
                    }
                }
            }
        }
    }

    for(let col=0;col<grid.length-3;col++) { // check win from bottom left
        for(let row=3; row<index;row++) {
            if (grid[row][col] === move && grid[row-1][col+1] === move && grid[row-2][col+2] === move && grid[row-3][col+3] === '') {
                if (row-3 === 0) {
                    return [row-3, col+3]
                } else {
                    if (grid[row-4][col+3] !== '') {
                        return [row-3, col+3]
                    }
                }
            }
        }
    }

    for(let col=3;col<grid.length;col++) { // check win from bottom right
        for(let row=3; row<index;row++) {
            if (grid[row][col] === move && grid[row-1][col-1] === move && grid[row-2][col-2] === move && grid[row-3][col-3] === '') {
                if (row-3 === 0) {
                    return [row+3, col-3]
                } else {
                    if (grid[row-4][col-3] !== '') {
                        return [row-3, col-3]
                    }
                }
            }
        }
    }

    
    return false
}

function copyGrid() {
    return grid.map(row => [...row]);
}
function findLowestPos(fakeGrid) {
    let allNums = []
    let grid = fakeGrid
    for(let col =0; col<index;col++) {
        if (grid[0][col] === '') {
            let [r, c] = goDownGrid(fakeGrid, 0, col)
            allNums.push([r, c])
        }
    }
    return allNums
}
function goDownGrid(grid, row, col) {
    if (row + 1 < index) {
        if (grid[row + 1][col] === '') {
            return goDownGrid(grid, row + 1, col)
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
    let [row,col ] = array
    return sum = (row*index)+col
}
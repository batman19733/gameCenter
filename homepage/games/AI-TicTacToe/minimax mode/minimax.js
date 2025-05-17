let boardHTML = ''
let disabled = false

for(let i=0;i<=8;i++) {
    boardHTML += `<div class="cube c${i}a"></div>`
}
q('board').innerHTML = boardHTML
q('turn').innerHTML = 'Your turn'

let grid = Array.from({ length: 3 }, () => new Array(3).fill(''));
const check = async e => {
    if (disabled) return
    disabled = true
    e.target.innerHTML = 'X'
    e.target.removeEventListener('click', check)
    let className = e.target.className.replace('cube', '').replace('c', '').replace('a', '')
    let [row, col] = turnToArrayFromNumber(className)
    grid[row][col] = 'X'
    let result = checkIfWon('X')
    if (result) {
        q(`turn`).innerHTML = `X won!`
        document.querySelectorAll('.cube').forEach(cube => {
            cube.removeEventListener('click', check)
        })
        return
    }
    q('turn').innerHTML = 'bot thinking...'
    await new Promise(x => setTimeout(x, 400))
        q('turn').innerHTML = 'Your turn'
    bestMove()

}
function bestMove() {
    let bestScore = -1000
    let move;
    for(let row=0;row<3;row++) {
        for(let col=0;col<3;col++) {
            if(grid[row][col] === '') {
                grid[row][col] = 'O'
                let score = minimax(8, false)
                grid[row][col] = ''
                if (score > bestScore) {
                    bestScore = score
                    move = {row, col}
                }
            }
        }
    }

    if (move !== undefined) {
        grid[move.row][move.col] = 'O'
        q(`c${turnTOnumberFromArray([move.row, move.col])}a`).removeEventListener('click', check)
    } else {
        q('turn').innerHTML = 'draw'
        q('PlayAgainButton').hidden = false
        document.querySelectorAll('.cube').forEach(cube => {
            cube.removeEventListener('click', check)
        })
        disabled = true
        return
    }
    q(`c${turnTOnumberFromArray([move.row, move.col])}a`).innerHTML = 'O'
    let result = checkIfWon('O')
    if (result) {
        q('turn').innerHTML = 'O won!'
        q('PlayAgainButton').hidden = false
        document.querySelectorAll('.cube').forEach(cube => {
            cube.removeEventListener('click', check)
        })

    }
    disabled = false;
}

function minimax(depth, isMaximizing) {
    if (depth === 0 || checkIfWon('X') || checkIfWon('O') || ifDraw()) {
        return evaluate()
    }

    if (isMaximizing) {
        let bestScore = -1000
        for(let row=0;row<3;row++) {
            for(let col=0;col<3;col++) {
                if(grid[row][col] === '') {
                    grid[row][col] = 'O'
                    let score = minimax(depth-1, false)
                    grid[row][col] = ''
                    if (score > bestScore) {
                        bestScore = score
                    }
                }
            }
        }
        return bestScore 
    } else {
        let bestScore = 1000
        for(let row=0;row<3;row++) {
            for(let col=0;col<3;col++) {
                if(grid[row][col] === '') {
                    grid[row][col] = 'X'
                    let score = minimax(depth-1, true)
                    grid[row][col] = ''
                    if (score < bestScore) {
                        bestScore = score
                    }
                }
            }
        }
        return bestScore
    }
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

function evaluate() {
    if (checkIfWon('O')) {
        return 10
    }
    if (checkIfWon('X')) {
        return -10
    }
    if (ifDraw()) {
        return 0
    }
    return 0
}

function ifDraw() {
    if(grid[0][0] !== '' && grid[0][1] !== '' && grid[0][2] !== '' && grid[1][0] !== '' && grid[1][1] !== '' && grid[1][2] !== '' && grid[2][0] !== '' && grid[2][1] !== '' && grid[2][2] !== '') {
        return true
    } else {
        return false
    }
}
function checkIfWon(move) {
    for (let row = 0; row<3; row++) {
        if (grid[row][0] === move && grid[row][1] === move && grid[row][2] === move) {
            return true
        }
    }

    for (let col = 0; col<3; col++) {
        if (grid[0][col] === move && grid[1][col] === move && grid[2][col] === move) {
            return true
        }
    }

    if (grid[0][0] === move && grid[1][1] === move && grid[2][2] === move) {
        return true
    }

    if (grid[0][2] === move && grid[1][1] === move && grid[2][0] === move) {
        return true
    }
}




function turnToArrayFromNumber(num) {
    let row = Math.floor(num / 3)
    let col = num % 3
    return [row, col]
}
function turnTOnumberFromArray(array) {
    let [row,col ] = array
    return (row*3)+col
}
function q(qury) {
    return document.querySelector(`.${qury}`)
}
function back() {
    window.location.href = '../'
}
function playAgain() {
    q('PlayAgainButton').hidden = true
    document.querySelectorAll('.cube').forEach(cube => {
        cube.addEventListener('click', check)
        cube.innerHTML = ''
    })
    grid = Array.from({ length: 3 }, () => new Array(3).fill(''));
    q('turn').innerHTML = 'Your turn'
    disabled = false

}
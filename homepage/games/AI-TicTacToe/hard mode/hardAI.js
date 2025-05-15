let boardHTML = ''
let disabled = false
let botDisabled = false

for(let i=0;i<=8;i++) {
    boardHTML += `<div class="cube c${i}a"></div>`
}
q('board').innerHTML = boardHTML
q('turn').innerHTML = 'Your turn'

let grid = Array.from({ length: 3 }, () => Array(3).fill(''));

const check = async e => {
    if (disabled) return
    disabled = true
    let className = Number(e.target.className.replace('cube ', '').replace('c', '').replace('a', ''))
    q(`c${className}a`).innerHTML = 'X'
    q(`c${className}a`).removeEventListener('click', check)
    let [row, col] = turnTOarrayNumber(className)
    grid[row][col] = 'X'
    if(checkIfTie()) {
        q('turn').innerHTML = 'tie'
        q('PlayAgainButton').hidden = false
        return
    }  
    if(checkIfWon('X')) {
        console.log('WON')
        return
    } else {
        botTurn()
    }
    
}

async function botTurn() {
    if (botDisabled) return 
    q('turn').innerHTML = 'bot thinking...'
    await new Promise(x => setTimeout(x, 700))
    q('turn').innerHTML = 'Your turn'
    let spot = checkIfCanWin('O')
    if(spot) {
        let [row, col] = spot
        grid[row][col] = 'O'
        numSpot = turnTOnumberFromArray(spot)
        q(`c${numSpot}a`).innerHTML = 'O'
        q(`c${numSpot}a`).removeEventListener('click', check)
        result('O')
    } else {
        let spot = checkIfCanWin('X')
        if(spot) {
            let [row, col] = spot
            grid[row][col] = 'O'
            numSpot = turnTOnumberFromArray(spot)
            q(`c${numSpot}a`).innerHTML = 'O'
            q(`c${numSpot}a`).removeEventListener('click', check)
        } else {
            let spot = checkForTringle()
            if (spot) {
                let [row, col] = spot
                grid[row][col] = 'O'
                let numSpot = turnTOnumberFromArray(spot)
                q(`c${numSpot}a`).innerHTML = 'O'
            } else {
                if(!checkIfAtCenter()) {
                    if(!checkIfAtCorner()) {
                        let spot = placeAtIndex()
                        q(`c${spot}a`).innerHTML = 'O'
                        q(`c${spot}a`).removeEventListener('click', check)
                        let [row, col] = turnTOarrayNumber(spot)
                        grid[row][col] = 'O'
                    }
                }
            }
        }
    }
    disabled = false
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

function checkIfCanWin(move) {
    for(let row = 0; row < grid.length; row++) {
        let countMOVE = 0
        let countAIR = 0
        let thirdSpot = ''
        for(let cell = 0; cell < grid[row].length; cell++) {
            if (grid[row][cell] === move) {
                countMOVE++
            }
            if (grid[row][cell] === '') {
                countAIR++
                thirdSpot = [row,cell]
            }
        }

        if(countMOVE === 2 && countAIR === 1) {
            return thirdSpot
        }
    }

    for(let col = 0; col < 3; col++) {
        let countMOVE = 0
        let countAIR = 0
        let thirdSpot = ''
        for(let row = 0; row < 3; row++) {
            if (grid[row][col] === move) {
                countMOVE++
            }
            if (grid[row][col] === '') {
                countAIR++
                thirdSpot = [row,col]
            }
        }
        if(countMOVE === 2 && countAIR === 1) {
            return thirdSpot
        }
    }

    if(q('c0a').innerHTML === move && q('c4a').innerHTML === move && q('c8a').innerHTML === '') {return [2,2]}
    if(q('c8a').innerHTML === move && q('c4a').innerHTML === move && q('c0a').innerHTML === '') {return [0,0]}
    if(q('c0a').innerHTML === move && q('c8a').innerHTML === move && q('c4a').innerHTML === '') {return [1,1]}

    if(q('c2a').innerHTML === move && q('c4a').innerHTML === move && q('c6a').innerHTML === '') {return [2,0]}
    if(q('c2a').innerHTML === move && q('c6a').innerHTML === move && q('c4a').innerHTML === '') {return [1,1]}
    if(q('c4a').innerHTML === move && q('c6a').innerHTML === move && q('c2a').innerHTML === '') {return [0,2]}
}
function checkForTringle() {
    if (q('c1a').innerHTML === 'X' && q('c3a').innerHTML === 'X' && q('c0a').innerHTML === '') {
        return turnTOarrayNumber('0')
    }
    else if (q('c1a').innerHTML === 'X' && q('c5a').innerHTML === 'X' && q('c2a').innerHTML === '') {
        return turnTOarrayNumber('2')
    }
    else if (q('c3a').innerHTML === 'X' && q('c7a').innerHTML === 'X' && q('c6a').innerHTML === '') {
        return turnTOarrayNumber('6')
    }
    else if (q('c5a').innerHTML === 'X' && q('c7a').innerHTML === 'X' && q('c8a').innerHTML === '') {
        return turnTOarrayNumber('8')
    }
}
function checkIfAtCenter() {
    if (q('c4a').innerHTML === 'X') {
        let spot = placeAtCorner()
        q(`c${spot}a`).innerHTML = 'O'
        q(`c${spot}a`).removeEventListener('click', check)
        let [row, col] = turnTOarrayNumber(spot)
        grid[row][col] = 'O'
        return true
    }  else {
        return false
    }
}
function checkIfAtCorner() {
    if (q('c0a').innerHTML === 'X' || q('c2a').innerHTML === 'X' || q('c6a').innerHTML === 'X' || q('c8a').innerHTML === 'X') {
        let spot = placeAtCenter()
        if (spot) {
            q(`c${spot}a`).innerHTML = 'O'
            let [row, col] = turnTOarrayNumber(spot)
            grid[row][col] = 'O'
            q(`c${spot}a`).removeEventListener('click', check)
        } else {
            let spot = placeAtIndex()
            if (spot) {
                q(`c${spot}a`).innerHTML = 'O'
                q(`c${spot}a`).removeEventListener('click', check)
                let [rows, col] = turnTOarrayNumber(spot)
                grid[rows][col] = 'O'
            } else {
                let spot = getRandomPlace()
                q(`c${spot}a`).innerHTML = 'O'
                q(`c${spot}a`).removeEventListener('click', check)
                let [rows, col] = turnTOarrayNumber(spot)
                grid[rows][col] = 'O'
            }
        }
        return true
    } else {
        return false
    }
}
function placeAtIndex() {
    let x = randomNumber(0,3)
    if (x === 0) x = 1;
    else if (x === 1) x = 3;
    else if (x === 2) x = 5;
    else if (x === 3) x = 7;

    if (q(`c${x}a`).innerHTML === '') {
        return x
    } else {
        return placeAtIndex()
    }
}

function placeAtCorner() {
    let x = randomNumber(0,3)
    if (x == 0) x = 0
    else if (x == 1) x = 2
    else if (x === 2) x = 6
    else if (x === 3) x = 8

    if(q('c0a').innerHTML !== '' && q('c2a').innerHTML !== '' && q('c6a').innerHTML !== '' && q('c8a').innerHTML !== '') {
        return getRandomPlace()
    } else {
        if (q(`c${x}a`).innerHTML === '') {
            return x
        }
        else {return placeAtCorner}
    }

}




function turnTOarrayNumber(num) {
    let row = Math.floor(num / 3)
    let col = num % 3
    return [row, col]
}
function turnTOnumberFromArray(array) {
    let [row,col ] = array
    return sum = (row*3)+col
}

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function getRandomPlace() {
    console.log('yo')
    let spot = randomNumber(0, 8)
    if (q(`c${spot}a`).innerHTML === '') {
        return spot
    }
    else {
        return getRandomPlace()
    }
}
function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
function checkIfTie() {
    let count = 0
    for(i=0;i<=8;i++) {
        if(q(`c${i}a`).innerHTML !== '') {count++}
    }
    if(count === 9) {
        return true
    } else {
        return false
    }
}
function placeAtCenter() {
    if(q('c4a').innerHTML === '') {
        return 4
    } else {return false}
}

function checkIfWon(move) {
    for(let row of grid) {
        let count = 0
        for(let cell of row) {
            if(cell === move) {
                count++
            }
        }
        if(count === 3) {
            result(move)
        }
    }
    for(let cell = 0; cell < 3; cell++) {
        let count = 0
        for(let row = 0; row <3; row++) {
            if(grid[row][cell] === move) {
                count++
            }
        }
        if(count === 3) {
            result(move)
        }
    }
    if(q('c0a').innerHTML === move && q('c4a').innerHTML === move && q('c8a').innerHTML === move) {result(move)}
    if(q('c2a').innerHTML === move && q('c4a').innerHTML === move && q('c6a').innerHTML === move) {result(move)}
}
function playAgain() {
    grid = Array.from({ length: 3 }, () => Array(3).fill(''));
    for(let i=0;i<=8;i++) {
        q(`c${i}a`).innerHTML = ''
        q(`c${i}a`).addEventListener('click', check)
    }
    q('turn').innerHTML = 'Your turn'
    botDisabled = false
    q('PlayAgainButton').hidden = true

}

function back() {
    window.location.href = '../'
}
function result(turn) {
    q(`turn`).innerHTML = `${turn} won!`
    botDisabled = true
    document.querySelectorAll('.cube').forEach(cube => {
        cube.removeEventListener('click', check)
    })
    q('PlayAgainButton').hidden = false
}
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

function botTurn() {
    let result = minimax(grid, 3, true)
    if (result.bot)

    disabled = false
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

function checkIfCanWin(move) {
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

function minimax(grid, depth, isBotTurn) {
    return { score: 0, move: null };
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
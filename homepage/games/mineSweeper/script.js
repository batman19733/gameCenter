const rows = 25
const col = 25
let grid = []



for(let i = 0; i < rows; i++) {
    grid[i] =[]
    for(let x=0; x < col; x++) {
        grid[i][x] = ''
    }
}
display(grid)

q('board').style.gridTemplateColumns = `repeat(${col}, 20px)`
q('board').style.gridTemplateRows = `repeat(${rows}, 20px)`


grid[(rows-1)/2][(col-1)/2] = 's'

display(grid)






function q(qury) {
    return document.querySelector(`.${qury}`)
}


function display(array) {
    let boardHTML = ''
    let grid = array
    for(let row of grid) {
        for(let col of row) {
            boardHTML += `<div class="cube">${col}</div>`
        }
    }
    q('board').innerHTML = boardHTML

    let count = 0
    document.querySelectorAll('.cube').forEach(c => {
        count++
        if (count % 2 === 0) {
            c.style.backgroundColor = '#A2D149'
        }
        c.classList.add(`c${count}a`)
        if(c.innerHTML === 's') {
            c.style.backgroundColor = 'lightblue'
        }
    })
}
function move(r, c) {
    let pose = `[${12+r}][${12+c}]`
    grid[[pose]] = 'snake'
    display(grid)
}

const movment = async e => {
    if(e.key === 'ArrowUp') {
        console.log('up')
        move(2,2)
    }
    if(e.key === 'ArrowLeft') {
        console.log('left')
        // setTimeout
    }
    if(e.key === 'ArrowRight') {
        console.log('right')
        // setTimeout
    }
    if(e.key === 'ArrowDown') {
        console.log('down')
        // setTimeout
    }
}


document.body.addEventListener('keydown', movment)
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
let poseX = 12
let poseY = 12
let poses = []
let count = 0;
newPose = false
function move(r, c, newPose) {
    count++
    grid[`${poseX}`][`${poseY}`] = ''
    if (newPose === true) {
        poses[`${count}`] = poseX
        count++
        poses[`${count}`] = poseY
    }
    poseX += r
    poseY += c
    grid[`${poseX}`][`${poseY}`] = 's'
    if (poses[count]) {
        grid[`${poses[count-1]}`][`${poses[count]}`] = 's'
    }
    display(grid)
}

let disabledUP = false;
let disabledLeft = false;
let disabledRight = false;
let disabledDown = false;

let upKey;
let leftKey;
let rightKey;
let downKey;
const movment = async e => {
    if(e.key === 'ArrowUp') {
        if (disabledUP) return
        disabledUP = true
        move(-1,0)
        upKey = setInterval(() => move(-1,0), 200)
        clearInterval(leftKey)
        clearInterval(rightKey)
        clearInterval(downKey)
        disabledLeft = false;
        disabledRight = false;
        disabledDown = true;
    }
    if(e.key === 'ArrowLeft') {
        if (disabledLeft) return
        disabledLeft = true
        move(0,-1)
        leftKey = setInterval(() => move(0,-1), 200)
        clearInterval(upKey)
        clearInterval(rightKey)
        clearInterval(downKey)
        disabledUP = false;
        disabledRight = true;
        disabledDown = false;
    }
    if(e.key === 'ArrowRight') {
        if (disabledRight) return
        disabledRight = true
        move(0,1)
        rightKey = setInterval(() => move(0,1), 200)
        clearInterval(upKey)
        clearInterval(leftKey)
        clearInterval(downKey)
        disabledUP = false;
        disabledLeft = true;
        disabledDown = false;
    }
    if(e.key === 'ArrowDown') {
        if (disabledDown) return
        disabledDown = true
        move(1,0)
        downKey = setInterval(() => move(1,0), 200)
        clearInterval(upKey)
        clearInterval(leftKey)
        clearInterval(rightKey)
        disabledUP = true;
        disabledLeft = false;
        disabledRight = false;
    }
}


document.body.addEventListener('keydown', movment)
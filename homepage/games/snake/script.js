const index = 15
let score = 0
let way;
updateScore()
const pices = {
    body: (num) => `<div class="piece p${num} body"></div>`,
    apple: (num) => `<div class="apple a${num}"></div>`
}

let boardHTML = ''
for (let i=0;i<index**2;i++) {
    boardHTML += `<div class="cube c${i}"></div>`
}
q('board').innerHTML = boardHTML
q('board').style.gridTemplateColumns = `repeat(${index}, 1fr)`
for (let i=0;i<index**2;i++) {
    let [row, col] = AFN(i)
    let num = row+col
    num % 2 === 0 ? q(`c${i}`).style.backgroundColor = 'darkgreen':q(`c${i}`).style.backgroundColor = 'green'
}
let grid = Array.from({ length: index }, () => Array(index).fill(null));
let snake = [[7,5], [7,4], [7,3]]
let apple = [[7,11]]
putApple()
putSnake()
document.addEventListener('keydown', where)
let disableW = false
let disableA = true
let disableS = false
let disableD = false
let disable = false
let disbaleAll = false
function where(e) {
    if (disable) return
    if (disbaleAll) return
    let key = e.key
    if (key === 'w' & disableW === false || key === 'ArrowUp' && disableW === false) {move([-1,0]); disableW = true; disableA = false; disableS = true; disableD = false}
    else if (key === 'a' & disableA === false || key === 'ArrowLeft' && disableA === false) {move([0,-1]); disableW = false; disableA = true; disableS = false; disableD = true}
    else if (key === 's' & disableS === false || key === 'ArrowDown' && disableS === false) {move([1,0]); disableW = true; disableA = false; disableS = true; disableD = false}
    else if (key === 'd' & disableD === false || key === 'ArrowRight' && disableD === false) {move([0,1]); disableW = false; disableA = true; disableS = false; disableD = true}
}

let c = 0
let dontMoveLastOne = false
async function move(dir) {
    way = dir
    disable = true
    const t = ++c
    while(dir !== undefined && t === c) {
        let [row, col] = dir
        let len = snake.length-1
        let [rs, cs] = snake[len]
        grid[rs][cs] = null
        q(`c${NFA([rs, cs])}`).innerHTML = ''

        for(let i=snake.length-1;i>0;i--) {
            snake[i] = snake[i-1]
        }
        dontMoveLastOne = false

        let head = snake[0]
        let [r, c] = head
        if (c+col >= index | c+col <0 | r+row >= index | r+row <0) {q('tr').innerHTML = `you lost! score: ${score}`; disable = true; disbaleAll = true; return}
        let newPart = [r+row, c+col]
        snake[0] = newPart
        putSnake()
        for(let i=1;i<snake.length;i++) {
            if(snake[i].toString() === snake[0].toString()) {
                q('tr').innerHTML = `uh oh... you died! score: ${score}`
                disable = true
                disbaleAll = true
                return
            }
        }
        for(let i=0;i<apple.length;i++) {
            if(apple[i].toString() === snake[0].toString()) {
                apple = []
                score++
                updateScore()
                grow()
                putAppleAtRandomPlace()
            }
        }
        removeDisable()
        await new Promise(x => setTimeout(x, 130))
    }
}
async function removeDisable() {
    await new Promise(x => setTimeout(x, 10))
    disable = false
}
function grow() {
    let lastPoint = snake.length-1
    let [row,col] = snake[lastPoint]
    snake.push([row, col])
    dontMoveLastOne = true
    putSnake()
}
function updateScore() {
    q('tr').innerHTML = `score: ${score}`
}

function putSnake() {
    let last = snake[snake.length-1]
    let [r,c] = last
    q(`c${NFA([r,c])}`).classList.add('tail')

    for(let i =0;i<snake.length;i++) {
        let part = snake[i]
        let [row,col] = part
        grid[row][col] = 1
        let [r,c] = snake[0]
        q(`c${NFA([row,col])}`).innerHTML = pices.body(NFA(part))
        q(`p${NFA([r,c])}`).style.backgroundColor = 'blue'
        q(`c${NFA([r,c])}`).style.backgroundColor = 'red'
        if (way) {
            let [a,b] = way
            if (NFA([r-a,c-b]) % 2 === 0) {q(`c${NFA([r-a,c-b])}`).style.backgroundColor = 'darkgreen'} else {q(`c${NFA([r-a,c-b])}`).style.backgroundColor = 'green'}

            if (way[0] === -1 && way[1] === 0) {
                q(`p${NFA([r,c])}`).classList.add('up')
            }

            if (way[0] === 0 && way[1] === -1) {
                q(`p${NFA([r,c])}`).classList.add('left')
            }

            if (way[0] === 1 && way[1] === 0) {
                q(`p${NFA([r,c])}`).classList.add('down')
            }

            if (way[0] === 0 && way[1] === 1) {
                q(`p${NFA([r,c])}`).classList.add('right')
            }
        }
    }

}
function q(qury) {
    return document.querySelector(`.${qury}`)
}
function NFA(spot) {
    let [row, col] = spot
    return row*index+col
}
function AFN(num) {
    return [Math.floor(num / index), num % index]
}
function putApple() {
    apple.forEach(spot => {
        let [r,c] = spot
        let num = NFA([r,c])
        q(`c${num}`).innerHTML = pices.apple(num)
        grid[r][c] = 2
    })
}
function putAppleAtRandomPlace() {
    let spot = Math.floor(Math.random() * 225)
    let [row, col] = AFN(spot)
    if (grid[row][col] !== null) {putAppleAtRandomPlace(); return}
    apple = [[row,col]]
    putApple([row,col])
}
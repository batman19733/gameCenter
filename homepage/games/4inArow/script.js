// localStorage.clear()
let html = ''
let move = JSON.parse(localStorage.getItem('move')) || 'red'
girdRowsColumns = 9
let disabled = false
let menu
let score = JSON.parse(localStorage.getItem('score'))
if (score.red === undefined || score.blue === undefined) { score = {
    red: 0,
    blue: 0
}
}
displayScore()


if (window.innerWidth >= 1150) {
    document.querySelector('.red-wins').classList.add('side-left')
    document.querySelector('.blue-wins').classList.add('side-right')
    menu = 'big'
}
else if (window.innerWidth < 1150) {
    document.querySelector('.red-wins').classList.add('down-left')
    document.querySelector('.blue-wins').classList.add('down-right')
    document.querySelector('.all').classList.add('big')
    menu = 'small'
}

for(i=1;i<=girdRowsColumns ** 2;i++) {
    html += `<div class="cube${i}A cube"></div>\n`
    numCubed = i
}


const all = document.querySelector('.all');
all.innerHTML = html

document.querySelector('.all').style.gridTemplateColumns = `repeat(${Math.sqrt(numCubed)}, 1fr)`
document.querySelector('.all').style.gridTemplateRows = `repeat(${Math.sqrt(numCubed)}, 1fr)`

const check = function(e) {
    if (disabled) return
    if(move === 'red') {
        e.target.style.backgroundColor = 'salmon'
    } else {e.target.style.backgroundColor = 'lightblue'}
    e.target.innerHTML = move

    const className = e.target.className;
    let number = className.replace('cube', '').replace('A', '').replace(' ', '').replace('cube', '');
    number = Number(number)
    moveToPlace(number)
    changeBackground()
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

async function moveToPlace(classNumber) {
    localStorage.setItem('move', JSON.stringify(move))
    if (document.querySelector(`.cube${classNumber}A`).innerHTML === '') return
    disabled = true
    await new Promise(x => setTimeout(x, 70))
    if(classNumber <= (girdRowsColumns ** 2-girdRowsColumns) && document.querySelector(`.cube${classNumber+girdRowsColumns}A`).innerHTML === '') {
        let upper;
        if(classNumber-girdRowsColumns <= 0) {
            upper = classNumber
        } else {upper = classNumber-girdRowsColumns}
        document.querySelector(`.cube${classNumber+girdRowsColumns}A`).innerHTML = move
        document.querySelector(`.cube${classNumber}A`).innerHTML = ''

        if(move === 'red') {
            document.querySelector(`.cube${classNumber+girdRowsColumns}A`).style.backgroundColor = 'salmon' //coloring
            document.querySelector(`.cube${classNumber}A`).style.backgroundColor = 'rgb(160, 159, 159)' //coloring
        } else {
            document.querySelector(`.cube${classNumber+girdRowsColumns}A`).style.backgroundColor = 'lightblue' //coloring
            document.querySelector(`.cube${classNumber}A`).style.backgroundColor = 'rgb(160, 159, 159)' //coloring 
        }


        document.querySelector(`.cube${classNumber}A`).addEventListener('click', check) // remove click
        document.querySelector(`.cube${classNumber+girdRowsColumns}A`).removeEventListener('click', check) // one under remove click
        document.querySelector(`.cube${upper}A`).addEventListener('click', check) // one above add click
        classNumber += girdRowsColumns
        if (classNumber <= girdRowsColumns**2) {
            moveToPlace(classNumber)
        }
    } else {
        document.querySelector(`.cube${classNumber}A`).removeEventListener('click', check)
        checkIfWin(move)
        move = move === 'red' ? 'blue' : 'red'
        localStorage.setItem('move', JSON.stringify(move))
        disabled = false
    }
    localStorage.setItem('move', JSON.stringify(move))
    localStorage.setItem('cubes', JSON.stringify(document.querySelector('.all').innerHTML))
}

async function checkIfWin(player) {
    for(let i = 1; i<=(girdRowsColumns ** 2)-3; i++) {
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+1) === player && cubeInnerHtml(i+2) === player && cubeInnerHtml(i+3) === player) {
            displayResult(player, i, i+3)
        }
    }

    for(let i = 1; i<=(girdRowsColumns ** 2)-3*girdRowsColumns; i++) {
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns) === player && cubeInnerHtml(i+2*girdRowsColumns) === player && cubeInnerHtml(i+3*girdRowsColumns) === player) {
            displayResult(player, i, i+3*girdRowsColumns)
        }
    }
    for(let i = 1; i<=girdRowsColumns**2;i++) {
        const col = (i - 1) % 9 + 1;
        if (col >= 7) continue
        if (i>=girdRowsColumns**2-3*girdRowsColumns) continue
        // document.querySelector(`.cube${i}A`).style.backgroundColor = 'red'
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns +1) === player && cubeInnerHtml(i+2*girdRowsColumns + 2) === player && cubeInnerHtml(i+3*girdRowsColumns + 3) === player) {
            displayResult(player, i, i+3*girdRowsColumns+3)
        }
    }
    for(let i = 1; i<=girdRowsColumns**2;i++) {
        const col = (i - 1) % 9 + 1;
        if (col <= 3) continue
        if (i>girdRowsColumns**2-3*girdRowsColumns) continue
        // document.querySelector(`.cube${i}A`).style.backgroundColor = 'blue'
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns -1) === player && cubeInnerHtml(i+2*girdRowsColumns - 2) === player && cubeInnerHtml(i+3*girdRowsColumns - 3) === player) {
            displayResult(player, i, i+3*girdRowsColumns-3)
        }
    } 
}

function displayResult(color, cube1, cube4) {
    document.querySelectorAll('.cube').forEach(cube => {
        cube.removeEventListener('click', check)
    })
    document.querySelector('.result').innerHTML = `${color} won`
    document.querySelector('.playAgain').hidden = false

    
    let x1 = document.querySelector(`.cube${cube1}A`).getBoundingClientRect().x
    let y1 = document.querySelector(`.cube${cube1}A`).getBoundingClientRect().y
    let width1 = document.querySelector(`.cube${cube1}A`).getBoundingClientRect().width

    let x2 = document.querySelector(`.cube${cube4}A`).getBoundingClientRect().x
    let y2 = document.querySelector(`.cube${cube4}A`).getBoundingClientRect().y
    let width2 = document.querySelector(`.cube${cube4}A`).getBoundingClientRect().width


    document.querySelector('.svg').innerHTML = `<line x1="${x1+width1/2}" y1="${y1+width1/2}" x2="${x2+width2/2}" y2="${y2+width2/2}" stroke="rgb(73, 73, 73)" stroke-width="5" stroke-linecap="round"/>`

    if (color === 'red') {
        score.red += 1
    } else {
        score.blue += 1
    }
    displayScore()
}

function cubeInnerHtml(num) {
    let result = document.querySelector(`.cube${num}A`).innerHTML
    return result
}
function changeBackground() {
    if(move === 'red') {
        document.body.style.backgroundColor = 'lightblue'
        document.querySelector('.playAgain').classList.add('blue')
        document.querySelector('.playAgain').classList.remove('salmon')
    }
    else if (move === 'blue') {
        document.body.style.backgroundColor = 'salmon'
        document.querySelector('.playAgain').classList.add('salmon')
        document.querySelector('.playAgain').classList.remove('blue')
    }
}

function playAgain() {
    document.querySelector('.result').innerHTML = ''
    document.querySelectorAll('.cube').forEach(cube => {
        cube.innerHTML = ''
        cube.style.backgroundColor = 'rgb(160, 159, 159)'
        cube.addEventListener('click', check)
    })
    document.querySelector('.svg').innerHTML = ''
    move = 'red'
    document.body.style.backgroundColor = 'salmon'
    document.querySelector('.playAgain').hidden = true
}

function displayScore() {
    document.querySelector('.red-wins').innerHTML = `red wins: ${score.red}`
    document.querySelector('.blue-wins').innerHTML = `blue wins: ${score.blue}`
    localStorage.setItem('score', JSON.stringify(score))
}
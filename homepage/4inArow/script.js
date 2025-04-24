let html = ''
let move = 'X'
girdRowsColumns = 9

for(i=1;i<=girdRowsColumns ** 2;i++) {
    html += `<div class="cube${i}A cube"></div>\n`
    numCubed = i
}

const all = document.querySelector('.all');
all.innerHTML = html
document.querySelector('.all').style.gridTemplateColumns = `repeat(${Math.sqrt(numCubed)}, 1fr)`
document.querySelector('.all').style.gridTemplateRows = `repeat(${Math.sqrt(numCubed)}, 1fr)`

const check = function(e) {
    e.target.innerHTML = move

    const className = e.target.className;
    let number = className.replace('cube', '').replace('A', '').replace(' ', '').replace('cube', '');
    number = Number(number)
    moveToPlace(number)
    checkIfWin(move)

    move = move === 'X' ? 'O' : 'X'
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})

function moveToPlace(classNumber) {
    if(classNumber <= (girdRowsColumns ** 2-girdRowsColumns) && document.querySelector(`.cube${classNumber+girdRowsColumns}A`).innerHTML === '') {
        let upper;
        if(classNumber-girdRowsColumns <= 0) {
            upper = classNumber
        } else {upper = classNumber-girdRowsColumns}
        document.querySelector(`.cube${classNumber+girdRowsColumns}A`).innerHTML = move
        document.querySelector(`.cube${classNumber}A`).innerHTML = ''
        document.querySelector(`.cube${classNumber}A`).addEventListener('click', check) // remove click
        document.querySelector(`.cube${classNumber+girdRowsColumns}A`).removeEventListener('click', check) // one under remove click
        document.querySelector(`.cube${upper}A`).addEventListener('click', check) // one above add click
        classNumber += girdRowsColumns
        if (classNumber < girdRowsColumns**2) {
            moveToPlace(classNumber)
        }
    } else {
        document.querySelector(`.cube${classNumber}A`).removeEventListener('click', check)
    }
}

function checkIfWin(player) {
    for(let i = 1; i<=(girdRowsColumns ** 2)-3; i++) {
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+1) === player && cubeInnerHtml(i+2) === player && cubeInnerHtml(i+3) === player) {
            console.log(`${player} won`)
            document.querySelectorAll('.cube').forEach(cube => {
                cube.removeEventListener('click', check)
            })
        }
    }

    for(let i = 1; i<=(girdRowsColumns ** 2)-3*girdRowsColumns; i++) {
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns) === player && cubeInnerHtml(i+2*girdRowsColumns) === player && cubeInnerHtml(i+3*girdRowsColumns) === player) {
            console.log(`${player} won`)
            document.querySelectorAll('.cube').forEach(cube => {
                cube.removeEventListener('click', check)
            })
        }
    }
    for(let i = 1; i<=girdRowsColumns**2;i++) {
        const col = (i - 1) % 9 + 1;
        if (col >= 7) continue
        if (i>=girdRowsColumns**2-3*girdRowsColumns) continue
        // document.querySelector(`.cube${i}A`).style.backgroundColor = 'red'
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns +1) === player && cubeInnerHtml(i+2*girdRowsColumns + 2) === player && cubeInnerHtml(i+3*girdRowsColumns + 3) === player) {
            console.log(`${player} won`)
        }
    }
    for(let i = 1; i<=girdRowsColumns**2;i++) {
        const col = (i - 1) % 9 + 1;
        if (col <= 3) continue
        if (i>girdRowsColumns**2-3*girdRowsColumns) continue
        // document.querySelector(`.cube${i}A`).style.backgroundColor = 'blue'
        if(cubeInnerHtml(i) === player && cubeInnerHtml(i+girdRowsColumns -1) === player && cubeInnerHtml(i+2*girdRowsColumns - 2) === player && cubeInnerHtml(i+3*girdRowsColumns - 3) === player) {
            console.log(`${player} won`)
        }
    }




    
}

function cubeInnerHtml(num) {
    let result = document.querySelector(`.cube${num}A`).innerHTML
    return result
}

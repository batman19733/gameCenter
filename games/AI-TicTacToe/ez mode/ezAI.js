let boardHTML = ''
let turn = 'player'
let EZdisabled;
let EZresult;
let EZcheck = ''
let EZgrid;

let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}

for(let i=1;i<=9;i++) {
    boardHTML += `<div class="cube c${i}a"></div>`
}
q('board').innerHTML = boardHTML
q('turn').innerHTML = 'Your turn'

EZgrid = new Array(9).fill('');
EZdisabled = false
EZcheck = async e => {
    if (EZdisabled) return
    EZdisabled = true
    e.target.innerHTML = 'x'
    let className = Number(e.target.className.replace('cube ', '').replace('c', '').replace('a', ''))
    e.target.removeEventListener('click', EZcheck)
    EZgrid[className-1] = 'x'
    EZresult = checkIfWin(EZgrid)
    if(EZresult) {
        q('turn').innerHTML = `${EZresult} won!`
        q('PlayAgainButton').hidden = false
        return
    }
    q('turn').innerHTML = 'bot thinking...'
    await new Promise(resolve => setTimeout(resolve, 1000))
    let count = 0
    for(let i=1;i<=9;i++) {
        if (q(`c${i}a`).innerHTML !== '') {
        count ++
    }}
    if (count < 9) {
        let randomPlace = getRandomPlace()
        q(`c${randomPlace}a`).innerHTML = 'O'
        EZgrid[randomPlace-1] = 'o'
        q(`c${randomPlace}a`).removeEventListener('click', EZcheck)
        let EZresult = checkIfWin(EZgrid)
        if(EZresult) {
            q('turn').innerHTML = `${EZresult} won!`
            q('PlayAgainButton').hidden = false
            return
        }
    }
    else {
        q('turn').innerHTML = 'tie.'
        q('PlayAgainButton').hidden = false
        return
    }
    q('turn').innerHTML = 'Your turn'
    EZdisabled = false
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', EZcheck)
})

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function getRandomPlace() {
    let spot = randomNumber(1, 9)
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
function checkIfWin(EZgrid) {
    let g = EZgrid
    for(let i = 0;i<9;i += 3) {
        if(g[i] === g[i+1] && g[i+1] === g[i+2] && g[i+2] !== '' ) {
            return g[i]
        }
    }
    for(let i = 0;i<3;i++) {
        if(g[i] === g[i+3] && g[i+3] === g[i+6] && g[i+6] !== '' ) {
            return g[i]
        }
    }
    if(g[0] === g[4] && g[4] === g[8] && g[4] !== '' ) {
        return g[4]
    }
    if(g[2] === g[4] && g[4] === g[6] && g[4] !== '' ) {
        return g[4]
    }
    return false
}
function playAgain() {
    q('PlayAgainButton').hidden = true
    for(let i=1;i<=9;i++) {
        q(`c${i}a`).innerHTML = ''
    }
    q('turn').innerHTML = 'Your turn'
    document.querySelectorAll('.cube').forEach(cube => {
        cube.addEventListener('click', EZcheck)
    })
    EZdisabled = false
    EZresult = false
    EZgrid = Array(9).fill('');
}
function back() {
    window.location.href = '../'
}
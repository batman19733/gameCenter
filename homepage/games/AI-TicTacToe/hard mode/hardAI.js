let boardHTML = ''

for(let i=1;i<=9;i++) {
    boardHTML += `<div class="cube c${i}a"></div>`
}
q('board').innerHTML = boardHTML
q('turn').innerHTML = 'Your turn'










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
function playAgain() {
    q('PlayAgainButton').hidden = true
    for(let i=1;i<=9;i++) {
        q(`c${i}a`).innerHTML = ' '
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
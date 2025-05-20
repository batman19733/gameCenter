let index = 9
if (window.innerWidth <= 450) {
    q('PlayAgainButton').style.position = 'absolute'
    q('PlayAgainButton').style.top = '85%'
}
let boardHTML = ''
for(let i=0; i<index**2;i++) {
    boardHTML += `<div class='cube c${i}a'></div>`
}
q('board').innerHTML = boardHTML

let grid = Array.from({ length: index }, () => Array(index).fill(''));














function q(qury) {
    return document.querySelector(`.${qury}`)
}
function turnToArrayFromNumber(num) {
    let row = Math.floor(num / index)
    let col = num % index
    return [row, col]
}
function turnToNumberFromArray(array) {
    let [row, col] = array
    return sum = (row*index)+col
}
function gameOver(text) {
    q('turn').innerHTML = text
    document.querySelectorAll('.cube').forEach(cube => {
        cube.removeEventListener('click', check)
    })
}
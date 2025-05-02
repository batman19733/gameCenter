let player = 'X'
let html = ''

let score = {
    Xwins: 0,
    Owins: 0
}
updateScore()

for(i = 1; i<=9; i++) {
    html += `document.querySelector('.cube${i}').addEventListener('click', () => {
        if (player === 'X') {
            document.querySelector('.cube${i}').innerHTML = 'X'
            checkIfWin(player)
            player = 'O'
            document.querySelector('.cube${i}').disabled = true
            document.querySelector('.all').style.boxShadow = '0 0 10px 10px blue'
            }
        else if (player === 'O') {
            document.querySelector('.cube${i}').innerHTML = 'O'
            checkIfWin(player)
            player = 'X'
            document.querySelector('.cube${i}').disabled = true
            document.querySelector('.all').style.boxShadow = '0 0 10px 10px red'
        }
    
    });`
}
eval(html)

function result(move) {
    document.querySelector('.result').innerHTML = `${move} won!`
    for(i = 1; i<=9; i++) {
        document.querySelector(`.cube${i}`).disabled = true
    }
    if (move === 'X') {
        score.Xwins++
        localStorage.setItem('Xwins', JSON.stringify(score.Xwins))
        updateScore()
    }
    if (move === 'O') {
        score.Owins++
        localStorage.setItem('Owins', JSON.stringify(score.Owins))
        updateScore()
    }
    document.querySelector('.play-again').hidden = false
}

function updateScore() {
    score.Owins = JSON.parse(localStorage.getItem('Owins')) || 0
    score.Xwins = JSON.parse(localStorage.getItem('Xwins')) || 0
    document.querySelector('.score').innerHTML = `X-wins: ${score.Xwins}, O-wins: ${score.Owins}`
}

function checkIfWin(move) {
    if (document.querySelector('.cube1').innerHTML === move && document.querySelector('.cube2').innerHTML === move && document.querySelector('.cube3').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube4').innerHTML === move && document.querySelector('.cube5').innerHTML === move && document.querySelector('.cube6').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube7').innerHTML === move && document.querySelector('.cube8').innerHTML === move && document.querySelector('.cube9').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube1').innerHTML === move && document.querySelector('.cube4').innerHTML === move && document.querySelector('.cube7').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube2').innerHTML === move && document.querySelector('.cube5').innerHTML === move && document.querySelector('.cube8').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube3').innerHTML === move && document.querySelector('.cube6').innerHTML === move && document.querySelector('.cube9').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube1').innerHTML === move && document.querySelector('.cube5').innerHTML === move && document.querySelector('.cube9').innerHTML === move) {
        result(move)
    }
    if (document.querySelector('.cube3').innerHTML === move && document.querySelector('.cube5').innerHTML === move && document.querySelector('.cube7').innerHTML === move) {
        result(move)
    }
}

function playAgain() {
    for(i = 1; i<=9; i++) {
        document.querySelector(`.cube${i}`).innerHTML = ''
        document.querySelector(`.cube${i}`).disabled = false
    }
    document.querySelector('.result').innerHTML = ''
    document.querySelector('.play-again').hidden = true
}

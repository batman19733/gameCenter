randomNumber = JSON.parse(localStorage.getItem('number'))
if (randomNumber === null) {
    randomNumber = pickNumber()
}
saveNumber()
let lives = JSON.parse(localStorage.getItem('lives'))
if(!lives || lives === 0) {
    setLives()
    randomNumber = pickNumber()
}
let color;
let winRate = JSON.parse(localStorage.getItem('winRate'))
if (!winRate) {winRate = 0}
document.querySelector('.js-win-rate').innerHTML = `win rate: ${winRate}%`
color = JSON.parse(localStorage.getItem('colorL'))
let playAgianS = `<br>do you wish to play agian?<br><button class="css-yes-button ${color}-yes" onclick="playAgain()">yes</button><button class="css-no-button ${color}-no" onclick="backToLobby()">no</button>`
updateColor()
let maxNum = 100;
let minNum = 0;
let barHight = 0;
let topDIV = 0;
let bottomDIV = 0;
//document.querySelector('.css-dark-bar').innerHTML = JSON.parse(localStorage.getItem('bar'))
//if (document.querySelector('.css-dark-bar').innerHTML === '') {
    document.querySelector('.css-dark-bar').innerHTML = `<div class="range-bar1"></div><div class="range-bar2"></div><div class="range-bar3"></div>`
//}
let score = JSON.parse(localStorage.getItem('score'))
if (score.red === undefined) {
    score = {
        wins: 0,
        losses: 0
    }
}
document.querySelector('.js-div-show-score').innerHTML = `wins: ${score.wins} losses: ${score.losses}`

document.body.addEventListener("keydown", (event) => {
    if (event.key === 'w') {
        color = 'white'
        updateColor()
    } else if (event.key === 'd') {
        color = 'dark'
        updateColor()
    }
})
function updateColor() {
    if (color === "white") {
        color = 'white'
        playAgianS = `<br>do you wish to play agian?<br><button class="css-yes-button ${color}-yes" onclick="playAgain()">yes</button><button class="css-no-button ${color}-no" onclick="backToLobby()">no</button>`
        document.body?.classList.add('white-body')
        document.body?.classList.remove('dark-body')
        document.querySelector('.css-title-div')?.classList.add('white-title')
        document.querySelector('.css-title-div')?.classList.remove('dark-title')
        document.querySelector('.css-all-game')?.classList.remove('dark-div')
        document.querySelector('.css-all-game')?.classList.add('white-div')
        document.querySelector('.js-guess-button')?.classList.add('white-guess')
        document.querySelector('.js-guess-button')?.classList.remove('dark-guess')
        document.querySelector('.js-input-guess')?.classList.add('white-input')
        document.querySelector('.js-input-guess')?.classList.remove('dark-input')
        document.querySelector('.css-yes-button')?.classList.add('white-yes')
        document.querySelector('.css-yes-button')?.classList.remove('dark-yes')
        document.querySelector('.css-no-button')?.classList.add('white-no')
        document.querySelector('.css-no-button')?.classList.remove('dark-no')
        localStorage.setItem('colorL', JSON.stringify(color))
    }
    else if(color === 'dark') {
        color = 'dark'
        playAgianS = `<br>do you wish to play agian?<br><button class="css-yes-button ${color}-yes" onclick="playAgain()">yes</button><button class="css-no-button ${color}-no" onclick="backToLobby()">no</button>`
        document.body?.classList.add('dark-body')
        document.body?.classList.remove('white-body')
        document.querySelector('.css-title-div')?.classList.add('dark-title')
        document.querySelector('.css-title-div')?.classList.remove('white-title')
        document.querySelector('.css-all-game')?.classList.remove('white-div')
        document.querySelector('.css-all-game')?.classList.add('dark-div')
        document.querySelector('.js-guess-button')?.classList.add('dark-guess')
        document.querySelector('.js-guess-button')?.classList.remove('white-guess')
        document.querySelector('.js-input-guess')?.classList.add('dark-input')
        document.querySelector('.js-input-guess')?.classList.remove('white-input')
        document.querySelector('.css-yes-button')?.classList.add('dark-yes')
        document.querySelector('.css-yes-button')?.classList.remove('white-yes')
        document.querySelector('.css-no-button')?.classList.add('dark-no')
        document.querySelector('.css-no-button')?.classList.remove('white-no')
        localStorage.setItem('colorL', JSON.stringify(color))
}}

let playerGuess = Number(document.querySelector('.js-input-guess').value)

document.querySelector('.js-title').innerHTML = `Guess The Number from 1-100<br>(you have ${lives} lives left)`
function clickRender() {
    render()
    document.querySelector('.js-input-guess').value = ''
}
document.querySelector('.js-guess-button').addEventListener('click', clickRender)

function keydownEnter(event) {
    if (event.key === 'Enter') {
        render();
        document.querySelector('.js-input-guess').value = ''
    } 
}

document.querySelector('.js-input-guess').addEventListener('keydown', keydownEnter)

document.querySelector(".js-input-guess").addEventListener("input", function () {
    let value = parseInt(this.value)
    if (value < 0) this.value = 0
    if (value > 100) this.value = 100
    })

function render() {
    if (lives <= 0) {
        document.querySelector('.js-div-player-guess').innerHTML = `<p>Game over! the number was ${randomNumber}<br>you lost${playAgianS}</p>`
    } else {
        playerGuess = Number(document.querySelector('.js-input-guess').value)
        if (playerGuess === randomNumber) {
            document.querySelector('.js-div-player-guess').innerHTML = `<p>you won the number was ${randomNumber}!${playAgianS}</p>`
            score.wins++
            updateScore()
            document.querySelector(".js-input-guess").removeEventListener('keydown', keydownEnter)
            document.querySelector('.js-guess-button').removeEventListener('click', clickRender)
            setNewNumber()
            setLives()
        }
        else if (lives === 1 && playerGuess !== randomNumber) {
            document.querySelector('.js-div-player-guess').innerHTML = `<p>Game over! the number was ${randomNumber}<br>you lost${playAgianS}</p>`
            score.losses++
            updateScore()
            lives--
        } else {
            playerGuess = Number(document.querySelector('.js-input-guess').value)
            if (playerGuess > maxNum) { playerGuess = maxNum; lives++}
            if (playerGuess < minNum) { playerGuess = minNum; lives++}
            if(playerGuess > randomNumber) {
                lives--
                document.querySelector('.js-div-player-guess').innerHTML = `<p>the number is under your guess ${playerGuess}<br>you have ${lives} lives left</p>`
                maxNum = playerGuess
                document.querySelector('.js-input-guess').setAttribute('max', `${maxNum}`)
                localStorage.setItem('max', JSON.stringify(maxNum))
                barHight = maxNum-minNum
                console.log(barHight)
                topDIV = 100-barHight-bottomDIV
                bottomDIV = 100-barHight-topDIV
                document.querySelector('.range-bar1').setAttribute('style', `height: ${topDIV}%;`)
                document.querySelector('.range-bar2').setAttribute('style', `height: ${barHight}%;`)
                document.querySelector('.range-bar3').setAttribute('style', `height: ${bottomDIV}%;`)
                document.querySelector('.range-bar2').innerHTML = `${maxNum}`
                document.querySelector('.range-bar3').innerHTML = `${minNum}`
            } else if (playerGuess < randomNumber) {
                lives--
                document.querySelector('.js-div-player-guess').innerHTML = `<p>the number is above your guess ${playerGuess}<br>you have ${lives} lives left</p>`
                minNum = playerGuess
                document.querySelector('.js-input-guess').setAttribute('min', minNum)
                localStorage.setItem('min', JSON.stringify(minNum))
                barHight = maxNum-minNum
                bottomDIV = 100-barHight-topDIV
                topDIV = 100-barHight-bottomDIV
                console.log(barHight)
                document.querySelector('.range-bar1').setAttribute('style', `height: ${topDIV}%;`)
                document.querySelector('.range-bar2').setAttribute('style', `height: ${barHight}%;`)
                document.querySelector('.range-bar3').setAttribute('style', `height: ${bottomDIV}%;`)
                document.querySelector('.range-bar2').innerHTML = `${maxNum}`
                document.querySelector('.range-bar3').innerHTML = `${minNum}`
            }
    }}
    document.querySelector('.js-title').innerHTML = `Guess The Number from 1-100<br>(you have ${lives} lives left)`
    localStorage.setItem('lives', JSON.stringify(lives))
    localStorage.setItem('bar', JSON.stringify(document.querySelector('.css-dark-bar').innerHTML))

function updateScore() {
    document.querySelector('.js-div-show-score').innerHTML = `wins: ${score.wins} losses: ${score.losses}`
    localStorage.setItem('score', JSON.stringify(score))
    winRate = (Math.round((score.wins / (score.wins + score.losses)) * 1000))/10
    document.querySelector('.js-win-rate').innerHTML = `win rate: ${winRate}%`
    localStorage.setItem('winRate', JSON.stringify(winRate))
}
}

function setLives() {
    lives = 5
}

function pickNumber() {
    randomNumber = Math.round(Math.random()*100)
    return randomNumber
}
function saveNumber() {
    localStorage.setItem('number', JSON.stringify(randomNumber))
}
function setNewNumber() {
    pickNumber()
    saveNumber()
}
function playAgain() {
    minNum = 0
    maxNum = 100
    document.querySelector('.range-bar2').innerHTML = ''
    document.querySelector('.range-bar3').innerHTML = ''
    topDIV = 0
    bottomDIV = 0
    document.querySelector('.range-bar1').setAttribute('style', `height: 0%;`)
    document.querySelector('.range-bar2').setAttribute('style', `height: 100%;`)
    document.querySelector('.range-bar3').setAttribute('style', `height: 0%;`)
    setNewNumber()
    document.querySelector('.js-div-player-guess').innerHTML = '<p>good luck!</p>'
    setLives()
    document.querySelector('.js-guess-button').addEventListener('click', clickRender)
    document.querySelector('.js-input-guess').addEventListener('keydown', keydownEnter)
    document.querySelector('.js-input-guess').value = ''
    document.querySelector('.js-title').innerHTML = `Guess The Number from 1-100<br>(you have ${lives} lives left)`
    localStorage.setItem('lives', JSON.stringify(lives))
}
function backToLobby() {
    location.assign("../../")
}
if (window.innerWidth < 1125) {
    document.querySelector('.css-dark-bar').style.marginLeft = '0px'
}
if (window.innerWidth < 700) {
        document.querySelector('.css-dark-bar').style.marginLeft = '0px'
    document.querySelector('.css-dark-bar').hidden = true
}
if (window.innerWidth < 450) {
    document.querySelector('.cdb').style.marginLeft = '0px'
    document.querySelector('.cdb').hidden = true
    document.querySelector('.css-all-game').style.width = '80vw'
    document.body.innerHTML = 'nah swag i tryed to fix this on phones it just doesnt work :praying emoji: maybe maybe ill fix it later but the code here weired af bearly working i wont fix it for now'
    document.body.style.display = 'flex'
    document.body.style.alignItems = 'center'
}
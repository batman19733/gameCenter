showTHIS = shortNumber(score)
showScore()

function addScore() {
    score = Number(score)
    score += scoreAmount
    showTHIS = shortNumber(score)
    showScore()
    saveScore()
}
function CaddScore() {
    score = Number(score)
    score += CscoreAmount
    showTHIS = shortNumber(score)
    showScore()
    saveScore()
}

function showScore() {
    document.querySelector('.score').innerHTML = `score: ${showTHIS}`
}

setInterval (async () => {
    addScore(1)
}, 1000)

function saveScore() {
    localStorage.setItem('score', JSON.stringify(score))
}

function addScoreAmount(amount) {
    score = Number(score)
    score += amount
    showScore()
    saveScore()
}


function shortNumber(num) {
    digits = num.toString().length
    let num0 = num.toString()[0]
    let num1 = num.toString()[1]
    let num2 = num.toString()[2]
    let num3 = num.toString()[3]
    let number
    if (digits === 3 || digits === 2 || digits === 1) {
        return num
    }
    else if (digits === 4) {
        number = `${num0}.${num1}K`
    }
    else if (digits === 5) {
        number = `${num0}${num1}.${num2}K`
    }
    else if (digits === 6) {
        number = `${num0}${num1}${num2}.${num3}K`
    }
    else if (digits === 7) {
        number = `${num0}.${num1}${num2}M`
    }
    else if (digits === 8) {
        number = `${num0}${num1}.${num2}M`
    }
    else if (digits === 9) {
        number = `${num0}${num1}${num2}.${num3}M`
    }
    else if (digits === 10) {
        number = `${num0}.${num1}${num2}B`
    }
    else if (digits === 11) {
        number = `${num0}${num1}.${num2}${num3}B`
    }
    else if (digits === 12) {
        number = `${num0}${num1}${num2}.${num3}B`
    }
    else if (digits === 13) {
        number = `${num0}.${num1}${num2}T`
    }
    else if (digits === 14) {
        number = `${num0}${num1}.${num2}${num3}T`
    }
    else if (digits === 15) {
        number = `${num0}${num1}${num2}.${num3}T`
    }
    else if (digits === 16) {
        number = `${num0}.${num1}${num2}Q`
    }
    else if (digits === 17) {
        number = `${num0}${num1}.${num2}Q`
    }
    else if (digits === 18) {
        number = `${num0}${num1}${num2}.${num3}Q`
    }
    else if (digits === 19) {
        number = `${num0}.${num1}${num2}aa`
    }
    else if (digits === 20) {
        number = `${num0}${num1}.${num2}${num3}aa`
    }
    else if (digits === 21) {
        number = `${num0}${num1}${num2}.${num3}aa`
    }
    else if (digits === 22) {
        number = `${num0}.${num1}${num2}ab`
    }
    else {
        number = num
    }

    return number
}
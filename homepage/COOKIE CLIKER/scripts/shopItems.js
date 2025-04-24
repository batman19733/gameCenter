function anotherclicker() {
    if (score - items[0].price > 0) {
        score -= Number(items[0].price)
        showScore()
        setInterval(async () => {
            addScoreAmount(1)
        }, 1000)
        saveScore()
        showTHIS = shortNumber(score)
        items[0].price *= 1.2
        items[0].price = Math.round(items[0].price)
        items[0].lvl += 1
        num += 1
        reloadShop()
        localStorage.setItem('num', num)
        localStorage.setItem('price0', JSON.stringify(items[0].price))
        localStorage.setItem('lvl0', JSON.stringify(items[0].lvl))
    }
}

function curserPoints() {
    if (score - items[1].price > 0) {
        score -= Number(items[1].price.toFixed(0))
        score += scoreAmount
        showTHIS = shortNumber(score)
        showScore()
        CscoreAmount += 1 
        saveScore()
        items[1].price *= 1.1
        items[1].price = Math.round(items[1].price)
        items[1].lvl += 1
        reloadShop()
        localStorage.setItem('price1', JSON.stringify(items[1].price))
        localStorage.setItem('lvl1', JSON.stringify(items[1].lvl))
        localStorage.setItem('CscoreAmount', JSON.stringify(CscoreAmount))
    }
}

function curserDouble() {
    if (score - items[2].price > 0) {
        score -= Number(items[2].price.toFixed(0))
        score += scoreAmount
        score = score.toFixed(0)
        showTHIS = shortNumber(score)
        showScore()
        CscoreAmount *= 2 
        saveScore()
        items[2].price *= 2
        items[2].price = Math.round(items[2].price)
        items[2].lvl += 1
        reloadShop()
        localStorage.setItem('price2', JSON.stringify(items[2].price))
        localStorage.setItem('lvl2', JSON.stringify(items[2].lvl))
        localStorage.setItem('CscoreAmount', JSON.stringify(CscoreAmount))
    }
}

function minerPoints() {
    if (score - items[3].price > 0) {
        score -= Number(items[3].price.toFixed(0))
        setInterval(async () => {
            addScoreAmount(10)
        }, 1000)
        showTHIS = shortNumber(score)
        showScore()
        saveScore()
        items[3].price *= 1.3
        items[3].price = Math.round(items[3].price)
        items[3].lvl += 1
        num += 10
        reloadShop()
        localStorage.setItem('price3', JSON.stringify(items[3].price))
        localStorage.setItem('lvl3', JSON.stringify(items[3].lvl))
        localStorage.setItem('num', num)
    }
}

function superMiner() {
    if (score - items[4].price > 0) {
        score -= Number(items[4].price.toFixed(0))
        score += scoreAmount
        score = score.toFixed(0)
        showTHIS = shortNumber(score)
        showScore()
        saveScore()
        setInterval(() => {
            addScoreAmount(50)
        }, 1000)
        items[4].price *= 1.4
        items[4].price = Math.round(items[4].price)
        items[4].lvl += 1
        num += 50
        reloadShop()
        localStorage.setItem('price4', JSON.stringify(items[4].price))
        localStorage.setItem('lvl4', JSON.stringify(items[4].lvl))
        localStorage.setItem('num', num)
    }
}
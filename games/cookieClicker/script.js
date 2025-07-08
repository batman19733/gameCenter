let score = JSON.parse(localStorage.getItem('scoreCookieClicker'))
if (score === NaN) {score = 0}
let scorePerClick = JSON.parse(localStorage.getItem('scorePerClick')) || 1
let scorePerSec = JSON.parse(localStorage.getItem('scorePerSec')) || 0
updateScore()
let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}

let shopItems = [{
    name: 'curser points +1',
    price: 100,
    lvl: 1,
    action: 'curserPoints(',
    spot: 0
}, {
    name: 'autoclicker +1',
    price: 10,
    lvl: 0,
    action: 'autoclicker(',
    spot: 1
}, {
    name: 'miner +5 points per/s',
    price: 50,
    lvl: 0,
    action: 'minerPoints(',
    spot: 2
}, {
    name: 'super miner +50 per/s',
    price: 10000,
    lvl: 0,
    action: 'superMinerPoints(',
    spot: 3
}, {
    name: 'golden cursor +5 click',
    price: 5000,
    lvl: 0,
    action: 'goldenCursorPoints(',
    spot: 4
}, {
    name: 'ultra autoclicker +10 per/s',
    price: 1500,
    lvl: 0,
    action: 'ultraAutoclicker(',
    spot: 5
}, {
    name: 'diamond miner +100 per/s',
    price: 50000,
    lvl: 0,
    action: 'diamondMinerPoints(',
    spot: 6
}, {
    name: 'platinum drill +500 per/s',
    price: 250000,
    lvl: 0,
    action: 'platinumDrillPoints(',
    spot: 7
}, {
    name: 'time warper +50 click',
    price: 100000,
    lvl: 0,
    action: 'timeWarperPoints(',
    spot: 8
}, {
    name: 'quantum core +1000 per/s',
    price: 1000000,
    lvl: 0,
    action: 'quantumCorePoints(',
    spot: 9
}, {
    name: 'infinity clicker +500 click',
    price: 750000,
    lvl: 0,
    action: 'infinityClickerPoints(',
    spot: 10
}, {
    name: 'black hole miner +5000 per/s',
    price: 10000000,
    lvl: 0,
    action: 'blackHoleMinerPoints(',
    spot: 11
}]

for(i=0; i<shopItems.length;i++) {
    const rawLvl = localStorage.getItem(`lvl${i}`);
    if (rawLvl === 'undefined' || rawLvl == null) {
        reloadShop()
    } else {
        shopItems[i].price = JSON.parse(localStorage.getItem(`price${i}`))
        shopItems[i].lvl =  JSON.parse(localStorage.getItem(`lvl${i}`))
    }
}

document.querySelector('.cookie').addEventListener('click', (e) => {
    score += scorePerClick
    localStorage.setItem('scoreCookieClicker', JSON.stringify(score))
    document.querySelector('.score').innerHTML = `score: ${score}`
    floatingNumber = document.createElement('p')
    floatingNumber.style.left = `${e.pageX}px`
    floatingNumber.style.top = `${e.pageY}px`
    floatingNumber.classList.add('floating-number')
    floatingNumber.textContent = `+${scorePerClick}`
    document.body.appendChild(floatingNumber)
    setTimeout(() => {
        document.querySelector('.floating-number').remove()
    }, 1900)
})

function reloadShop() {
    let ItemHtml = ''
    shopItems.forEach((item) => {
        item.price = Math.round(item.price);
        ItemHtml += `<div class="item" onclick="${item.action}${item.spot})">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price-lvl">${item.price}$  lvl: ${item.lvl}</div>
                    </div>`
    })
    document.querySelector('.shop-body').innerHTML = ItemHtml
    for(i=0; i<shopItems.length;i++) {
        localStorage.setItem(`price${i}`, JSON.stringify(shopItems[i].price))
        localStorage.setItem(`lvl${i}`, JSON.stringify(shopItems[i].lvl))
    }
    localStorage.setItem('scorePerSec', JSON.stringify(scorePerSec))
    localStorage.setItem('scorePerClick', JSON.stringify(scorePerClick))
}
reloadShop()
if (score === NaN) {score = 0}


function autoclicker(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 1
        reloadItem(spot, 1.1)
    }
}

function minerPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 5
        reloadItem(spot, 1.2)
    }
}
function curserPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerClick += 1
        reloadItem(spot, 1.2)
    }
}
function superMinerPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 50
        reloadItem(spot, 1.3)
    }
}

function goldenCursorPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerClick += 5
        reloadItem(spot, 1.3)
    }
}

function ultraAutoclicker(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 10
        reloadItem(spot, 1.3)
    }
}

function diamondMinerPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 100
        reloadItem(spot, 1.4)
    }
}

function platinumDrillPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 500
        reloadItem(spot, 1.5)
    }
}

function timeWarperPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerClick += 50
        reloadItem(spot, 1.5)
    }
}

function quantumCorePoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 1000
        reloadItem(spot, 1.6)
    }
}

function infinityClickerPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerClick += 500
        reloadItem(spot, 1.6)
    }
}

function blackHoleMinerPoints(spot) {
    if (score - shopItems[spot].price >= 0) {
        scorePerSec += 5000
        reloadItem(spot, 1.7)
    }
}

function updateScore() {
    score = Math.round(score);
    localStorage.setItem('scoreCookieClicker', JSON.stringify(score))
    document.querySelector('.score').innerHTML = `score: ${score}`
    document.querySelector('.score-per-sec').innerHTML = `score per/s: ${scorePerSec}`
}

function reloadItem(x, num) {
    score -= shopItems[x].price
    updateScore()
    shopItems[x].price *= num
    shopItems[x].lvl += 1
    reloadShop()
}

setInterval(() => {
    score += scorePerSec 
    updateScore()
}, 1000) 


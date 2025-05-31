let score = JSON.parse(localStorage.getItem('scoreCookieClicker'))
if (score === NaN) {score = 0}
console.log(score)
let scorePerClick = JSON.parse(localStorage.getItem('scorePerClick')) || 1
let scorePerSec = JSON.parse(localStorage.getItem('scorePerSec')) || 0
updateScore()

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
    updatesize()
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


function updatesize() {
    if (window.innerWidth <= 750) {
        document.querySelector('.cookie').style.left = `65%`
        document.querySelector('.score').style.left = `65%`
        document.querySelector('.score-per-sec').style.left = `65%`
        document.querySelector('.score-per-sec').style.top = `20%`

        document.querySelector('.shop-body').style.width = `110px`
        document.querySelector('.shop-title').style.width = `110px`
        document.querySelector('.shop-div').style.width = `110px`
        document.querySelectorAll('.item').forEach(item => {
            item.style.width = '109px'
        })
        document.querySelectorAll('.item-name').forEach(item => {
            item.style.fontSize = '15px'
        })
        document.querySelector(`a`).style.paddingLeft = `120px`
    }
}
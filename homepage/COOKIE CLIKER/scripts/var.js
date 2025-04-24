let number = '' // number after everyclick
// restart function
function restart() {
    num = 1
    items = [{
        name: 'autoclicker +1 per/s',
        price: 10,
        lvl: 0,
        action: "anotherclicker()"
    },
    {
        name: 'curser points +1',
        price: 100,
        lvl: 1,
        action: 'curserPoints()'
    },
    {
        name: 'curser points x 2',
        price: 50000,
        lvl: 0,
        action: "curserDouble()"
    },
    {
        name: 'miner +10 per/s',
        price: 1000,
        lvl: 0,
        action: 'minerPoints()'
    },
    {
        name: 'superMiner +50 per/s',
        price: 5000,
        lvl: 0,
        action: 'superMiner()'
    }]
    

    function reloadShop() {
        let itemHTML = '';
        items.forEach((item) => {
            itemHTML += `<button class="item" onclick="${item.action}"><p class="item-name">${item.name}</p><p class="item-price">${item.price.toFixed(1)}$ lvl ${item.lvl}</p></button>`
        });
        document.querySelector('.items').innerHTML = itemHTML
        document.querySelector('.cookies-per').innerHTML = `score per/s: ${num}`
    }
    reloadShop()
    scoreAmount = 1
    localStorage.setItem('price0', JSON.stringify(items[0].price))
    localStorage.setItem('lvl0', JSON.stringify(items[0].lvl))
    localStorage.setItem('num', num)
    localStorage.setItem('price2', JSON.stringify(items[2].price))
    localStorage.setItem('lvl2', JSON.stringify(items[2].lvl))
    localStorage.setItem('scoreAmount', JSON.stringify(scoreAmount))
    localStorage.setItem('price3', JSON.stringify(items[3].price))
    localStorage.setItem('lvl3', JSON.stringify(items[3].lvl))
    score = 0
    localStorage.setItem('score', JSON.stringify(score))
    localStorage.setItem('price4', JSON.stringify(items[4].price))
    localStorage.setItem('lvl4', JSON.stringify(items[4].lvl))
    localStorage.setItem('price1', JSON.stringify(items[1].price))
    localStorage.setItem('lvl1', JSON.stringify(items[1].lvl))
    CscoreAmount = 1
    localStorage.setItem('CscoreAmount', JSON.stringify(CscoreAmount))
}


let score = JSON.parse(localStorage.getItem('score')) || 1
items[0].price = JSON.parse(localStorage.getItem('price0')) || 10
items[0].lvl = JSON.parse(localStorage.getItem('lvl0')) || 0
num = JSON.parse(localStorage.getItem('num')) || 1
items[1].price = JSON.parse(localStorage.getItem('price1')) || 100
items[1].lvl = JSON.parse(localStorage.getItem('lvl1')) || 1
let scoreAmount = JSON.parse(localStorage.getItem('scoreAmount')) || 1
items[2].price = JSON.parse(localStorage.getItem('price2')) || 50000
items[2].lvl = JSON.parse(localStorage.getItem('lvl2')) || 0
items[3].price = JSON.parse(localStorage.getItem('price3')) || 1000
items[3].lvl = JSON.parse(localStorage.getItem('lvl3')) || 0
items[4].price = JSON.parse(localStorage.getItem('price4')) || 5000
items[4].lvl = JSON.parse(localStorage.getItem('lvl4')) || 0
let CscoreAmount = JSON.parse(localStorage.getItem('CscoreAmount')) || 1
let showTHIS = ''
reloadShop()

if (items[0].lvl > 0) {
    setInterval(async () => {
        addScoreAmount(items[0].lvl)
    }, 1000)    
}

if (items[3].lvl > 0) {
    setInterval(async () => {
        addScoreAmount(items[3].lvl)
    }, 100)
}

if (items[4].lvl > 0) {
    setInterval(async () => {
        addScoreAmount(items[4].lvl * 5)
    }, 100)
}












// restart function

// prevent console
document.addEventListener('contextmenu', event => event.preventDefault());
let restartTEXT = JSON.parse(localStorage.getItem('RE')) || false

const check = () => {
  if (window.outerWidth - window.innerWidth > 120 || window.outerHeight - window.innerHeight > 120) {
    restartTEXT = true
    localStorage.setItem('RE', JSON.stringify(restartTEXT))
    alert(`Developer tools detected!\ncheater! your score is restarted now! \n  >:(`);
    restart()
    restartTEXT = true
  }
};
setInterval(check, 1000);

if (restartTEXT) {
    setInterval(async () => {
        restart()
    }, 3000)
}


// prevent console

//save
// localStorage.clear('RE')
// restart()
// score = 900000000
//save
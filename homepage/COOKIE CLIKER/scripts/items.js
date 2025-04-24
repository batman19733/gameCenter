let num = 1
let items = [{
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
        itemHTML += `<button class="item" onclick="${item.action}"><p class="item-name">${item.name}</p><p class="item-price">${item.price}$ lvl ${item.lvl}</p></button>`
    });
    document.querySelector('.items').innerHTML = itemHTML
    document.querySelector('.cookies-per').innerHTML = `score per/s: ${num}`
}
reloadShop()



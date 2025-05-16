let lightsHTML = ''

score = 0
for(let i=1;i<=8;i++) {
    lightsHTML += `<div class="light l${i}a">light</div>`
}
q('lights').innerHTML = lightsHTML
q('lights').style.gridTemplateRows = 'repeat(2, 1fr)'
q('lights').style.gridTemplateColumns = 'repeat(4, 1fr)'

if (window.innerWidth <= 500) {
    q('lights').style.gridTemplateRows = 'repeat(4, 1fr)'
    q('lights').style.gridTemplateColumns = 'repeat(2, 1fr)'
    q('lights').style.height = 'min(800px, 90vw)'
    q('lights').style.width = 'min(400px, 45vw)'
    q('all').style.width = '90vw'
    q('all').style.height = '70vh'
}

let path = []

let playerPath = []
let count = 0
let disabled = false
const check = async e => {
    if (disabled) return
    disabled = true
    let className = e.target.className.split(' ')[1]
    if(className) {className = Number(className.replace('l', '').replace('a', ''))}
    playerPath.push(className)

    console.log(path)
    console.log(playerPath)
    console.log(count)
    if (path[count] === playerPath[count]) {
        disabled = false
        await new Promise(x => setTimeout(x, 500))
        count++
        if (count === path.length) {
            playerPath = []
            another()
        }
    } else {
        q('score').innerHTML = 'wrong! you lost'
        document.querySelectorAll('.light').forEach(light => {
            light.removeEventListener('click', check)
        })
        return
    }
    
}

document.querySelectorAll('.light').forEach(light => {
    light.addEventListener('click', check)
})

async function another() {
    count = 0
    q('turn').innerHTML = 'WAIT!!'
    document.querySelectorAll('.light').forEach(light => {
        light.removeEventListener('click', check)
    })
    score++
    q('score').innerHTML = `score: ${score}`
    let randomNum = randomNumber(1,8)
    path.push(randomNum)
    for(i=0;i<path.length;i++) {
        let spot = path[i]
        q(`l${spot}a`).style.backgroundColor = 'red'
        await new Promise(x => setTimeout(x, 500))
        q(`l${spot}a`).style.backgroundColor = 'white'
        await new Promise(x => setTimeout(x, 500))
    }
    disabled = false
    q('turn').innerHTML = 'Your turn.'
    document.querySelectorAll('.light').forEach(light => {
        light.addEventListener('click', check)
    })
}



function q(qury) {
    return document.querySelector(`.${qury}`)
}
function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
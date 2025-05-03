const index = 6
const size = `7vw`
const sizeNum = 7
let health = 3

const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')
let topHTML = ''
for(let b=1;b<=index;b++) {
    topHTML  += `<p class='topNum t${b}a'></p>`
}
topRight.innerHTML = topHTML
let bottomHTML = ''
for(let c=1;c<=index;c++) {
    bottomHTML += `<p class='bottomNum b${c}a'></p>`
}
bottomLeft.innerHTML = bottomHTML
topRight.style.gridTemplateColumns = `repeat(${index}, 1fr)`
topRight.style.width = `calc(${size} * ${index})`
bottomLeft.style.height = `calc(${size} * ${index})`
bottomLeft.style.width = `${size}`
bottomRight.style.width = `calc(${size} * ${index})`
bottomRight.style.height = `calc(${size} * ${index})`
//top
document.querySelector('.top').style.width = `calc(${size} * ${index}+${size})`
//top

//all
document.querySelector('.all').style.width = `calc(${size} * ${index} + ${size})`
document.querySelector('.all').style.height = `calc(${size} * ${index} + ${size})`
//all

//cube size
document.querySelectorAll('.bottomNum').forEach(num => {
    num.style.width = `${sizeNum-1.5}vw`
    num.style.height = `${sizeNum-1.5}vw`
})

document.querySelectorAll('.topNum').forEach(num => {
    num.style.width = `${sizeNum-1.5}vw`
    num.style.height = `${sizeNum-1.5}vw`
})
//cube size


document.querySelector('.bottom-right').style.gridTemplateColumns = `repeat(${index}, 1fr)`
document.querySelector('.bottom-right').style.gridTemplateRows = `repeat(${index}, 1fr)`

const check = (e) => {
    e.target.classList.remove('notPicked')
    if (mode === 'pick') {
        if (e.target.classList.contains('real')) {
            e.target.classList.add('circle')
        } else {
            health -= 1
            e.target.innerHTML = 'X'
            e.target.classList.add('failed')
            e.target.classList.remove('fake')
        }
    }
    else if(mode === 'erase') {
        if (e.target.classList.contains('fake')) {
            e.target.innerHTML = ''
            e.target.removeEventListener('click', check)
            e.target.classList.remove('fake')
        } else {
            health -= 1
            e.target.classList.add('animation')
        }
    }
    if (health === 0) {
        document.querySelector('.heart1').hidden = true
        for(i=1;i<=index**2;i++) {
            q(`gn${i}a`).removeEventListener('click', check)
        }
        q('result').innerHTML = 'you lost'
        q('playAgain').hidden = false
    }
    if (health === 1) {document.querySelector('.heart2').hidden = true}
    if (health === 2) {document.querySelector('.heart3').hidden = true}
    checkIFwin()
}

function reGenerate() {
    let nullHTML = ''
    for(let i=1;i<=index**2;i++) {
        nullHTML += `<p class='gameNums gn${i}a'>NULL</p>`
    }
    document.querySelector('.bottom-right').innerHTML = nullHTML
    
    let row = 0
    document.querySelectorAll('.bottomNum').forEach(num => {
        row += 1
        num.innerHTML = randomNum(1, index**2+index-4)
        let numCords = num.getBoundingClientRect()
        const miniNumber = document.createElement('p')
        miniNumber.textContent = '0'
        miniNumber.style.top = `${numCords.top+50}px`
        miniNumber.style.left = `${numCords.left+10}px`
        miniNumber.classList.add('miniNumber')
        miniNumber.classList.add(`b${row}m`)
        document.body.appendChild(miniNumber)

    })

    for (let i=1;i<=index;i++) {
        let nums = reduce(q(`b${i}a`, "i"))
        if (nums.length > index) {nums = reduce(q(`b${i}a`, "i"))}
        
        let spots = []
        for(let a=1;a<=nums.length;a++) {
            let rNum = randomNum(1, index, index)
            do {
                rNum = randomNum(1, index, index);
            } while (spots.includes(rNum));
            spots.push(rNum)
        }
        
        for(let y=0;y<=nums.length-1;y++) {
            let cell = q(`gn${spots[y] + (i-1) * index}a`);
            if (cell) {
                cell.innerHTML = nums[y];
            } else {
                console.warn(`Element not found`);
            }
        }
        
        
        function reduce(number, numbers = [], min=2) {
            let randomNumber = randomNum(min, 9, number-1)
            number -= randomNumber
            numbers.push(randomNumber)
            if (number > 9) {
                min++
                return reduce(number, numbers, min)
            } else {
                numbers.push(number)
                return numbers
            }
        }
    }
    
    for(let x=1;x<=index;x++) {
        let total = 0;
        for(let h=0+x;h<=index**2;h +=6) {
            if (q(`gn${h}a`, 'i') !== 'NULL') {
                num = q(`gn${h}a`, 'i')
                num = Number(num)
                total += num
            }
        }
        q(`t${x}a`).innerHTML = total
    }

    for(let m=1;m<=index**2;m++) {
        q(`gn${m}a`).addEventListener('click', check)
        q(`gn${m}a`).classList.add('notPicked')
        if(q(`gn${m}a`, 'i') === 'NULL') {
            // q(`gn${m}a`).style.backgroundColor = 'red' 
            q(`gn${m}a`).classList.add('fake')
            q(`gn${m}a`).innerHTML = randomNum(1, 9)
        } else {
            // q(`gn${m}a`).style.backgroundColor = 'green' 
            q(`gn${m}a`).classList.add('real')
        }
    }


}
reGenerate()

function randomNum(from, to, max) {
    let num = Math.floor(Math.random() * (to - from + 1)) + from;
    if (num > max) {
        num = max;
    }
    return num;
}

function q(className, dot) {
    if (dot === 'i') {
        return document.querySelector(`.${className}`).innerHTML
    } else {
        return document.querySelector(`.${className}`)
    }
}


let mode = 'pick'
function pickMode() {
    document.querySelector('.erase').style.backgroundColor = 'rgb(80, 80, 80)'
    document.querySelector('.pick').style.backgroundColor = 'rgb(60, 60, 60)'
    mode = 'pick'
}

function eraseMode() {
    document.querySelector('.erase').style.backgroundColor = 'rgb(60, 60, 60)'
    document.querySelector('.pick').style.backgroundColor = 'rgb(80, 80, 80)'
    mode = 'erase'
}



function checkIFwin() {
    let totalBad = 0
    let notPicked = 0
    for(let i=1;i<=index**2;i++) {
        if (q(`gn${i}a`).classList.contains('fake')) {
            totalBad += 1
        }
    }
    for(let i=1;i<=index**2;i++) {
        if (q(`gn${i}a`).classList.contains('notPicked')) {
            notPicked += 1
        }
    }
    if (totalBad === 0 && notPicked === 0) {
        q('result').innerHTML = 'you won'
        for(let i=1;i<=index**2;i++) {
            q(`gn${i}a`).removeEventListener('click', check)
        }
        q('playAgain').hidden = false
    }
}
function playAgain() {
    reGenerate()
    q('result').innerHTML = ''
    q('playAgain').hidden = true
    health = 3
    document.querySelector('.heart1').hidden = false
    document.querySelector('.heart2').hidden = false
    document.querySelector('.heart3').hidden = false
}
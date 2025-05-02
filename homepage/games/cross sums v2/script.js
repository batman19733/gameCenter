const index = 6
const size = `7vw`
const sizeNum = 7

const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')
for(i=1;i<=index;i++) {
    topRight.innerHTML += `<p class='topNum t${i}a'></p>`
}
for(i=1;i<=index;i++) {
    bottomLeft.innerHTML += `<p class='bottomNum b${i}a'></p>`
}
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


// make game grid
document.querySelector('.bottom-right').style.gridTemplateColumns = `repeat(${index}, 1fr)`
document.querySelector('.bottom-right').style.gridTemplateRows = `repeat(${index}, 1fr)`
for(i=1;i<=index**2;i++) {
    document.querySelector('.bottom-right').innerHTML += `<p class='gameNums gn${i}a'>NULL</p>`
}
// make game grid
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


// put numbers in top numbers and bottom 
document.querySelectorAll('.bottomNum').forEach(num => {
    num.innerHTML = randomNum(1, index**2+index)
})
// put numbers in top numbers and bottom 


// put numbers in first row
for (i=1;i<=index;i++) {
    let nums = reduce(q(`b${i}a`, "i"))
    if (nums.length > index) {nums = reduce(q(`b${i}a`, "i"))}
    
    let spots = []
    for(let i=1;i<=nums.length;i++) {
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
    
    
    function reduce(number, numbers = [], min=1) {
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

for(x=1;x<=index;x++) {
    let total = 0;
    for(i=0+x;i<=index**2;i +=6) {
        if (q(`gn${i}a`, 'i') !== 'NULL') {
            num = q(`gn${i}a`, 'i')
            num = Number(num)
            total += num
        }
    }
    q(`t${x}a`).innerHTML = total
}

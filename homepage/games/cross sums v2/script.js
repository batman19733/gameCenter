const index = 6
const size = `7vw`
const sizeNum = 7

const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')
for(i=1;i<=index;i++) {
    topRight.innerHTML += `<p class='topNum t${i}a'>$</p>`
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
document.querySelectorAll('.topNum').forEach(num => {
    num.innerHTML = randomNum(1, index**2+index)
})
document.querySelectorAll('.bottomNum').forEach(num => {
    num.innerHTML = randomNum(1, index**2+index)
})
// put numbers in top numbers and bottom 


// put numbers in first row
for (i=1;i<=index;i++) {
    let willDo = reduce(q("b1a", "i"))
    let nums = willDo
    nums = reduceAgain(nums, willDo)
    
    let spots = []
    for(let i=1;i<=nums.length;i++) {
        let rNum = randomNum(1, index, index)
        do {
            rNum = randomNum(1, index, index);
        } while (spots.includes(rNum));
        spots.push(rNum)
    }
    
    for(let i=0;i<=nums.length-1;i++) {
        q(`gn${spots[i]}a`).innerHTML = nums[i]
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
    function reduceAgain(nums, willDo) {
        if (nums.length > index) {nums = willDo}
        if (nums.length > index) (reduceAgain(nums))
        return nums
    }
}
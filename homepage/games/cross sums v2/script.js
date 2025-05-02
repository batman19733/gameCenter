const index = 6
const size = '7vw'

const topRight = document.querySelector('.top-right')
const bottomLeft = document.querySelector('.bottom-left')
const bottomRight = document.querySelector('.bottom-right')
for(i=1;i<=index;i++) {
    topRight.innerHTML += `<p class='topNum top${i}a'>${i}</p>`
}
for(i=1;i<=index;i++) {
    bottomLeft.innerHTML += `<p class='bottomNum top${i}a'>${i}</p>`
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
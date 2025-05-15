lightsHTML = ''
for(let i=1;i<=8;i++) {
    lightsHTML += `<div class="light l${i}a">light</div>`
}
q('lights').innerHTML = lightsHTML
q('lights').style.gridTemplateRows = 'repeat(2, 1fr)'
q('lights').style.gridTemplateColumns = 'repeat(4, 1fr)'

const check = async e => {
    console.log('hi')
}

document.querySelectorAll('.light').forEach(light => {
    light.addEventListener('click', check)
})




function q(qury) {
    return document.querySelector(`.${qury}`)
}
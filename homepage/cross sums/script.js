index  = 6

let topHTML = ''
for (i = 1; i <= index; i++) {
    document.querySelector('.topRow').innerHTML += `<p class="${i}r r">null</p>`
}

document.querySelectorAll('.r').forEach(cube => {
    cube.style.width = size(60+7)
    cube.style.height = size(60)
})

function size(num) {
    size = `${num}px`
}
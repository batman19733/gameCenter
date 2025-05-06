function q(query, dot) {
    if (dot === 'a') {
        return document.querySelectorAll(`.${query}`)
    }
    else if (dot === 'i') {
        return document.querySelector(`.${query}`).innerHTML
    }
    else {
        return document.querySelector(`.${query}`)
    }
}
let innerGridCount = ''
for(i=1;i<=9;i++){
    innerGridCount += `<div class="innerGrid g${i}a"></div>`
}
q('grid').innerHTML = innerGridCount


q('innerGrid', 'a').forEach(grid => {
    let innerInnerGrid = ''
    for(i=1;i<=9;i++) {
        innerInnerGrid += `<div class="II${i}a IIcube"></div>`
    }
    grid.innerHTML += innerInnerGrid 
})
const index = 8
let boardHTML = ''
for(let row=0;row<index;row++) {
    for(let col=0;col<index;col++) {
        boardHTML += `<div class="cube c${NFA([row, col])} center-div">${NFA([row, col])}</div>`
    }
}
q('board').innerHTML = boardHTML // make board
grid = Array.from({length: index}, () => Array(8).fill(null)) // make grid

for(let i=0;i<index**2;i++) {
    let [row, col] = AFN(i)
    isWhite = (row + col) % 2 === 0
    if(isWhite) {
        q(`c${i}`).classList.add('whiteCube')
    } else {
        q(`c${i}`).classList.add('greenCube')  
    }
}


for(let col=0;col<index;col++) {
    let blackPawns = NFA([1, col])
    g$q([blackPawns], ['pawnB'], 'pawn', 'black')

    let whitePawns = NFA([6, col])
    g$q([whitePawns], ['pawnW'], 'pawn', 'white')
} // add default pawns

g$q([0,7], ['rookB', 'rookB'], 'rook', 'black')
g$q([63-7,63], ['rookW', 'rookW'], 'rook', 'white') // rook

g$q([1,6], ['knightB', 'knightB'], 'knight', 'black')
g$q([63-6,62], ['knightW', 'knightW'], 'knight', 'white') // knight

g$q([2,5], ['bishopB', 'bishopB'], 'bishop', 'black')
g$q([63-5,61], ['bishopW', 'bishopW'], 'bishop', 'white') // bishop

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function NFA(spot) {
    let [row, col] = spot
    return row*index+col
}
function AFN(num) {
    row = Math.floor(num / index)
    col = num % index
    return [row, col]
}
function g$q(nums, gridValues, p, color) {
    if(nums.length === gridValues.length) {
        for(let i=0;i<nums.length;i++) {
            q(`c${nums[i]}`).innerHTML = pieces[p].qury(nums[i], color)
            let [row, col] = AFN(nums[i])
            grid[row][col] = gridValues[i]
        }
    }


}
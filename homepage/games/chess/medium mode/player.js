const index = 8;
let boardHTML = ''
for(let i=0;i<index**2;i++) {
    boardHTML += `<div class="c${i} cube">${i}</div>`
}
q(`board`).innerHTML = boardHTML

for (let row=0; row<index;row++) {
    for(let col = 0;col<index;col++) {
        if ((row+col) % 2 === 0) {
            q(`c${NFA([row, col])}`).style.backgroundColor = 'white'
        } else q(`c${NFA([row, col])}`).style.backgroundColor = 'gray'
    }
}
let bitboard = 0n






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
function getBit(row, col) {
    let pos = BigInt(row * index + col);
    return (bitboard >> pos) & 1n;
}

function setBit(row, col) {
    let pos = BigInt(row * index + col);
    return bitboard | (1n << pos);
}

function clearBit(row, col) {
    let pos = BigInt(row * index + col);
    return bitboard & ~(1n << pos);
}

function toggleBit(row, col) {
    let pos = BigInt(row * index + col);
    return bitboard ^ (1n << pos);
}
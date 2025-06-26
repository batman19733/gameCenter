const board = Array(9).fill(0)
displayBoard()


document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', addToArray)
})

function addToArray() {
    neuralNetwork()
}

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function displayBoard() {
    let boardHTML = '['
    for(let i =0;i<board.length;i++) {
        boardHTML += board[i]
        if (i === board.length-1) break
        boardHTML += ','
    }
    boardHTML += ']'
    q('tr').innerHTML = boardHTML
}
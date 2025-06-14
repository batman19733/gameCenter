const index = 8
let boardHTML = ''
for(let i = 0;i<index**2;i++) {
    boardHTML += `<div class="cube c${i}"></div>`
}
q('board').innerHTML = boardHTML // make board
grid = Array.from({length: index}, () => Array(8).fill(null)) // make grid
for(let i=0;i<index**2;i++) {
    let [row, col] = AFN(i)
    if((row + col) % 2 === 0) {q(`c${i}`).classList.add('whiteCube')} else {q(`c${i}`).classList.add('greenCube')}}

g$q([[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]], 'pawn', 'black')
g$q([[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]], 'pawn', 'white')

g$q([[0,0], [0,7]], 'rook', 'black')
g$q([[7,0], [7,7]], 'rook', 'white')

g$q([[0,1], [0,6]], 'horse', 'black')
g$q([[7,1], [7,6]], 'horse', 'white')

g$q([[0,2], [0,5]], 'bishop', 'black')
g$q([[7,2], [7,5]], 'bishop', 'white')

g$q([[0,3]], 'queen', 'black')
g$q([[7,3]], 'queen', 'white')

g$q([[0,4]], 'king', 'black')
g$q([[7,4]], 'king', 'white')

//test
//test

let disableKill = false
async function kill(e) {
    if (disableKill) return
    if (disable) return
    disableKill = true
    disable = true
    makeQueen()
    if (enable[0] !== undefined) {
        enable.forEach(spot => {
            let [row, col] = spot
            q(`c${NFA([row, col])}`).removeEventListener('click', kill)
            enable = []
        })
    }
    classNum = Number(e.target.className.replace(/[^0-9]/g, ''))
    let [row, col] = AFN(classNum)
    graySpots.forEach(spot => {
        let [row, col] = spot
        q(`c${NFA([row, col])}`).innerHTML = ''
    })
    graySpots = []
    colorPiece.forEach(p => {
        let [row, col] = p
        if((row + col) % 2 === 0) {q(`c${NFA([row, col])}`).style.backgroundColor = 'white' } else {q(`c${NFA([row, col])}`).style.backgroundColor = '#6AB293'}
    })
    colorPiece = []
    let [oldNum, lastPiece] = oldSpot
    q(`c${oldNum}`).innerHTML = ''
    let [r, c] = AFN(oldNum)
    grid[r][c] = null
    lastPiece = lastPiece.split('')
    lastPiece.pop()
    lastPiece = lastPiece.join('')
    g$q([[row, col]], lastPiece, 'white')
    q('tr').innerHTML = 'Bot thinking...'
    await new Promise(x => setTimeout(x, 10))
    botTurn()
}
let colorPiece = []
async function moveTo(e) {
    makeQueen()
    if (enable[0] !== undefined) {
        enable.forEach(spot => {
            let [row, col] = spot
            q(`c${NFA([row, col])}`).removeEventListener('click', kill)
            enable = []
        })
    }
    const classNum = Number(e.target.className.split(' ')[2].replace(/[^0-9]/g, ''))
    let [oldNum, p] = oldSpot
    if (colorPiece[0] !== undefined) {
        colorPiece.forEach(spot => {
            let [row, col] = spot
            if((row + col) % 2 === 0) {q(`c${NFA([row, col])}`).style.backgroundColor = 'white' } else {q(`c${NFA([row, col])}`).style.backgroundColor = '#6AB293'}
            q(`c${NFA([row, col])}`).style.cursor = 'default'
        })
        colorPiece = []
    }
    p = p.split('')
    p.pop()
    p = p.join().replaceAll(',', '')
    let [r, c] = AFN(classNum)
    graySpots.forEach(spot => {
        let [row, col] = spot
        q(`c${NFA([row, col])}`).innerHTML = ''
        graySpots = []
    })
    g$q([[r, c]], p, 'white')
    q(`c${oldNum}`).innerHTML = ''
    let [row2, col2] = AFN(oldNum)
    grid[row2][col2] = null
    q('tr').innerHTML = 'Bot thinking...'
    await new Promise(x => setTimeout(x, 10))
    botTurn()
}
let oldSpot = []
let graySpots = []
let enable = []
let disable = false
async function showAvaMoves(e, spots) {
    if (disable) return
    if (disableKill) return
    disable = true
    disableKill = true
    if (lastMove !== undefined) {
        let {put, remove} = lastMove
        let [removeAA, removeAB] = put
        let [removeBA, removeBB] = remove
        if((removeAA + removeAB) % 2 === 0) {q(`c${NFA([removeAA, removeAB])}`).style.backgroundColor = 'white' } else {q(`c${NFA([removeAA, removeAB])}`).style.backgroundColor = '#6AB293'}
        if((removeBA + removeBB) % 2 === 0) {q(`c${NFA([removeBA, removeBB])}`).style.backgroundColor = 'white' } else {q(`c${NFA([removeBA, removeBB])}`).style.backgroundColor = '#6AB293'}
    }
    const classNum = Number(e.target.className.split(' ')[3].replace(/[^0-9]/g, ''))
    let [r, c] = AFN(classNum)
    if (enable[0] !== undefined) {
        enable.forEach(spot => {
            let [row, col] = spot
            q(`c${NFA([row, col])}`).removeEventListener('click', kill)
            enable = []
        })
    }
    oldSpot = [classNum, grid[r][c]]
    if (graySpots[0] !== undefined) {
        graySpots.forEach(spot => {
            let [row, col] = spot
            q(`c${NFA([row, col])}`).innerHTML = ''
        })
        graySpots = []
    }
    if (colorPiece[0] !== undefined) {
        colorPiece.forEach(spot => {
            let [row, col] = spot
            if((row + col) % 2 === 0) {q(`c${NFA([row, col])}`).style.backgroundColor = 'white' } else {q(`c${NFA([row, col])}`).style.backgroundColor = '#6AB293'}
            q(`c${NFA([row, col])}`).style.cursor = 'default'
        })
        colorPiece = []
    }
    if (spots[0] === '...') {
        spots.forEach(spot => {
            if (spot !== '...') {
                moveToSide([r, c], spot)
            }
        })
    } else if(spots[0] === 'pawn') {
        spots.forEach(spot => {
            if (spot !== 'pawn') {
                if (r === 6) {
                    let [row, col] = spot
                    let color = grid[r-1][c+1]
                    let color2 = grid[r-1][c-1]
                    if (color !== null & color !== undefined) {color = color.split('').pop()}
                    if (color2 !== null & color2 !== undefined) {color2 = color2.split('').pop()}
                    
                    if (color !== null & color !== undefined & color !== 'w') {
                        q(`c${NFA([r-1, c+1])}`).style.backgroundColor = 'red'
                        enable.push([r-1, c+1])
                        q(`c${NFA([r-1, c+1])}`).style.cursor = 'pointer'
                        colorPiece.push([r-1, c+1])
                    }
                    if (color2 !== null & color2 !== undefined & color2 !== 'w') {
                        q(`c${NFA([r-1, c-1])}`).style.backgroundColor = 'red'
                        enable.push([r-1, c-1])
                        q(`c${NFA([r-1, c-1])}`).style.cursor = 'pointer'
                        colorPiece.push([r-1, c-1])
                    }
                    if (grid[r+row][c+col] === null & grid[r+row-1][c+col] === null) {
                        q(`c${NFA([r+row, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row, c+col]))
                        q(`c${NFA([r+row-1, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row-1, c+col]))
                        graySpots.push([r+row, c+col])
                        graySpots.push([r+row-1, c+col])
                    } else if (grid[r+row][c+col] === null) {
                        q(`c${NFA([r+row, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row, c+col]))
                        graySpots.push([r+row, c+col])
                    } else return
                }
                else {
                    let [row, col] = spot
                    let color = grid[r-1]?.[c+1]
                    let color2 = grid[r-1]?.[c-1]
                    if (r === 0 & row < 0) return
                    if (r === 7 & row > 0) return
                    if (c === 0 & col < 0) return
                    if (c === 7 & col > 0) return

                    if (color !== null & color !== undefined) {color = color.split('').pop()}
                    if (color2 !== null & color2 !== undefined) {color2 = color2.split('').pop()}

                    if (color !== null & color !== undefined & color !== 'w') {
                        q(`c${NFA([r-1, c+1])}`).style.backgroundColor = 'red'
                        enable.push([r-1, c+1])
                        q(`c${NFA([r-1, c+1])}`).style.cursor = 'pointer'
                        colorPiece.push([r-1, c+1])
                    }
                    if (color2 !== null & color2 !== undefined & color2 !== 'w') {
                        q(`c${NFA([r-1, c-1])}`).style.backgroundColor = 'red'
                        enable.push([r-1, c-1])
                        q(`c${NFA([r-1, c-1])}`).style.cursor = 'pointer'
                        colorPiece.push([r-1, c-1])
                    }

                    if (grid[r+row][c+col] === null | grid[r+row][c+col] === null) {
                        q(`c${NFA([r+row, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row, c+col]))
                        graySpots.push([r+row, c+col])} else return}} else return
        })} else {
        spots.forEach(spot => {
            let [row, col] = spot

            if (r === 0 & row < 0) return
            if (r === 7 & row > 0) return
            if (c === 0 & col < 0) return
            if (c === 7 & col > 0) return

            let color = grid[r+row]?.[c+col]
            if (color !== null & color !== undefined) {color = color.split('').pop()}
            if (grid[r+row]?.[c+col] === null) {
                q(`c${NFA([r+row, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row, c+col]))
                graySpots.push([r+row, c+col])
            } else if (color === 'b') {
                q(`c${NFA([r+row, c+col])}`).style.backgroundColor = 'red'
                enable.push([r+row, c+col])
                q(`c${NFA([r+row, c+col])}`).style.cursor = 'pointer'
                colorPiece.push([r+row, c+col])
            } else return
        })
    }
    if (enable[0] !== undefined) {
        enable.forEach(spot => {
            let [row, col] = spot
            q(`c${NFA([row, col])}`).addEventListener('click', kill)
        })
    }
    await new Promise(resolve => setTimeout(resolve, 50));
    disable = false
    disableKill = false
    await new Promise(resolve => setTimeout(resolve, 50));
}
function moveToSide(current, side) {
    let [r, c] = current
    let [row, col] = side

    if (r === 0 & row < 0) return
    if (r === 7 & row > 0) return
    if (c === 0 & col < 0) return
    if (c === 7 & col > 0) return

    let color = grid[r+row][c+col]
    if (color !== null & color !== undefined) {color = color.split('').pop()}

    if (grid[r+row][c+col] === null) {
        q(`c${NFA([r+row, c+col])}`).innerHTML = pieces.graySpot(NFA([r+row, c+col]))
        graySpots.push([r+row, c+col])
    } else if (color === 'b') {
                q(`c${NFA([r+row, c+col])}`).style.backgroundColor = 'red'
                enable.push([r+row, c+col])
                q(`c${NFA([r+row, c+col])}`).style.cursor = 'pointer'
                colorPiece.push([r+row, c+col])
                return
        } else return

    r += row
    c += col

    if (r === 0 & row < 0) return
    if (r === 7 & row > 0) return
    if (c === 0 & col < 0) return
    if (c === 7 & col > 0) return

    moveToSide([r, c], [row, col])

}
function g$q(spots, p, color) {
    spots.forEach(spot => {
        let [row, col] = spot
        q(`c${NFA([row, col])}`).innerHTML = pieces[p].qury(NFA([row, col]), color)
        grid[row][col] = p + color.split('')[0]
    })
}
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

const index = 8;
let boardHTML = ''
for(let i=0;i<index**2;i++) {
    boardHTML += `<div class="c${i} cube"></div>`
}
q(`board`).innerHTML = boardHTML

for (let row=0; row<index;row++) {
    for(let col = 0;col<index;col++) {
        if ((row+col) % 2 === 0) {
            q(`c${NFA([row, col])}`).style.backgroundColor = 'white'
        } else q(`c${NFA([row, col])}`).style.backgroundColor = 'darkgray'
    }
}
let grid = Array(index**2).fill(0)
g$q([8,9,10,11,12,13,14,15], 'pawn', 'b')
g$q([48,49,50,51,52,53,54,55], 'pawn', 'w')

g$q([0,7], 'rook', 'b')
g$q([56,63], 'rook', 'w')

g$q([1,6], 'horse', 'b')
g$q([57,62], 'horse', 'w')

g$q([2,5], 'bishop', 'b')
g$q([58,61], 'bishop', 'w')

g$q([3], 'queen', 'b')
g$q([59], 'queen', 'w')

g$q([4], 'king', 'b')
g$q([60], 'king', 'w')

//test
// g$q([8,9,10], 'pawn', 'w')

let disableAll = false
let disableMove = false
async function moveTo(event) {
    if (disableAll) return
    if (disableMove) return
    disableMove = true
    for (let i=0;i<showenAvaMoves.length;i++) {
        let s = showenAvaMoves[i]
        let spot = q(`p${s}`)
        if (spot === null) {
            q(`c${s}`).innerHTML = ''
        } else {
            spot.style.color = 'black'
            spot.style.cursor = 'default'
            spot.removeEventListener('click', moveTo)
        }
    }
    showenAvaMoves = []

    const classNum = Number(event.target.classList[0].slice(1))
    let {remove, was} = lastClick
    grid[remove] = 0
    q(`c${remove}`).innerHTML = ''
    grid[classNum] = pieces[was].grid('w')
    q(`c${classNum}`).innerHTML = pieces[was].qury(classNum, 'w')
    let amountOfPiece = checkAmountOfEveryThing()
    if (amountOfPiece.blackKing ==0) {disableAll = true; q('tr').innerHTML = 'white won!'; return}
    if (amountOfPiece.whiteKing ==0) {disableAll = true; q('tr').innerHTML = 'black won!'; return}
    makeQueen()
    q('tr').innerHTML = 'bot thinking...'
    await new Promise(x => setTimeout(x, 10))
    botTurn()
}
let showenAvaMoves = []
let lastClick;
function displayLegalMoves(event) {
    if (disableMove) return
    if (showenAvaMoves[0] !== undefined) {
        for (let i=0;i<showenAvaMoves.length;i++) {
            let s = showenAvaMoves[i]
            let spot = q(`p${s}`)
            if (spot === null) {
                q(`c${s}`).innerHTML = ''
            } else {
                spot.style.color = 'black'
                spot.style.cursor = 'default'
                spot.removeEventListener('click', moveTo)
            }
        }
        showenAvaMoves = []
    }

    classNum = Number(event.target.classList[0].slice(1))
    lastClick = {remove: classNum, was: event.target.classList[2]}
    const moves = findLegalMoves('w')
    for(let i = 0; i<moves.length;i++) {
        let {put, remove} = moves[i]
        if (remove === classNum) {
            if (grid[put] === 0) {
                q(`c${put}`).innerHTML = pieces.graySpot(put)
                showenAvaMoves.push(put)
            } else {
                q(`p${put}`).style.color = 'red'
                q(`p${put}`).style.cursor = 'pointer'
                q(`p${put}`).addEventListener('click', moveTo)
                showenAvaMoves.push(put)
            }
        }
    }
}

let legalMoves;
function findLegalMoves(color) {
    legalMoves = []
    for(let i=0;i<index**2;i++) {
        if (grid[i] !== 0) {
            if (grid[i] === (color === 'b' ? 1:7)) { // if pawn white or black
                if (i < index && color === 'w') continue
                if (i > index**2-index && color === 'b') continue
                const oneJump = i + (color === 'b' ? index:-index)
                const twoJUmp = i + (color === 'b' ? index * 2:-index * 2)

                const col = i % index

                // check right capture
                if (col < index - 1) {
                    const killRight = oneJump + 1;
                    if (
                        killRight >= 0 && killRight < index * index &&
                        grid[killRight] !== 0 &&
                        ((color === 'w' && grid[killRight] <= 6) || (color === 'b' && grid[killRight] > 6))
                    ) {
                        legalMoves.push({ put: killRight, remove: i });
                    }
                }

                // check left capture
                if (col > 0) {
                    const killLeft = oneJump - 1;
                    if (
                        killLeft >= 0 && killLeft < index * index &&
                        grid[killLeft] !== 0 &&
                        ((color === 'w' && grid[killLeft] <= 6) || (color === 'b' && grid[killLeft] > 6))
                    ) {
                        legalMoves.push({ put: killLeft, remove: i });
                    }
                }

                if (Math.floor(i/index) === (color === 'b' ? 1:6)) {
                    if (grid[oneJump] === 0 && grid[twoJUmp] === 0) {
                        legalMoves.push({put: twoJUmp, remove: i})
                    } //move 2
                }  
                if (grid[i + (color === 'b' ? index:-index)] === 0) {
                    legalMoves.push({put: oneJump, remove: i})
                } // move 
                
            } else if (grid[i] === (color === 'b'? 2:8)) {
                moveTillEnd(i, [1,-1,8,-8], color)
            } else if (grid[i] === (color === 'b' ? 3:9)) {
                const jumps = [-17, -15, -10, -6, 6, 10, 15, 17]
                for (let j = 0; j < jumps.length; j++) {
                    const to = i + jumps[j]
                    if (to < 0 || to >= 64) continue
                    const c1 = i % index
                    const c2 = to % index
                    const d = Math.abs(c1 - c2)
                    if (d !== 1 && d !== 2) continue
                    const target = grid[to]
                    if (target === 0 || (color === 'w' && target <= 6) || (color === 'b' && target > 6)) {
                        legalMoves.push({ put: to, remove: i })
                    }
                }
            } else if (grid[i] === (color === 'b' ? 4:10)) {
                moveTillEnd(i, [-9,-7,7,9], color)
            } else if (grid[i] === (color === 'b' ? 5 : 11)) {
                const steps = [-1, 1, -index, index, -index - 1, -index + 1, index - 1, index + 1];
                for (let s = 0; s < steps.length; s++) {
                    const to = i + steps[s];
                    if (to < 0 || to >= index * index) continue;
                    if (to % index < (i % index) - 1 || to % index > (i % index) + 1) continue;
                    const target = grid[to];
                    if (target === 0 || (color === 'w' && target <= 6) || (color === 'b' && target > 6)) {
                        legalMoves.push({ put: to, remove: i });
                    }
                }
            } else if (grid[i] === (color === 'b' ? 6:12)) {
                moveTillEnd(i, [-9,-8,-7,-1,1,7,8,9], color)
            }
        }
    }
    return legalMoves
}
function moveTillEnd(i, directions, color) {
    for (let d = 0; d < directions.length; d++) {
        let step = directions[d];
        let pos = i;

        while (true) {
            let next = pos + step;

            if (next < 0 || next >= index * index) break;

            const fromCol = pos % index;
            const toCol = next % index;

            // Prevent wraparound for horizontal moves
            if (Math.abs(toCol - fromCol) > 2) break;

            if (grid[next] !== 0) {
                if ((color === 'w' && grid[next] <= 6) || (color === 'b' && grid[next] > 6)) {
                    legalMoves.push({ put: next, remove: i }); // capture
                }
                break;
            }

            legalMoves.push({ put: next, remove: i }); // normal move
            pos = next;
        }
    }
}


function g$q(spots, piece, color) {
    for(let i=0;i<spots.length;i++) {
        let spot = spots[i]
        grid[spot] = pieces[piece].grid(color)
        q(`c${spot}`).innerHTML = pieces[piece].qury(spot, color)
    }
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
function makeQueen() {
    for (let i = 0; i < index**2; i++) {
        const isWhitePawn = grid[i] === 7;
        const isBlackPawn = grid[i] === 1;
        if (isWhitePawn && Math.floor(i / index) === 0) {
            grid[i] = 11; // white queen
            q(`c${i}`).innerHTML = pieces['queen'].qury(i, 'w');
        } else if (isBlackPawn && Math.floor(i / index) === index - 1) {
            grid[i] = 5; // black queen
            q(`c${i}`).innerHTML = pieces['queen'].qury(i, 'b');
        }
    }
}
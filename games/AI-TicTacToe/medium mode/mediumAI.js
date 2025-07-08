let boardHTML = ''
let grid = new Array(9).fill('');
let disabled = false

let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}


for(let i=1;i<=9;i++) {
    boardHTML += `<div class="cube c${i}a"></div>`
}
q('board').innerHTML = boardHTML
q('turn').innerHTML = 'Your turn'


const check = async e => {
    if (disabled) return
    disabled = true
    e.target.innerHTML = 'X'
    e.target.removeEventListener('click', check)
    let className = e.target.className.replace('cube', '').replace('c', '').replace('a', '')
    grid[className-1] = 'X'
    let result = checkIfWin(grid)
    if (result) {
        q(`turn`).innerHTML = `${result} won!`
        finishGame()
        return
    }
    botTurn(grid)

}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', check)
})






function q(qury) {
    return document.querySelector(`.${qury}`)
}
function getRandomPlace(place) {
    if (place === 'corner') {
        let spot = randomNumber(4, 4)
        if (q(`c${spot+1}a`).innerHTML !== '') {return getRandomPlace()}
        return spot
    } else {
        let spot = randomNumber(1, 9)
        if (q(`c${spot}a`).innerHTML === '') {
            return spot-1
        }
        else {
            return getRandomPlace()
        }
    }
}
function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
function playAgain() {
    q('PlayAgainButton').hidden = true
    for(let i=1;i<=9;i++) {
        q(`c${i}a`).innerHTML = ''
    }
    q('turn').innerHTML = 'Your turn'
    document.querySelectorAll('.cube').forEach(cube => {
        cube.addEventListener('click', check)
    })
    disabled = false
    result = false
    grid = Array(9).fill('');
}
function back() {
    window.location.href = '../'
}
async function botTurn(grid) {
    q('turn').innerHTML = 'bot thinking...'
    await new Promise(x => setTimeout(x, 1000))
    let count = 0
    for(i=1;i<=9;i++) {
        if(q(`c${i}a`).innerHTML !== '') {count++}
    }
    if (count <9) {
        let spot = checkIfCanWin(grid)
        if(spot || spot === 0) {
            q(`c${spot+1}a`).innerHTML = 'O'
            q(`c${spot+1}a`).removeEventListener('click', check)
            grid[spot] = 'O'
            q('turn').innerHTML = 'Your turn'
            disabled = false
            let result = checkIfWin(grid)
            if (result) {
                q(`turn`).innerHTML = `${result} won!`
                finishGame()
                return
            }
            return
        } else {
            let spot = checkIfCanBlock(grid)
            if(spot || spot === 0) {
                q(`c${spot+1}a`).innerHTML = 'O'
                q(`c${spot+1}a`).removeEventListener('click', check)
                grid[spot] = 'O'
                q('turn').innerHTML = 'Your turn'
                disabled = false
                let result = checkIfWin(grid)
                if (result) {
                    q(`turn`).innerHTML = `${result} won!`
                    finishGame()
                    return
                }
                return
            } else {
                let randomMove
                if (q('c1a').innerHTML === '' || q('c3a').innerHTML === '' || q('c7a').innerHTML === '' || q('c9a').innerHTML === '') {
                    randomMove = getRandomPlace('corner')
                } else {
                    randomMove = getRandomPlace() -1
                }
                q(`c${randomMove+1}a`).innerHTML = 'O'
                q(`c${randomMove+1}a`).removeEventListener('click', check)
                grid[randomMove] = 'O'
                disabled = false
                q('turn').innerHTML = 'Your turn'
            }
        }
    } else {
        q('turn').innerHTML = 'tie'
        q('PlayAgainButton').hidden = false
        return
    }
    let result = checkIfWin(grid)
    if (result) {
        q(`turn`).innerHTML = `${result} won!`
        finishGame()
        return
    }
}
function checkIfCanWin(grid) {
    let g = grid
    for(let i=0;i<3;i++) {
        if (g[i] === 'O' && g[i+3] === 'O' && '' && g[i+6] === '') {
            return i+6
        }
        if (g[i] === 'O' && g[i+6] === 'O' && g[i+3] === '') {
            return i+3
        }
        if (g[i+3] === 'O' && g[i+6] === 'O' && g[i] === '') {
            return i-1
        }
    }
    for (let i=0;i<9;i += 3) {
        if (g[i] === 'O' && g[i+1] === 'O' && g[i+2] === '') {
            return i+2
        }
        if (g[i] === 'O' && g[i+2] === 'O' && g[i+1] === '') {
            return i+1
        }
        if (g[i+1] === 'O' && g[i+2] === 'O' && g[i] === '') {
            return i
        }
    }
    if (g[0] === 'O' && g[4] === 'O' && g[8] === '') {
        return 8
    }
    if (g[0] === 'O' && g[8] === 'O' && g[4] === '') {
        return 4
    }
    if (g[4] === 'O' && g[8] === 'O' && g[0] === '') {
        return 0
    }

    
    if (g[2] === 'O' && g[4] === 'O' && g[6] === '') {
        return 6
    }
    if (g[2] === 'O' && g[6] === 'O' && g[4] === '') {
        return 4
    }
    if (g[6] === 'O' && g[4] === 'O' && g[2] === '') {
        return 2
    }
}
function checkIfCanBlock() {
    let g = grid
    for(let i=0;i<3;i++) {
        if (g[i] === 'X' && g[i+3] === 'X' && g[i+6] === '') {
            return i+6
        }
        if (g[i] === 'X' && g[i+6] === 'X' && g[i+3] === '') {
            return i+3
        }
        if (g[i+3] === 'X' && g[i+6] === 'X' && g[i] === '') {
            return i
        }
    }
    for (let i=0;i<9;i += 3) {
        if (g[i] === 'X' && g[i+1] === 'X' && g[i+2] === '') {
            return i+2
        }
        if (g[i] === 'X' && g[i+2] === 'X' && g[i+1] === '') {
            return i+1
        }
        if (g[i+1] === 'X' && g[i+2] === 'X' && g[i] === '') {
            return i
        }
    }
    if (g[0] === 'X' && g[4] === 'X' && g[8] === '') {
        return 8
    }
    if (g[0] === 'X' && g[8] === 'X' && g[4] === '') {
        return 4
    }
    if (g[4] === 'X' && g[8] === 'X' && g[0] === '') {
        return 0
    }

    
    if (g[2] === 'X' && g[4] === 'X' && g[6] === '') {
        return 6
    }
    if (g[2] === 'X' && g[6] === 'X' && g[4] === '') {
        return 4
    }
    if (g[6] === 'X' && g[4] === 'X' && g[2] === '') {
        return 2
    }
}
function checkIfWin(grid) {
    let g = grid
    for(let i = 0;i<9;i += 3) {
        if(g[i] === g[i+1] && g[i+1] === g[i+2] && g[i+2] !== '' ) {
            return g[i]
        }
    }
    for(let i = 0;i<3;i++) {
        if(g[i] === g[i+3] && g[i+3] === g[i+6] && g[i+6] !== '' ) {
            return g[i]
        }
    }
    if(g[0] === g[4] && g[4] === g[8] && g[4] !== '' ) {
        return g[4]
    }
    if(g[2] === g[4] && g[4] === g[6] && g[4] !== '' ) {
        return g[4]
    }
    return false
}
function finishGame() {
    document.querySelectorAll('.cube').forEach(cube => {
        cube.removeEventListener('click', check)
    })
    q('PlayAgainButton').hidden = false
}
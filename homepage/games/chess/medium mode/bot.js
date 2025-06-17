let currentDepth = 3
let lastMove;
function botTurn() {
    let startTimer = performance.now()
    if(lastMove !== undefined) {
        let {put, remove} = lastMove
        let [r, c] = AFN(put)
        let [row, col] = AFN(remove)
        if((r+c) % 2 === 0) {q(`c${put}`).style.backgroundColor = 'white'} else {q(`c${put}`).style.backgroundColor = 'darkgray'}
        if((row+col) % 2 === 0) {q(`c${remove}`).style.backgroundColor = 'white'} else {q(`c${remove}`).style.backgroundColor = 'darkgray'}
    }
    let bestScore = -Infinity
    let bestMove;
    const moves = findLegalMoves('b')
    for (let i =0;i<moves.length;i++) {
        const move = moves[i]
        let {put, remove} = move
        let wasR = grid[remove]
        let wasP = grid[put]
        grid[remove] = 0
        grid[put] = wasR
        let score = minimax(currentDepth, false)
        grid[remove] = wasR
        grid[put] = wasP
        if (score > bestScore) {
            bestScore = score
            bestMove = [put, remove]
        }
    }
    let [put, remove] = bestMove
    let removed = grid[remove]
    grid[put] = removed
    let removedPiece = NumPieces[removed].piece
    let removedColor = NumPieces[removed].color
    q(`c${put}`).innerHTML = pieces[removedPiece].qury(put, removedColor)
    grid[remove] = 0
    q(`c${remove}`).innerHTML = ''
    q(`c${put}`).style.backgroundColor = 'lightgreen'
    q(`c${remove}`).style.backgroundColor = 'darkgreen'
    lastMove = {put: put, remove: remove}
    let endTimer = performance.now()
    let amountOfTime = endTimer - startTimer
    if (amountOfTime * 10 < 2000) {
        currentDepth++
    } else if (amountOfTime > 5500) {
        currentDepth--
    }
    q('tr').innerHTML = 'Your turn'
    disableMove = false
}
function minimax(depth, max, alpha = -Infinity, beta = Infinity) {
    if (depth === 0 || amountOfKings('w') === 0 || amountOfKings('b') === 0) {
        return evaluateBoard(depth)
    }

    if (max) {
        let bestScore = -Infinity
        const moves = findLegalMoves('b')
        for (let i = 0 ; i<moves.length;i++) {
            const move = moves[i]
            let {put, remove} = move
            let wasR = grid[remove]
            let wasP = grid[put]
            grid[remove] = 0
            grid[put] = wasR
            let score = minimax(depth - 1, false, alpha, beta)
            grid[remove] = wasR
            grid[put] = wasP
            if (score > bestScore) {
                bestScore = score
            }
            alpha = Math.max(alpha, score)
            if (beta <= alpha) {
                break
            }

        }
        return bestScore
    } else {
        let bestScore = Infinity
        const moves = findLegalMoves('w')
        for (let i =0;i<moves.length;i++) {
            const move = moves[i]
            let {put, remove} = move
            let wasR = grid[remove]
            let wasP = grid[put]
            grid[remove] = 0
            grid[put] = wasR
            let score = minimax(depth -1, true, alpha, beta)
            grid[remove] = wasR
            grid[put] = wasP
            if (score < bestScore) {
                bestScore = score
            }
            beta = Math.min(beta, score)
            if (beta <= alpha) {
                break
            }
        }
        return bestScore
    }
}
function amountOfKings(color) {
    for(let i=0;i<index**2;i++) {
        if(grid[i] !== 0) {
            if (grid[i] === (color === 'b' ? 5:11)) {
                return 1
            }
        }
    }
    return 0
}
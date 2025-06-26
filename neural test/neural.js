let gameHistory = []
let gameRunning = false;

let stats = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  totalGames: 0
};

function loadStats() {
  const stored = localStorage.getItem('nnStats');
  if (stored) stats = JSON.parse(stored);
}

function saveStats() {
  localStorage.setItem('nnStats', JSON.stringify(stats));
}

loadStats();

const inputCount = 9
const neuronsPerLayer = 10
const outputCount = 9

function loadWeights(key, rows, cols) {
  const stored = localStorage.getItem(key)
  if (stored) return JSON.parse(stored)
  return Array(rows).fill().map(() =>
    Array(cols).fill().map(() => Number((Math.random() * 2 - 1).toFixed(2)))
  )
}

function loadBiases(key, length) {
  const stored = localStorage.getItem(key)
  if (stored) return JSON.parse(stored)
  return Array(length).fill().map(() => Number(Math.random().toFixed(2)))
}

const weight1 = loadWeights('weight1', neuronsPerLayer, inputCount)
const bias1 = loadBiases('bias1', neuronsPerLayer)

const weight2 = loadWeights('weight2', neuronsPerLayer, neuronsPerLayer)
const bias2 = loadBiases('bias2', neuronsPerLayer)

const weight3 = loadWeights('weight3', neuronsPerLayer, neuronsPerLayer)
const bias3 = loadBiases('bias3', neuronsPerLayer)

const weight4 = loadWeights('weight4', outputCount, neuronsPerLayer)
const bias4 = loadBiases('bias4', outputCount)

function saveNetwork() {
  localStorage.setItem('weight1', JSON.stringify(weight1))
  localStorage.setItem('bias1', JSON.stringify(bias1))
  localStorage.setItem('weight2', JSON.stringify(weight2))
  localStorage.setItem('bias2', JSON.stringify(bias2))
  localStorage.setItem('weight3', JSON.stringify(weight3))
  localStorage.setItem('bias3', JSON.stringify(bias3))
  localStorage.setItem('weight4', JSON.stringify(weight4))
  localStorage.setItem('bias4', JSON.stringify(bias4))
}
function checkWinner() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] !== 0 && board[a] === board[b] && board[b] === board[c]) {
      return board[a]; // 1 or -1 indicating who won
    }
  }

  // Check for draw
  if (board.every(cell => cell !== 0)) {
    return 0; // draw
  }

  // Game still ongoing
  return null;
}

function nextLayer(inputs, weights, bias) {
  let outputs = []
  for (let neuron = 0; neuron < weights.length; neuron++) {
    let sum = 0
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weights[neuron][i]
    }
    sum += bias[neuron]
    outputs.push(sigma(sum))
  }
  return outputs
}

function sigma(num) {
  return 1 / (1 + Math.exp(-num))
}

function neuralNetwork(turn = 'x') {
  if (!gameRunning) {
    gameRunning = true;
  }

  const inputs = [...board]
  const winner = checkWinner()
  if (winner !== null) {
    if (winner === 1) stats.xWins++;
    else if (winner === -1) stats.oWins++;
    else stats.draws++;
    stats.totalGames++;

    console.log(
      `Games: ${stats.totalGames} | X Wins: ${stats.xWins} | O Wins: ${stats.oWins} | Draws: ${stats.draws}`
    );

    for (const moveRecord of gameHistory) {
      moveRecord.reward = 0
      if (winner === 0) {
        moveRecord.reward = 0
      } else if ((winner === 1 && moveRecord.player === 'x') || (winner === -1 && moveRecord.player === 'o')) {
        moveRecord.reward = 1
      } else {
        moveRecord.reward = -1
      }
    }

    trainNetwork(gameHistory)
    gameHistory = []
    saveNetwork()
    saveStats()

    resetBoard()
    gameRunning = false;
    setTimeout(() => {
      gameRunning = true;
      neuralNetwork('x')
    }, 500)
    return
  }

  let hiddenLayer1 = nextLayer(inputs, weight1, bias1)
  let hiddenLayer2 = nextLayer(hiddenLayer1, weight2, bias2)
  let hiddenLayer3 = nextLayer(hiddenLayer2, weight3, bias3)
  let outputs = nextLayer(hiddenLayer3, weight4, bias4)

  console.log('Outputs:', outputs);

  let bestScore = -Infinity
  let bestMove = null

  for (let i = 0; i < outputs.length; i++) {
    if (board[i] === 0 && outputs[i] > bestScore) {
      bestScore = outputs[i]
      bestMove = i
    }
  }

  // fallback if no best move found
  if (bestMove === null) {
    bestMove = board.findIndex(cell => cell === 0)
    console.log('Fallback move:', bestMove)
  }

  if (bestMove !== null) {
    gameHistory.push({
      board: [...board],
      move: bestMove,
      player: turn
    })

    board[bestMove] = turn === 'x' ? 1 : -1
    q(`c${bestMove}`).innerHTML = turn
    displayBoard()
  }

  setTimeout(() => neuralNetwork(turn === 'x' ? 'o' : 'x'), 300)
}

// keep your existing resetBoard, trainNetwork, checkWinner, etc. unchanged
function trainNetwork(history) {
  const learningRate = 0.1

  for (const record of history) {
    const inputs = record.board
    const targetIndex = record.move
    const reward = record.reward

    // Update weights in the output layer for the move made
    for (let i = 0; i < weight4[targetIndex].length; i++) {
      weight4[targetIndex][i] += learningRate * reward * inputs[i]
    }

    // Optionally adjust biases of output layer
    bias4[targetIndex] += learningRate * reward
  }
}
function resetBoard() {
  for (let i = 0; i < board.length; i++) {
    board[i] = 0;
    q(`c${i}`).innerHTML = '';
  }
}
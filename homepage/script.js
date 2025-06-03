const games = [{
    name: '4 in a row',
    filename: '4inArow',
},
{
    name: 'cookie clicker v2',
    filename: 'cookieClicker',
},
{
    name: 'guess the number',
    filename: 'guessTheNumber',
},
{
    name: 'Tic Tac Toe',
    filename: 'tictactoe',
},
{
    name: 'cross numbers v2',
    filename: 'crossSumsv2',
},
{
    name: 'AI Tic Tac Toe',
    filename: 'AI-TicTacToe',
},
{
    name: 'simon says',
    filename: 'simon says',
},
{
    name: 'ai 4 in a row',
    filename: 'ai 4 in a row',
}, {
    name: 'not finished!',
    filename: 'none'
}, {
    name: 'css tools',
    filename: 'tool'
}
]

games.forEach(game => {
    if (game.filename === 'none') {
        document.querySelector('.games').innerHTML += `<div class="game red" onclick='alert("this game is not finished!")'><div class="name red">${game.name}</div><div class="img"><img src="imgs/${game.filename}.png" alt=""></div></div>`
    } else if (game.filename === 'tool') {
        document.querySelector('.games').innerHTML += `<div class="game tool" onclick='window.location.href="games/${game.filename}"'><div class="name">${game.name}</div><div class="img tool">⚙️</div></div>`
    } else {
        document.querySelector('.games').innerHTML += `<div class="game" onclick='window.location.href="games/${game.filename}"'><div class="name">${game.name}</div><div class="img"><img src="imgs/${game.filename}.png" alt=""></div></div>`
    }
})

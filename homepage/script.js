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
}
]

games.forEach(game => {
    document.querySelector('.games').innerHTML += `<div class="game" onclick='window.location.href="games/${game.filename}"'><div class="name">${game.name}</div><div class="img"><img src="imgs/${game.filename}.png" alt=""></div></div>`
})

let player = document.querySelector('.player');

let velocityX = 0;
let velocityY = 0;

const gameAreaWidth = window.innerWidth;
const gameAreaHeight = window.innerHeight;
const playerSize = 100;

let speed = 15
let wheat = 0

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') velocityX = 1;
  if (e.key === 'ArrowLeft') velocityX = -1;
  if (e.key === 'ArrowUp') velocityY = -1;
  if (e.key === 'ArrowDown') velocityY = 1;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') velocityX = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') velocityY = 0;
  });

let x = 100;
let y = 100;

player.style.left = x + 'px';
player.style.top = y + 'px';

function gameLoop() {
    x += velocityX * speed;
    y += velocityY * speed;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > gameAreaWidth - playerSize) x = gameAreaWidth - playerSize;
    if (y > gameAreaHeight - playerSize) y = gameAreaHeight - playerSize;
  
    player.style.left = x + 'px';
    player.style.top = y + 'px';
  
    requestAnimationFrame(gameLoop);
  }
gameLoop()

document.querySelectorAll('.crop').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  });

document.querySelectorAll('.crop').forEach(crop => {
    crop.addEventListener('click', function crops() {
        crop.innerHTML = ''
        wheat += 1
        updateWheat()
        this.removeEventListener('click', crops)
    });
});

function updateWheat() {
    document.querySelector('.wheat-count').innerHTML = wheat
}
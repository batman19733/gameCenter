let lightsHTML = ''

score = 0
for(let i=1;i<=8;i++) {
    lightsHTML += `<div class="light l${i}a"></div>`
}
q('lights').innerHTML = lightsHTML
q('lights').style.gridTemplateRows = 'repeat(2, 1fr)'
q('lights').style.gridTemplateColumns = 'repeat(4, 1fr)'

if (window.innerWidth <= 500) {
    q('lights').style.gridTemplateRows = 'repeat(4, 1fr)'
    q('lights').style.gridTemplateColumns = 'repeat(2, 1fr)'
    q('lights').style.height = 'min(800px, 90vw)'
    q('lights').style.width = 'min(400px, 45vw)'
    q('all').style.width = '100%'
    q('all').style.display = 'flex'
    q('all').style.flexDirection = 'column'
    q('all').style.alignItems = 'center'
    q('all').style.justifyContent = 'center'
    q('all').style.height = '70vh'
}

let path = []
let playerPath = []
let count = -1
let disabled = false
const check = async e => {
    e.preventDefault();
    let target = e.target;
    if (e.type === 'touchstart') {
        target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
    
    let className = target.className.split(' ')[1];
    if (!className || disabled) return;
    
    className = Number(className.replace('l', '').replace('a', ''));
    playerPath.push(className);

    count++;
    if (path[count] === playerPath[count]) {
        q(`l${className}a`).style.backgroundColor = 'lightgreen';
        await new Promise(x => setTimeout(x, 300));
        q(`l${className}a`).style.backgroundColor = 'var(--dark-white)';
        if (count + 1 === path.length) {
            playerPath = [];
            another();
        }
    } else {
        q('score').innerHTML = 'wrong! you lost';
        disabled = true;
        removeAllEventListeners();
        q('play-again-button').hidden = false;
        return;
    }
}

function addEventListeners(element) {
    element.addEventListener('click', check);
    element.addEventListener('touchstart', check, { passive: false });
}

function removeEventListeners(element) {
    element.removeEventListener('click', check);
    element.removeEventListener('touchstart', check);
}

function removeAllEventListeners() {
    document.querySelectorAll('.light').forEach(light => {
        removeEventListeners(light);
    });
}

document.querySelectorAll('.light').forEach(light => {
    addEventListeners(light);
});

async function another() {
    count = -1;
    disabled = true;
    q('turn').innerHTML = 'WAIT!!';
    q('turn').style.color = 'red';
    removeAllEventListeners();
    score++;
    q('score').innerHTML = `score: ${score}`;
    let randomNum = randomNumber(1, 8);
    path.push(randomNum);
    
    for(let i = 0; i < path.length; i++) {
        await new Promise(x => setTimeout(x, 400));
        let spot = path[i];
        q(`l${spot}a`).style.backgroundColor = 'red';
        await new Promise(x => setTimeout(x, 500));
        q(`l${spot}a`).style.backgroundColor = 'var(--dark-white)';
    }
    
    q('turn').innerHTML = 'Your turn.';
    q('turn').style.color = 'lightgreen';
    disabled = false;
    document.querySelectorAll('.light').forEach(light => {
        addEventListeners(light);
    });
}

function q(qury) {
    return document.querySelector(`.${qury}`)
}
function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
function playAgain() {
    q('play-again-button').hidden = true;
    q('start').hidden = false;
    count = 0;
    path = [];
    playerPath = [];
    disabled = false;
    q('turn').innerHTML = 'Your turn.';
    q('score').innerHTML = 'score: 0';
    score = 0;
}

// Prevent scrolling when touching the game area
document.querySelector('.lights').addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });
let boardHTML = ''
let turn = 'player'
let EZdisabled;
let EZresult;
let EZcheck = ''
let EZgrid;

q('diff').innerHTML = '<div class="text">what difficulty do you want to play in?</div><div class="buttons"><div class="button" onclick="play(`ez`)">ez mode</div><div class="button red" onclick="play(`medium`)">medium mode</div><div class="button" onclick="play(`hard`)">hard mode</div>'

function play(mode) {
    if(mode === 'ez') {window.location.href = 'ez mode'}


    else if(mode === 'medium') {window.location.href = 'medium mode'}


    else if (mode === 'hard') {window.location.href = 'hard mode'}


    else {
        alert('soemthing went wrong! please refresh the web')
    }
}











function q(qury) {
    return document.querySelector(`.${qury}`)
}

function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
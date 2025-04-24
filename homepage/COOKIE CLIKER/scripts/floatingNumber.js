document.querySelector('.cookie').addEventListener('click', (e) => {
    number = document.createElement('p');
    number.style.position = 'absolute';
    number.textContent = `+${CscoreAmount}`;
    number.style.left = `${e.pageX}px`
    number.style.top = `${e.pageY}px`
    number.style.userSelect = 'none'
    number.classList.add('Fnumber')
    document.body.appendChild(number);
    setTimeout(() => {
        document.querySelector('.Fnumber').remove()
    }, 2000)
})

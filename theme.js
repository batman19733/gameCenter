let theme = localStorage.getItem('theme')

if (theme === null) {
    theme = 'white'
}

if (theme === 'black') {
    document.body.classList.add('dark')
    document.querySelector('.dark-mode-text').innerHTML = 'Dark Mode'
}

function saveTheme () {
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'black')
    } else {
        localStorage.setItem('theme', 'white')
    }
}
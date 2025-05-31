const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const FF = new FFE(ctx, canvas.width, canvas.height) 
// FF.animate(100, 100, 100)

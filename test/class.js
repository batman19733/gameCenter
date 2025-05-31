class FFE {
    #ctx
    #w
    #h
    constructor(ctx, w, h) {
        this.#ctx = ctx
        this.#w = w
        this.#h = h

        this.#ctx.strokeStyle = 'white'
    }
    #draw(x, y, l) {
        length = l
        this.#ctx.beginPath()
        this.#ctx.moveTo(x, y)
        this.#ctx.lineTo(x + l, y + l)
        this.#ctx.stroke()
        this.#ctx.closePath()
    }
    animate(x, y, l) {
        this.#draw(x, y, l)
        x += 0.5
        y += 1
        console.log('animating')
        requestAnimationFrame(() => this.animate(x, y, l))    }
}
function shortNumber(num) {
    digits = num.toString().length
    let num0 = num.toString()[0]
    let num1 = num.toString()[1]
    let num2 = num.toString()[2]
    let num3 = num.toString()[3]
    let number
    if (digits === 3 || digits === 2 || digits === 1) {
        return num
    }
    if (digits === 4) {
        number = `${num0}.${num1}K`
    }
    if (digits === 5) {
        number = `${num0}${num1}.${num2}K`
    }
    if (digits === 6) {
        number = `${num0}.${num1}${num2}M`
    }
    if (digits === 7) {
        number = `${num0}${num1}.${num2}${num3}M`
    }
    if (digits === 8) {
        number = `${num0}${num1}${num2}.${num3}M`
    }
    if (digits === 9) {
        number = `${num0}.${num1}${num2}B`
    }

    return number
}
console.log(shortNumber('235534545'))
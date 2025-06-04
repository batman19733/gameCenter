message = `
cssgdfgd: hiii 3px
3px
cscsf: o54vwa
javvea: wasupppem
idpxk: hiihii
em: 43em e
`

result = message.replace(/(?<=^|\s)\d+(px|em|vh|dvh|vw|dvw)(?=\s|$)/gm, m => `<div>${m}</div>`)
console.log(result)
const webs = [
    {
        name: '??? Rating',
        rating: 'x/10',
        imgpath: null,
        filePath: 'rating'
    },{
        name: 'TEST',
        rating: 'x/10',
        imgpath: null,
        filePath: null
    },{
        name: 'TEST',
        rating: 'x/10',
        imgpath: null,
        filePath: null
    },{
        name: 'TEST',
        rating: 'x/10',
        imgpath: null,
        filePath: null
    }
]


let websHTML = ''
for (let i=0;i<webs.length;i++) {
    const web = webs[i]
    websHTML += 
            `<div class="web" onclick='${(web.filePath !== null) ? `location.href = "webs/${web.filePath}/"` : 'alert("uhh.. this aint finished!")'     } '>
                <div class="web-title">${web.name}</div>
                <div class="web-other">
                    <div class="img">loading...</div>
                    <div class="rating">rating: ${web.rating}</div>
                </div>
            </div>`
}
document.querySelector('.other').innerHTML = websHTML
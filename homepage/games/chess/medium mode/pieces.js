const pieces ={
    pawn: {
        qury: (num, color) => `<div class="p${num} ${color} pawn" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♟':'♙'}</div>`,
        grid: (c)=>  c === 'b'? 1:7
    },
    rook: {
        qury: (num, color) => `<div class="p${num} ${color} rook" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♜':'♖'}</div>`,
        grid: (c)=>  c === 'b'? 2:8
    },
    horse: {
        qury: (num, color) => `<div class="p${num} ${color} horse" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♞' : '♘'}</div>`,
        grid: (c)=>  c === 'b'? 3:9
    },
    bishop: {
        qury: (num, color) => `<div class="p${num} ${color} bishop" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♝' : '♗'}</div>`,
        grid: (c)=>  c === 'b'? 4:10
    },
    king: {
        qury: (num, color) => `<div class="p${num} ${color} king" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♚' : '♔'}</div>`,
        grid: (c)=>  c === 'b'? 5:11
    }, 
    queen: {
        qury: (num, color) => `<div class="p${num} ${color} queen" onclick="${color === 'b'? '':'displayLegalMoves(event)'}">${color === 'b' ? '♛' : '♕'}</div>`,
        grid: (c)=>  c === 'b'? 6:12
    },
    graySpot: (num) => `<div class="g${num} gray" onclick="moveTo(event)"></div>`}

const NumPieces = {
    1: { piece: 'pawn', color: 'b' },
    2: { piece: 'rook', color: 'b' },
    3: { piece: 'horse', color: 'b' },
    4: { piece: 'bishop', color: 'b' },
    5: { piece: 'king', color: 'b' },
    6: { piece: 'queen', color: 'b' },
    7: { piece: 'pawn', color: 'w' },
    8: { piece: 'rook', color: 'w' },
    9: { piece: 'horse', color: 'w' },
    10: { piece: 'bishop', color: 'w' },
    11: { piece: 'king', color: 'w' },
    12: { piece: 'queen', color: 'w' }
};
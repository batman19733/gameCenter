const pieces ={
    pawn: {
        qury: (num, color) => `<div class="piece pawn ${color} p${num}" onclick="${color === 'white' ? 'showAvaMoves(event, pieces.pawn.legalMoves)':''}">${color == 'black' ? '♟':'♙'}</div>`,
        legalMoves: ['pawn', [-1, 0]]
    },
    rook: {
        qury: (num, color) => `<div class="piece rook ${color} p${num}" onclick="${color === 'white'? 'showAvaMoves(event, pieces.rook.legalMoves)':''}">${color == 'black' ? '♜':'♖'}</div>`,
        legalMoves: ['...', [-1, 0], [1, 0], [0, 1], [0, -1]]
    },
    horse: {
        qury: (num, color) => `<div class="piece knight ${color} p${num}" onclick="${color === 'white'? 'showAvaMoves(event, pieces.horse.legalMoves)':''}">${color == 'black' ? '♞' : '♘'}</div>`,
        legalMoves: [[-2, -1], [-2, 1], [1, 2], [-1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]]
    },
    bishop: {
        qury: (num, color) => `<div class="piece bishop ${color} p${num}" onclick="${color === 'white'? 'showAvaMoves(event, pieces.bishop.legalMoves)':''}">${color == 'black' ? '♝' : '♗'}</div>`,
        legalMoves: ['...', [-1, -1], [1, 1], [-1, 1], [1, -1]]  
    },
    king: {
        qury: (num, color) => `<div class="piece king ${color} p${num}" onclick="${color === 'white'?'showAvaMoves(event, pieces.king.legalMoves)':''}">${color == 'black' ? '♚' : '♔'}</div>`,
        legalMoves: [[1,1], [-1,-1], [1,-1], [-1, 1], [1, 0], [-1, 0], [0, 1], [0, -1]]
    }, 
    queen: {
        qury: (num, color) => `<div class="piece queen ${color} p${num}" onclick="${color === 'white'?'showAvaMoves(event, pieces.queen.legalMoves)':''}">${color == 'black' ? '♛' : '♕'}</div>`,
        legalMoves: ['...', [-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]]
    },
    graySpot: (num) => `<div class="white gray g${num}" onclick="moveTo(event)">g</div>`}


let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}

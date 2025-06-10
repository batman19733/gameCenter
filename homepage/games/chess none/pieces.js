const pieces ={
    pawn: {
    qury: (num, color) => `<div class="piece pawn ${color} p${num}">${color == 'black' ? '♟':'♙'}</div>`,
    legalMove: '[-1, 0]'
    },
    rook: {
        qury: (num, color) => `<div class="piece rook ${color} p${num}">${color == 'black' ? '♜':'♖'}</div>`,
        legalMove: 'all of the y cords and x cords in a line'
    },
    knight: {
        qury: (num, color) => `<div class="piece knight ${color} p${num}">${color == 'black' ? '♞' : '♘'}</div>`,
        legalMove: 'uh idk'
    },
    bishop: {
        qury: (num, color) => `<div class="piece bishop ${color} p${num}">${color == 'black' ? '♝' : '♗'}</div>`,
        legalMove: 'diagnal lines'  
    }}
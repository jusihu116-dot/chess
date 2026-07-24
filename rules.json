
function findKing(board, color) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] === color + 'k') return { row: r, col: c };
        }
    }
    return null;
}


function isKingInCheck(board, color) {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    const enemyColor = color === 'w' ? 'b' : 'w';

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece[0] === enemyColor) {
                const moves = generateRawMoves(r, c, piece, board);
                if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) return true;
            }
        }
    }
    return false;
}


function getLegalMoves(r, c, piece) {
    const rawMoves = generateRawMoves(r, c, piece, gameState.board);
    const legalMoves = [];

    rawMoves.forEach(move => {
        const tempBoard = gameState.board.map(row => [...row]);
        tempBoard[move.row][move.col] = tempBoard[r][c];
        tempBoard[r][c] = '';
        if (!isKingInCheck(tempBoard, piece[0])) legalMoves.push(move);
    });
    return legalMoves;
}


function generateRawMoves(r, c, piece, board) {
    const color = piece[0], type = piece[1], moves = [];
    const dir = color === 'w' ? -1 : 1;

    if (type === 'p') {
        if (r + dir >= 0 && r + dir < 8 && board[r + dir][c] === '') {
            moves.push({ row: r + dir, col: c });
            const startRow = color === 'w' ? 6 : 1;
            if (r === startRow && board[r + dir * 2][c] === '') moves.push({ row: r + dir * 2, col: c });
        }
        [-1, 1].forEach(dc => {
            const nr = r + dir, nc = c + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                const target = board[nr][nc];
                if (target && target[0] !== color) moves.push({ row: nr, col: nc });
            }
        });
    } else if (type === 'n') {
        [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                const target = board[nr][nc];
                if (!target || target[0] !== color) moves.push({ row: nr, col: nc });
            }
        });
    } else {
        let dirs = [], limit = 8;
        if (type === 'b') dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
        else if (type === 'r') dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        else if (type === 'q') dirs = [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
        else if (type === 'k') { dirs = [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]; limit = 1; }

        dirs.forEach(([dr, dc]) => {
            for (let i = 1; i <= limit; i++) {
                const nr = r + dr * i, nc = c + dc * i;
                if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                const target = board[nr][nc];
                if (!target) moves.push({ row: nr, col: nc });
                else {
                    if (target[0] !== color) moves.push({ row: nr, col: nc });
                    break;
                }
            }
        });
    }
    return moves;
}

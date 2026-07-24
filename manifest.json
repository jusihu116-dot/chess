
let boardEl, turnDisplay, sidebar, overlay, modalBox, modalTitle, modalBody;
let coachBanner, coachText, oppName, resetBtn, sidebarToggleBtn, modalCloseBtn;

const PIECES = {
    w: { r: '♖', n: '♘', b: '♗', q: '♕', k: '♔', p: '♙' },
    b: { r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟︎' }
};

const COACH_TIPS = [
    "훌륭합니다! 중앙 주도권을 잘 잡고 계시네요.",
    "좋은 수입니다. 나이트와 비숍을 빠르게 전진시켜보세요.",
    "킹의 안전을 지키기 위해 캐슬링 타이밍을 노려보세요.",
    "상대 기물의 위협 경로를 상시 점검해야 합니다.",
    "좋은 흐름입니다. 주저하지 말고 빈틈을 공략하세요!"
];

let currentMode = 'play';
let gameState = {
    board: [],
    turn: 'w',
    selectedSquare: null,
    possibleMoves: [],
    lastMove: null,
    isGameOver: false
};

document.addEventListener('DOMContentLoaded', () => {
    boardEl = document.getElementById('board');
    turnDisplay = document.getElementById('turn-display');
    sidebar = document.getElementById('sidebar');
    overlay = document.getElementById('overlay');
    modalBox = document.getElementById('modal-box');
    modalTitle = document.getElementById('modal-title');
    modalBody = document.getElementById('modal-body');
    coachBanner = document.getElementById('coach-banner');
    coachText = document.getElementById('coach-text');
    oppName = document.getElementById('opp-name');
    resetBtn = document.getElementById('reset-btn');
    sidebarToggleBtn = document.getElementById('btn-sidebar-toggle');
    modalCloseBtn = document.getElementById('btn-modal-close');

    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeAll);
    modalCloseBtn.addEventListener('click', closeAll);
    resetBtn.addEventListener('click', initGame);

    document.querySelectorAll('.mode-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = e.currentTarget.dataset.mode;
            if (mode) switchMode(mode);
        });
    });

    document.querySelectorAll('[data-modal]').forEach(el => {
        el.addEventListener('click', (e) => {
            const modalType = e.currentTarget.dataset.modal;
            if (modalType) openModal(modalType);
        });
    });

    document.querySelectorAll('[data-mode]').forEach(el => {
        el.addEventListener('click', (e) => {
            const mode = e.currentTarget.dataset.mode;
            if (mode && !e.currentTarget.classList.contains('tab-btn')) {
                switchMode(mode);
            }
        });
    });

    
    boardEl.addEventListener('click', (e) => {
        if (gameState.isGameOver) return;
        const sq = e.target.closest('.square');
        if (!sq) return;

        const r = parseInt(sq.dataset.row);
        const c = parseInt(sq.dataset.col);
        const piece = gameState.board[r][c];

        if (gameState.selectedSquare && gameState.possibleMoves.some(m => m.row === r && m.col === c)) {
            movePiece(gameState.selectedSquare, { row: r, col: c });
            return;
        }

        if (piece && piece[0] === gameState.turn) {
            gameState.selectedSquare = { row: r, col: c };
            gameState.possibleMoves = getLegalMoves(r, c, piece);
        } else {
            gameState.selectedSquare = null;
            gameState.possibleMoves = [];
        }
        drawBoard();
    });

    initGame();
});


function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'coach') {
        coachBanner.classList.add('active');
        oppName.textContent = '코치 매그너스 (점수 1500)';
        coachText.textContent = '코치 매그너스: 준비되셨나요? 제가 대국하면서 한글로 조언해드릴게요!';
    } else if (mode === 'puzzle') {
        coachBanner.classList.add('active');
        oppName.textContent = '퍼즐 챌린지 (#1428)';
        coachText.textContent = '퍼즐: 가장 유리한 최선의 전술 수를 찾으세요!';
    } else {
        coachBanner.classList.remove('active');
        oppName.textContent = '상대방 (흑색)';
    }

    initGame();
}

// 게임 상태 초기화
function initGame() {
    if (currentMode === 'puzzle') {
        gameState = {
            board: [
                ['', '', '', 'bk', '', '', '', 'br'],
                ['bp', 'bp', '', '', '', 'bp', 'bp', 'bp'],
                ['', '', 'bq', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', 'wq', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['wp', 'wp', '', '', '', 'wp', 'wp', 'wp'],
                ['wr', '', '', '', 'wk', '', '', '']
            ],
            turn: 'w', selectedSquare: null, possibleMoves: [], lastMove: null, isGameOver: false
        };
    } else {
        gameState = {
            board: [
                ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
                ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
                Array(8).fill(''), Array(8).fill(''),
                Array(8).fill(''), Array(8).fill(''),
                ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
                ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
            ],
            turn: 'w', selectedSquare: null, possibleMoves: [], lastMove: null, isGameOver: false
        };
    }
    closeAll();
    drawBoard();
    updateStatus();
}


function movePiece(from, to) {
    const piece = gameState.board[from.row][from.col];
    gameState.board[to.row][to.col] = piece;
    gameState.board[from.row][from.col] = '';

    if (piece[1] === 'p' && (to.row === 0 || to.row === 7)) {
        gameState.board[to.row][to.col] = piece[0] + 'q';
    }

    gameState.lastMove = { from, to };
    gameState.turn = gameState.turn === 'w' ? 'b' : 'w';
    gameState.selectedSquare = null;
    gameState.possibleMoves = [];

    if (currentMode === 'coach' && gameState.turn === 'b') {
        const randomTip = COACH_TIPS[Math.floor(Math.random() * COACH_TIPS.length)];
        coachText.textContent = `코치 매그너스: ${randomTip}`;
    }

    checkGameEndStatus();
    drawBoard();
    updateStatus();
}

function checkGameEndStatus() {
    let totalLegalMoves = 0;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = gameState.board[r][c];
            if (piece && piece[0] === gameState.turn) {
                totalLegalMoves += getLegalMoves(r, c, piece).length;
            }
        }
    }

    if (totalLegalMoves === 0) {
        gameState.isGameOver = true;
        const inCheck = isKingInCheck(gameState.board, gameState.turn);
        modalTitle.textContent = inCheck ? '체크메이트!' : '무승부';
        modalBody.textContent = inCheck ? `${gameState.turn === 'w' ? '흑색' : '백색'}의 승리입니다!` : '더 이상 둘 수 있는 수가 없습니다.';
        overlay.classList.add('active');
        modalBox.classList.add('active');
    }
}

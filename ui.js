function drawBoard() {
    boardEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    const inCheck = isKingInCheck(gameState.board, gameState.turn);

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const sq = document.createElement('div');
            const isLight = (r + c) % 2 === 0;
            sq.className = `square ${isLight ? 'light' : 'dark'}`;
            sq.dataset.row = r; 
            sq.dataset.col = c;

            if (gameState.lastMove) {
                const { from, to } = gameState.lastMove;
                if ((from.row === r && from.col === c) || (to.row === r && to.col === c)) {
                    sq.classList.add('last-move');
                }
            }

            const piece = gameState.board[r][c];
            if (piece) {
                const pSpan = document.createElement('span');
                pSpan.className = 'piece';
                pSpan.textContent = PIECES[piece[0]][piece[1]];
                sq.appendChild(pSpan);

                if (inCheck && piece[0] === gameState.turn && piece[1] === 'k') {
                    sq.classList.add('in-check');
                }
            }

            if (gameState.selectedSquare?.row === r && gameState.selectedSquare?.col === c) {
                sq.classList.add('selected');
            }

            if (gameState.possibleMoves.some(m => m.row === r && m.col === c)) {
                sq.classList.add('possible');
                if (piece) sq.classList.add('has-piece');
            }

            frag.appendChild(sq);
        }
    }
    boardEl.appendChild(frag);
}

function updateStatus() {
    const inCheck = isKingInCheck(gameState.board, gameState.turn);
    let text = gameState.turn === 'w' ? '백색 차례' : '흑색 차례';
    if (inCheck) text += ' [체크!]';
    turnDisplay.textContent = text;
}


function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}


function closeAll() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    modalBox.classList.remove('active');
}

function openModal(type) {
    closeAll();
    overlay.classList.add('active');
    modalBox.classList.add('active');

    if (type === 'record') {
        modalTitle.textContent = '경기 기록';
        modalBody.innerHTML = `
            <ul class="history-list">
                <li><span>vs 최고수봇</span> <span style="color:#81b64c; font-weight:bold;">승리 (+15)</span></li>
                <li><span>vs 코치 매그너스</span> <span style="color:#e57373; font-weight:bold;">패배 (-12)</span></li>
            </ul>`;
    } else if (type === 'league') {
        modalTitle.textContent = '브론즈 리그';
        modalBody.innerHTML = '<p>현재 순위: <b>2위</b> (상위 리그 승급 가능)</p>';
    } else if (type === 'daily') {
        modalTitle.textContent = '일일 게임';
        modalBody.innerHTML = '<p>진행 중인 일일 대국이 없습니다.</p>';
    } else if (type === 'lesson') {
        modalTitle.textContent = '체스 레슨';
        modalBody.innerHTML = '<p><b>추천 강좌:</b> 오프닝 원리와 중앙점령법</p>';
    } else if (type === 'review') {
        modalTitle.textContent = '게임 리뷰';
        modalBody.innerHTML = '<p>최근 대국 정확도: <b style="color:#81b64c;">86.5%</b></p>';
    }
}

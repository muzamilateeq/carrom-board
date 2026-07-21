(function() {
    const boardScreen = document.getElementById('board-selection-screen');
    const menuScreen = document.getElementById('menu-screen');
    const backBtn = document.getElementById('board-back-btn');
    const coinsDisplay = document.getElementById('board-coins-value');
    
    // Board configurations matching the Mockup
    const boards = [
        { name: 'BEGGINER', bg: 'Green Bar_.png', fee: 200, prize: 400 },
        { name: 'EXPERIENCED', bg: 'Blue Bar_.png', fee: 500, prize: 1000 },
        { name: 'EXPERT', bg: 'purple Bar_.png', fee: 2500, prize: 5000 },
        { name: 'ADVANCED', bg: 'Yellow Bar  copy.png', fee: 5000, prize: '10K' },
        { name: 'ELITE', bg: 'Yellow Bar_.png', fee: 10000, prize: '20K' }
    ];

    const boardListContainer = document.getElementById('board-list-container');

    function updateBoardCoins() {
        if (coinsDisplay) {
            const playerCoins = parseInt(localStorage.getItem('carrom_player_coins') || '5000', 10);
            coinsDisplay.textContent = playerCoins;
        }
    }

    // Populate board options
    if (boardListContainer) {
        boards.forEach(board => {
            const wrapper = document.createElement('div');
            wrapper.className = 'board-item-wrapper';

            const item = document.createElement('div');
            item.className = 'board-item';
            item.style.backgroundImage = `url('./Assets/Board-slection/${board.bg}')`;

            wrapper.innerHTML = `
                <div class="board-item-title">${board.name}</div>
            `;

            const feeClass = String(board.fee).length >= 5 ? 'board-fee-text long-text' : 'board-fee-text';

            item.innerHTML = `
                <img src="./Assets/Board-slection/Coin.png" class="board-coin-large" alt="Coin">
                
                <div class="board-prize-container">
                    <img src="./Assets/Board-slection/Prize_.png" class="board-prize-bg" alt="Prize">
                    <div class="board-prize-slot">
                        <div class="board-prize-text">${board.prize}</div>
                    </div>
                </div>

                <div class="board-fee-container">
                    <img src="./Assets/Board-slection/Entry Fee.png" class="board-fee-bg" alt="Entry Fee">
                    <div class="board-fee-slot">
                        <div class="${feeClass}">${board.fee}</div>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                const playerCoins = parseInt(localStorage.getItem('carrom_player_coins') || '5000', 10);
                if (playerCoins >= board.fee) {
                    // Call the globally exposed matchmaking trigger
                    if (window.startMatchmaking) {
                        window.startMatchmaking(board.fee);
                    }
                } else {
                    // Not enough coins! Give a visual shake feedback.
                    item.style.transform = 'translateX(-10px)';
                    setTimeout(() => item.style.transform = 'translateX(10px)', 100);
                    setTimeout(() => item.style.transform = 'translateX(-10px)', 200);
                    setTimeout(() => item.style.transform = 'scale(1.0)', 300);
                }
            });
            wrapper.appendChild(item);
            boardListContainer.appendChild(wrapper);
        });
    }

    // Back Button Logic
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Fade out board screen
            boardScreen.style.opacity = '0';
            boardScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                boardScreen.style.display = 'none';
            }, 600);

            // Fade in menu screen
            if (menuScreen) {
                menuScreen.style.display = 'flex';
                // Trigger reflow
                void menuScreen.offsetWidth;
                menuScreen.style.opacity = '1';
                menuScreen.style.pointerEvents = 'auto';
            }
        });
    }

    const boardFreeCoinsBtn = document.getElementById('board-free-coins-btn');
    if (boardFreeCoinsBtn) {
        boardFreeCoinsBtn.addEventListener('click', () => {
            if (typeof window.addCoins === 'function') {
                window.addCoins(5000);
            } else {
                const current = parseInt(localStorage.getItem('carrom_player_coins') || '5000', 10);
                localStorage.setItem('carrom_player_coins', current + 5000);
            }
            updateBoardCoins();
        });
    }

    // Expose a global function to be called from menu.js to fade in the board screen
    window.openBoardSelection = function() {
        updateBoardCoins();
        boardScreen.style.display = 'flex';
        // Trigger reflow
        void boardScreen.offsetWidth;
        boardScreen.style.opacity = '1';
        boardScreen.style.pointerEvents = 'auto';
    };

})();

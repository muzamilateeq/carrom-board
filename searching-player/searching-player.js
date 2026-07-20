(function () {
    const spScreen = document.getElementById('searching-player-screen');
    const boardScreen = document.getElementById('board-selection-screen');
    const cancelBtn = document.getElementById('sp-cancel-btn');

    const playerNameLeft = document.getElementById('sp-player-name-left');
    const playerNameRight = document.getElementById('sp-player-name-right');
    const playerFeeLeft = document.getElementById('sp-fee-left');
    const playerFeeRight = document.getElementById('sp-fee-right');
    const spStatusText = document.getElementById('sp-status-text');
    const opponentAvatar = document.getElementById('sp-avatar-right');

    let matchmakingTimeout = null;
    let countdownInterval = null;
    let currentFee = 0;

    const opponentPool = [
        'CARROMCHAMP',
        'PUCKMASTER',
        'QUEENHUNTER',
        'SLIDESHOT',
        'STRIKERPRO',
        'BOARDKING'
    ];

    function stopMatchmaking() {
        if (matchmakingTimeout) {
            clearTimeout(matchmakingTimeout);
            matchmakingTimeout = null;
        }
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (opponentAvatar) {
            opponentAvatar.classList.remove('sp-pulse');
        }
    }

    window.startMatchmaking = function (entryFee, fixedOpponentName) {
        if (typeof window.deductCoins === 'function') {
            if (!window.deductCoins(entryFee)) {
                alert("Not enough coins to play on this board!");
                return;
            }
        }
        window.currentMatchEntryFee = entryFee;
        currentFee = entryFee;
        stopMatchmaking();

        // Populate player name
        if (playerNameLeft) {
            playerNameLeft.textContent = localStorage.getItem('carrom_player_name') || 'PLAYER 1';
        }
        if (playerNameRight) {
            playerNameRight.textContent = fixedOpponentName ? fixedOpponentName.toUpperCase() : 'MATCHING...';
        }
        if (playerFeeLeft) {
            playerFeeLeft.textContent = entryFee;
        }
        if (playerFeeRight) {
            playerFeeRight.textContent = entryFee;
        }
        if (spStatusText) {
            spStatusText.textContent = fixedOpponentName ? 'REMATCHING WITH OPPONENT...' : 'SEARCHING FOR PLAYERS...';
        }
        if (opponentAvatar) {
            opponentAvatar.classList.add('sp-pulse');
        }

        // Show screen
        if (spScreen) {
            spScreen.style.display = 'flex';
            void spScreen.offsetWidth;
            spScreen.style.opacity = '1';
            spScreen.style.pointerEvents = 'auto';
        }

        // Hide board selection
        if (boardScreen) {
            boardScreen.style.opacity = '0';
            boardScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                boardScreen.style.display = 'none';
            }, 600);
        }

        // Start search timer (simulates finding a player in 3s)
        matchmakingTimeout = setTimeout(() => {
            if (opponentAvatar) {
                opponentAvatar.classList.remove('sp-pulse');
            }
            const opponentName = fixedOpponentName || opponentPool[Math.floor(Math.random() * opponentPool.length)];
            if (playerNameRight) {
                playerNameRight.textContent = opponentName;
            }

            // Start 3s countdown
            let count = 3;
            if (spStatusText) {
                spStatusText.textContent = `STARTING IN ${count}...`;
            }

            countdownInterval = setInterval(() => {
                count--;
                if (count > 0) {
                    if (spStatusText) {
                        spStatusText.textContent = `STARTING IN ${count}...`;
                    }
                } else {
                    clearInterval(countdownInterval);
                    countdownInterval = null;

                    // Deduct coins on launch
                    const playerCoins = parseInt(localStorage.getItem('carrom_player_coins') || '5000', 10);
                    const newBalance = Math.max(0, playerCoins - currentFee);
                    localStorage.setItem('carrom_player_coins', newBalance);

                    // Launch game
                    if (window.startLocalGameFromBoard) {
                        window.startLocalGameFromBoard(opponentName);
                    }

                    // Hide matchmaking screen
                    if (spScreen) {
                        spScreen.style.opacity = '0';
                        spScreen.style.pointerEvents = 'none';
                        setTimeout(() => {
                            spScreen.style.display = 'none';
                        }, 600);
                    }
                }
            }, 1000);

        }, 3000);
    };

    // Cancel Button Action
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            stopMatchmaking();

            // Hide matchmaking screen
            if (spScreen) {
                spScreen.style.opacity = '0';
                spScreen.style.pointerEvents = 'none';
                setTimeout(() => {
                    spScreen.style.display = 'none';
                }, 600);
            }

            // Show board selection screen
            if (boardScreen) {
                boardScreen.style.display = 'flex';
                void boardScreen.offsetWidth;
                boardScreen.style.opacity = '1';
                boardScreen.style.pointerEvents = 'auto';
            }
        });
    }

})();

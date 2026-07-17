(function () {
    // State management using localStorage
    let playerName = localStorage.getItem('carrom_player_name') || 'Player 1';
    let playerCoins = parseInt(localStorage.getItem('carrom_player_coins') || '50000', 10);
    if (playerCoins < 50000) {
        playerCoins = 50000;
        localStorage.setItem('carrom_player_coins', playerCoins);
    }

    const nameDisplay = document.getElementById('menu-player-name');
    const nameInput = document.getElementById('menu-player-input');
    const editBtn = document.getElementById('menu-edit-btn');
    const coinsDisplay = document.getElementById('menu-coins-value');
    const freeCoinsBtn = document.getElementById('menu-free-coins');
    const localBtn = document.getElementById('menu-local-btn');
    const multiplayerBtn = document.getElementById('menu-multiplayer-btn');
    const matchmakingScreen = document.getElementById('matchmaking-screen');
    const matchmakingStatus = document.getElementById('matchmaking-status');

    // Opponent names pool for simulated matchmaking
    const opponentNames = ['FlickKing', 'QueenHunter', 'CarromPro', 'StrikerBoss', 'PuckSlayer', 'BoardMaster'];

    // Helper to update name UI without overlapping default assets
    function updateNameUI() {
        if (nameDisplay) {
            nameDisplay.textContent = playerName;
        }
    }

    // Helper to update coins UI without overlapping default assets
    function updateCoinsUI(value) {
        if (coinsDisplay) {
            coinsDisplay.textContent = value;
        }
    }

    // Initialize values
    updateNameUI();
    if (nameInput) nameInput.value = playerName;
    updateCoinsUI(playerCoins);

    // Global APIs for Matchmaking & Result screens
    window.getPlayerCoins = () => playerCoins;
    window.deductCoins = (amount) => {
        if (playerCoins >= amount) {
            playerCoins -= amount;
            localStorage.setItem('carrom_player_coins', playerCoins);
            updateCoinsUI(playerCoins);
            return true;
        }
        return false;
    };
    window.addCoins = (amount) => {
        playerCoins += amount;
        localStorage.setItem('carrom_player_coins', playerCoins);
        updateCoinsUI(playerCoins);
    };

    // Inline Name Editing Logic
    function enableEditing() {
        if (nameDisplay && nameInput) {
            nameDisplay.style.display = 'none';
            nameInput.style.display = 'inline-block';
            nameInput.focus();
            nameInput.select();
        }
    }

    function saveName() {
        if (nameDisplay && nameInput) {
            let newName = nameInput.value.trim();
            if (newName === '') {
                newName = 'Player 1';
            }
            // Limit to 10 characters for alignment safety
            if (newName.length > 10) {
                newName = newName.substring(0, 10);
            }
            playerName = newName;
            localStorage.setItem('carrom_player_name', playerName);
            updateNameUI();
            nameInput.value = playerName;
            nameDisplay.style.display = 'inline-block';
            nameInput.style.display = 'none';
        }
    }

    if (editBtn) editBtn.addEventListener('click', enableEditing);
    if (nameDisplay) nameDisplay.addEventListener('click', enableEditing);
    if (nameInput) {
        nameInput.addEventListener('blur', saveName);
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            }
        });
    }

    // Claim Free Coins feature
    let canClaim = true; // Simulated delay between claims
    if (freeCoinsBtn) {
        freeCoinsBtn.addEventListener('click', () => {
            if (!canClaim) return;
            canClaim = false;

            const reward = 5000;
            const startCoins = playerCoins;
            playerCoins += reward;
            localStorage.setItem('carrom_player_coins', playerCoins);

            // Play floating rewards animation
            createFloatingReward(freeCoinsBtn, `+${reward} Coins`);

            // Animate top-right coins display ticker
            animateCoinsTicker(startCoins, playerCoins);

            // Apply a slight scale-up bounce animation to coins bar
            const coinsContainer = document.querySelector('.menu-coins-container');
            if (coinsContainer) {
                coinsContainer.style.transition = 'transform 0.15s ease';
                coinsContainer.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    coinsContainer.style.transform = 'scale(1.0)';
                }, 150);
            }

            // Put a cool delay on button claim availability
            freeCoinsBtn.style.opacity = '0.5';
            freeCoinsBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                canClaim = true;
                freeCoinsBtn.style.opacity = '1.0';
                freeCoinsBtn.style.pointerEvents = 'auto';
            }, 5000); // Available again in 5 seconds for playtesting
        });
    }

    function createFloatingReward(targetEl, text) {
        const wrapper = document.querySelector('.menu-wrapper');
        if (!wrapper) return;

        const floatText = document.createElement('div');
        floatText.className = 'floating-coins-reward';
        floatText.textContent = text;

        // Position it near the clicked element
        const rect = targetEl.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();

        // Calculate relative position inside the aspect-ratio wrapper
        const x = ((rect.left + rect.width / 2) - wrapperRect.left) / wrapperRect.width * 100;
        const y = ((rect.top) - wrapperRect.top) / wrapperRect.height * 100;

        floatText.style.left = `${x}%`;
        floatText.style.top = `${y}%`;

        wrapper.appendChild(floatText);

        // Remove element after animation finishes
        setTimeout(() => {
            floatText.remove();
        }, 1200);
    }

    function animateCoinsTicker(start, end) {
        const duration = 800; // Animation length in ms
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth count ticker
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeProgress);

            updateCoinsUI(current);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                updateCoinsUI(end);
            }
        }
        requestAnimationFrame(tick);
    }

    // Sync scoreboard details in the game board
    function syncScoreboardWithPlayerState(opponentName) {
        // Expose username
        const p1NameDiv = document.getElementById('playerone-name');
        if (p1NameDiv) {
            p1NameDiv.innerHTML = `${playerName.toUpperCase()}: <span style="font-size:11px;color:#ffd700;">YOU</span>`;
        }

        // Expose opponent name
        const p2NameDiv = document.getElementById('playertwo-name');
        if (p2NameDiv) {
            p2NameDiv.innerHTML = `${opponentName.toUpperCase()}: <span style="font-size:11px;color:#ffa0a0;">OPPONENT</span>`;
        }

        // Sync coin score board value
        const coinScoreSpan = document.getElementById('coinscore');
        if (coinScoreSpan) {
            coinScoreSpan.textContent = playerCoins;
        }

    }

    // Transition out of menu into game board
    function transitionToGameBoard() {
        const menuScreen = document.getElementById('menu-screen');
        const gameWrapper = document.getElementById('game-wrapper');

        if (menuScreen) {
            menuScreen.style.opacity = '0';
            menuScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                menuScreen.style.display = 'none';
            }, 600);
        }

        if (gameWrapper) {
            gameWrapper.style.opacity = '1';
            gameWrapper.style.pointerEvents = 'auto';
        }
    }

    // Local mode action
    if (localBtn) {
        localBtn.addEventListener('click', () => {
            saveName(); // Ensure any unsaved name change is committed

            // Fade out menu screen
            const menuScreen = document.getElementById('menu-screen');
            if (menuScreen) {
                menuScreen.style.opacity = '0';
                menuScreen.style.pointerEvents = 'none';
                setTimeout(() => {
                    menuScreen.style.display = 'none';
                }, 600);
            }

            // Open Board Selection
            if (window.openBoardSelection) {
                window.openBoardSelection();
            }
        });
    }

    // Expose game launcher for board selection
    window.startLocalGameFromBoard = function (opponentName) {
        window.currentOpponentName = opponentName || "Opponent";
        syncScoreboardWithPlayerState(opponentName);
        transitionToGameBoard();
    };

    // Multiplayer Mode action (with simulated matchmaking overlay)
    if (multiplayerBtn) {
        multiplayerBtn.addEventListener('click', () => {
            saveName();
            if (!matchmakingScreen || !matchmakingStatus) return;

            // Show matchmaking overlay screen
            matchmakingScreen.style.opacity = '1';
            matchmakingScreen.style.pointerEvents = 'auto';

            let step = 0;
            let chosenOpponent = opponentNames[Math.floor(Math.random() * opponentNames.length)];

            function runMatchmakingSequence() {
                if (step === 0) {
                    matchmakingStatus.innerHTML = 'FINDING OPPONENT...';
                    setTimeout(() => { step = 1; runMatchmakingSequence(); }, 1200);
                } else if (step === 1) {
                    matchmakingStatus.innerHTML = '<span style="color:#ffd700;">OPPONENT FOUND!</span>';
                    setTimeout(() => { step = 2; runMatchmakingSequence(); }, 800);
                } else if (step === 2) {
                    matchmakingStatus.innerHTML = `VS <span style="color:#ff922b;">${chosenOpponent.toUpperCase()}</span>`;
                    setTimeout(() => { step = 3; runMatchmakingSequence(); }, 1000);
                } else if (step === 3) {
                    matchmakingStatus.innerHTML = 'GAME STARTING IN 3...';
                    setTimeout(() => { step = 4; runMatchmakingSequence(); }, 600);
                } else if (step === 4) {
                    matchmakingStatus.innerHTML = 'GAME STARTING IN 2...';
                    setTimeout(() => { step = 5; runMatchmakingSequence(); }, 600);
                } else if (step === 5) {
                    matchmakingStatus.innerHTML = 'GAME STARTING IN 1...';
                    setTimeout(() => { step = 6; runMatchmakingSequence(); }, 600);
                } else if (step === 6) {
                    // Hide matchmaking and launch game
                    matchmakingScreen.style.opacity = '0';
                    matchmakingScreen.style.pointerEvents = 'none';
                    syncScoreboardWithPlayerState(chosenOpponent);
                    transitionToGameBoard();
                }
            }

            runMatchmakingSequence();
        });
    }
})();

// Add keyframes for animation dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    80% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);

let currentOpponentName = "Opponent";

function showWinScreen(isWinner, opponentName = "Opponent") {
    currentOpponentName = opponentName;
    const winScreen = document.getElementById('win-screen');
    const titleImg = document.getElementById('result-title-img');
    const subtitleText = document.getElementById('result-subtitle-text');
    
    // Set opponent name
    document.getElementById('win-p2-name').textContent = opponentName;
    
    // Set player name
    const playerName = localStorage.getItem('carrom_player_name') || 'You';
    document.getElementById('win-p1-name').textContent = playerName;
    
    let entryFee = window.currentMatchEntryFee || 400;
    let winAmount = entryFee * 2;
    
    // Customize based on win or loss
    if (isWinner) {
        if (typeof window.addCoins === 'function') {
            window.addCoins(winAmount);
        } else {
            let currentCoins = parseInt(localStorage.getItem('carrom_player_coins') || '5000', 10);
            localStorage.setItem('carrom_player_coins', currentCoins + winAmount);
        }
        titleImg.src = "Assets/Result/Youu Win_.png";
        if (subtitleText) subtitleText.textContent = `+${winAmount}`;
    } else {
        titleImg.src = "Assets/Result/You Lose.png";
        if (subtitleText) subtitleText.textContent = `-${entryFee}`;
    }
    
    winScreen.style.display = 'flex';
}
window.showWinScreen = showWinScreen;

// REMATCH button - start matchmaking again with the same opponent
document.getElementById('win-play-btn').addEventListener('click', () => {
    document.getElementById('win-screen').style.display = 'none';
    if (typeof window.startMatchmaking === 'function') {
        window.startMatchmaking(window.currentMatchEntryFee || 400, currentOpponentName);
    } else {
        window.location.reload();
    }
});

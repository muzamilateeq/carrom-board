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

function showWinScreen(isWinner, opponentName = "Opponent") {
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
        }
        titleImg.src = "Assets/Result/Youu Win_.png";
        if (subtitleText) subtitleText.textContent = winAmount;
    } else {
        titleImg.src = "Assets/Result/You Lose.png";
        if (subtitleText) subtitleText.textContent = winAmount;
    }
    
    winScreen.style.display = 'flex';
}

// REMATCH button - reload to restart
document.getElementById('win-play-btn').addEventListener('click', () => {
    document.getElementById('win-screen').style.display = 'none';
    window.location.reload();
});

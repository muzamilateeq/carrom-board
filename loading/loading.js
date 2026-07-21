(function() {
    const assets = [
        './you.png',
        './oponent-image.png',
        './coins.png',
        './images.jpg',
        './red-background-pic.avif',
        './Assets/menu/Mockup.png',
        './Assets/menu/User-Name.png',
        './Assets/menu/Coins-Bar.png',
        './Assets/menu/Edit-Name.png',
        './Assets/menu/Yellow-Button.png',
        './Assets/menu/Multiplayer.png',
        './Assets/menu/Local-Mode.png',
        './Assets/menu/Upper-Bar.png'
    ];

    let loadedCount = 0;
    let targetProgress = 0;
    let currentProgress = 0;

    // Preload game assets
    assets.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
            loadedCount++;
            targetProgress = Math.floor((loadedCount / assets.length) * 100);
        };
    });

    function updateProgress() {
        // Smoothly animate the loading bar progress
        if (currentProgress < targetProgress) {
            currentProgress += 1.0;
        } else if (currentProgress < 100 && loadedCount === assets.length) {
            currentProgress += 1.5;
        }

        if (currentProgress > 100) {
            currentProgress = 100;
        }

        const fill = document.getElementById('loading-fill-img');
        if (fill) {
            fill.style.setProperty('--progress', `${currentProgress}%`);
        }

        if (currentProgress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            setTimeout(revealMenuScreen, 300);
        }
    }

    function revealMenuScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const menuScreen = document.getElementById('menu-screen');

        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }

        if (menuScreen) {
            menuScreen.style.opacity = '1';
            menuScreen.style.pointerEvents = 'auto';
        }
    }

    requestAnimationFrame(updateProgress);
})();

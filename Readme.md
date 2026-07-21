# Carrom Board Game 🎯

A high-performance, responsive HTML5 Carrom Board web application built with JavaScript, CSS3 container queries, and the Matter.js physics engine.

---

## 📁 Project Directory Structure

```
d:/Games/
├── 📄 index.html                     # Main application entry point & view container
├── 📄 game.js                       # Core physics simulation, turn loop & win evaluation
├── 📄 package.json                  # Project metadata
├── 📄 README.md                     # Architecture documentation
├── 🖼️ coins.png, you.png, etc.       # Core UI texture assets
│
├── 📂 Assets/                       # Game visual assets & textures
│   ├── 📂 menu/                     # Main menu UI assets
│   ├── 📂 loading/                  # Loading screen mockup & fills
│   ├── 📂 Board-slection/           # Board selection cards & banners
│   ├── 📂 Result/                   # Match victory/defeat banners
│   ├── 📂 searching-player/         # Matchmaking screen assets
│   └── 📂 structure/                # Game structure graphics
│
└── 📂 src/                          # All Game Component Modules
    ├── 📂 board-and-pieces/         # Matter.js Physics Engine Setup
    │   ├── 📄 pieces-config.js      # Physical dimensions, restitution, friction & density
    │   ├── 📄 board.js              # Carrom board wall boundaries & pockets
    │   └── 📄 pieces.js             # Striker, Queen & 18-coin layout positioning
    │
    ├── 📂 loading/                  # Asset Preloader Module
    │   ├── 📄 loading.js            # Async preloader script & progress tracker
    │   └── 📄 loading.css           # Loading screen styles
    │
    ├── 📂 menu/                     # Main Menu & Profile Module
    │   ├── 📄 menu.js               # Profile name editing, free coins claim & launcher
    │   └── 📄 menu.css              # Main menu styles & responsive container queries
    │
    ├── 📂 board-selection/          # Board Selection Module
    │   ├── 📄 board-selection.js    # Tiered board selection (Beginner -> Elite)
    │   └── 📄 board-selection.css   # Board selection carousel styling
    │
    ├── 📂 searching-player/         # Matchmaking Module
    │   ├── 📄 searching-player.js   # Matchmaking radar sequence & opponent generator
    │   └── 📄 searching-player.css  # Matchmaking screen styling
    │
    └── 📂 result/                   # Match Result Module
        ├── 📄 result.js             # Win/Loss modal, coin calculations & rematch flow
        └── 📄 result.css            # Victory modal layout & styling
```

---

## 🚀 How to Run Locally

Simply open `index.html` in any modern web browser or serve via a local HTTP server:

```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.
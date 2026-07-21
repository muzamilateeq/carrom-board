# Carrom Board Game 🎯

A high-performance, responsive HTML5 Carrom Board web application built with JavaScript, CSS3 container queries, and the Matter.js physics engine.

---

## 📁 Directory & Modular Folder Structure

```
d:/Games/
├── 📄 index.html                     # Main application entry point & view container
├── 📄 game.js                       # Core physics simulation, turn loop & win evaluation
├── 📄 package.json                  # Project metadata
├── 📄 README.md                     # Architecture documentation
│
├── 📂 Assets/                       # Consolidated visual assets & textures
│   ├── 📂 common/                   # Shared UI graphics (avatars, coin icons, backgrounds)
│   ├── 📂 menu/                     # Main menu UI assets (logo, header bars, buttons)
│   ├── 📂 loading/                  # Loading screen mockup & progress bar fills
│   ├── 📂 Board-slection/           # Board selection cards & tier banners
│   ├── 📂 Result/                   # Match victory/defeat banners & chat bubbles
│   └── 📂 structure/                # Game structure & logo graphics
│
├── 📂 board-and-pieces/             # Matter.js Physics Engine Configuration
│   ├── 📄 pieces-config.js          # Physical dimensions, restitution, friction & density
│   ├── 📄 board.js                  # Carrom board wall boundaries, cushions & pockets
│   └── 📄 pieces.js                 # Striker, Queen & 18-coin layout positioning
│
├── 📂 loading/                      # Asset Preloader Module
│   ├── 📄 loading.js                # Async preloader script & progress tracker
│   └── 📄 loading.css               # Loading screen styles
│
├── 📂 menu/                         # Main Menu & Profile Module
│   ├── 📄 menu.js                   # Profile name editing, free coins claim & launcher
│   └── 📄 menu.css                  # Main menu styles & responsive container queries
│
├── 📂 board-selection/              # Board Selection & Entry Fee Module
│   ├── 📄 board-selection.js        # Tiered board selection (Beginner -> Elite)
│   └── 📄 board-selection.css       # Board selection carousel styling
│
├── 📂 searching-player/             # Matchmaking Module
│   ├── 📄 searching-player.js       # Matchmaking radar sequence & opponent generator
│   └── 📄 searching-player.css      # Matchmaking screen styling
│
└── 📂 result/                       # Match Result & Rematch Module
    ├── 📄 result.js                 # Win/Loss modal, coin calculations & instant rematch flow
    └── 📄 result.css                # Victory modal layout & container query styling
```

---

## ⚡ Feature Modules Breakdown

| Module | Location | Description |
| :--- | :--- | :--- |
| **Preloader** | `loading/` | Asynchronously preloads all image assets before unveiling the main menu. |
| **Main Menu** | `menu/` | Player name editing, local storage initialization, free coins claim (`+5000`), and mode selection. |
| **Board Selection** | `board-selection/` | Multi-tier board selection cards with dynamic fee deduction and prize pool displays. |
| **Matchmaking** | `searching-player/` | Simulated matchmaking radar, opponent pairing, countdown timer, and game launch. |
| **Physics Engine** | `board-and-pieces/` & `game.js` | Matter.js 2D rigid-body simulation for striker aiming, sliding friction, pocket collisions, and turn switching. |
| **Match Result** | `result/` | Victory/Loss modal, prize distribution, and instant same-opponent rematch system. |

---

## ⚙️ Physics & LocalStorage Specifications

### LocalStorage Keys
- `carrom_player_name`: Custom player display name (default: `Player 1`).
- `carrom_player_coins`: Persistent coin balance (initial base: `5,000`).

### Physics Parameters (`board-and-pieces/pieces-config.js`)
- **Restitution (Bounciness)**: `0.72` (coins) / `0.75` (cushion walls).
- **Deceleration Friction (`frictionAir`)**: `0.032` for smooth carrom powder sliding.
- **Striker Max Speed**: `17.0` for controlled, realistic shots.

---

## 🚀 How to Run Locally

Simply open `index.html` in any modern web browser or serve via a local HTTP server:

```bash
# Using VS Code Live Server or python http.server:
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.
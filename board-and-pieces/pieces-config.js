const GAME_CONFIG = {
    restingThreshold: 0.001,

    wall: {
        restitution: 0.75,
        minBounceSpeed: 0.3
    },

    striker: {
        radius: 24.6,         // Reduced to exactly match the 106px solid core of the PNG image
        visualScale: 1.415,   // 24.6 * 1.415 = 34.8px (Maintains EXACT original visual size)
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0012,      // Adjusted for ~3:1 mass ratio vs coin
        maxSpeed: 17,
        slop: 0.01,
        inertia: Infinity,
        frictionStatic: 0,
        friction: 0,
        isBullet: true
    },

    coin: {
        radius: 13.6,         // Reduced to exactly match the 66px solid core of the PNG image
        visualScale: 1.654,   // 13.6 * 1.654 = 22.5px (Maintains EXACT original visual size)
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0013,
        slop: 0.01,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity,
        isBullet: true
    },

    queen: {
        radius: 13.6,
        visualScale: 1.654,
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0013,
        slop: 0.01,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity,
        isBullet: true
    },

    controls: {
        dragThreshold: 15,
        maxDragDistance: 55,
        minSpeed: 1,
        maxSpeed: 35,
        arrowLengthMult: 1.6,
        arrowWidthMult: 1.5
    }
};
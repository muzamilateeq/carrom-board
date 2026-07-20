const GAME_CONFIG = {
    restingThreshold: 0.001,

    wall: {
        restitution: 0.88,
        minBounceSpeed: 0.3
    },

    striker: {
        radius: 17.4,         // Physical collision size
        visualScale: 2,       // How much to scale the image (1.35 = 35% larger)
        restitution: 0.82,
        frictionAir: 0.022,
        density: 0.0035,      // Heavier striker (approx 3x coin weight)
        maxSpeed: 22,
        slop: 0,
        inertia: Infinity,
        frictionStatic: 0,
        friction: 0,
        isBullet: true        // Prevent deep penetration at high speeds
    },

    coin: {
        radius: 15,           // Physical collision size
        visualScale: 1.50,    // How much to scale the image
        restitution: 0.82,
        frictionAir: 0.022,
        density: 0.0014,
        slop: 0,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity,
        isBullet: true        // Prevent deep penetration at high speeds
    },

    queen: {
        radius: 15,           // Physical collision size
        visualScale: 1.50,    // How much to scale the image
        restitution: 0.82,
        frictionAir: 0.022,
        density: 0.0014,
        slop: 0,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity,
        isBullet: true        // Prevent deep penetration at high speeds
    },

    controls: {
        dragThreshold: 5,
        maxDragDistance: 50
    }
};
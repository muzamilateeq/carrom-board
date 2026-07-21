const GAME_CONFIG = {
    restingThreshold: 0.001,

    wall: {
        restitution: 0.75,
        minBounceSpeed: 0.3
    },

    striker: {
        radius: 34.0,         // Large physical size to match desired visual size
        visualScale: 1.0,     // No artificial scaling
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0028,      // Striker weight
        maxSpeed: 17,
        slop: 0,
        inertia: Infinity,
        frictionStatic: 0,
        friction: 0,
        isBullet: true        // Prevent deep penetration at high speeds
    },

    coin: {
        radius: 23.0,         // Large physical size
        visualScale: 1.0,     // No artificial scaling
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0013,
        slop: 0,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity,
        isBullet: true        // Prevent deep penetration at high speeds
    },

    queen: {
        radius: 23.0,         // Large physical size
        visualScale: 1.0,     // No artificial scaling
        restitution: 0.72,
        frictionAir: 0.032,
        density: 0.0013,
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
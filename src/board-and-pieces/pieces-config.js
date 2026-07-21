const GAME_CONFIG = {
    restingThreshold: 0.001,

    wall: {
        restitution: 0.75,
        minBounceSpeed: 0.3
    },

    striker: {
        radius: 19.5,         // Physical collision size matching visual
        visualScale: 1.0,     // No artificial scaling to prevent ghost overlapping
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
        radius: 15,           // Physical collision size
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
        radius: 15,           // Physical collision size
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
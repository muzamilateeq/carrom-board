const GAME_CONFIG = {
    restingThreshold: 0.001,

    wall: {
        restitution: 0.8,
        minBounceSpeed: 0.3
    },

    striker: {
        restitution: 0.6,
        frictionAir: 0.03,
        density: 0.0026,
        maxSpeed: 18,
        slop: 0,
        inertia: Infinity
    },

    coin: {
        restitution: 0.7,
        frictionAir: 0.03,
        density: 0.0013,
        slop: 0,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity
    },

    queen: {
        restitution: 0.7,
        frictionAir: 0.03,
        density: 0.0013,
        slop: 0,
        friction: 0,
        frictionStatic: 0,
        inertia: Infinity
    },

    controls: {
        dragThreshold: 5,
        maxDragDistance: 50
    }
};

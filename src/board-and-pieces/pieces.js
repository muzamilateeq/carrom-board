const player = Matter.Bodies.circle(130, 492, GAME_CONFIG.striker.radius, {
    id: 'striker',
    label: 'striker',
    inertia: GAME_CONFIG.striker.inertia,
    frictionAir: GAME_CONFIG.striker.frictionAir,
    restitution: GAME_CONFIG.striker.restitution,
    slop: GAME_CONFIG.striker.slop,
    friction: GAME_CONFIG.striker.friction,
    frictionStatic: GAME_CONFIG.striker.frictionStatic,
    density: GAME_CONFIG.striker.density,
    plugin: { ccd: { toggled: true } },
    render: { visible: false }
});

const target = Matter.Bodies.circle(300, 300, GAME_CONFIG.queen.radius, {
    id: 'queen',
    label: 'queen',
    inertia: GAME_CONFIG.queen.inertia,
    frictionAir: GAME_CONFIG.queen.frictionAir,
    friction: GAME_CONFIG.queen.friction,
    frictionStatic: GAME_CONFIG.queen.frictionStatic,
    restitution: GAME_CONFIG.queen.restitution,
    density: GAME_CONFIG.queen.density,
    slop: GAME_CONFIG.queen.slop,
    plugin: { ccd: { toggled: true } },
    render: { visible: false }
});

const coinLayout = [
    { x: 347.5, y: 300.0, type: 'white' },
    { x: 324.5, y: 341.4, type: 'black' },
    { x: 277.0, y: 341.4, type: 'white' },
    { x: 252.5, y: 300.0, type: 'black' },
    { x: 277.0, y: 258.6, type: 'white' },
    { x: 324.5, y: 258.6, type: 'black' },
    { x: 395.1, y: 300.0, type: 'black' },
    { x: 372.1, y: 341.4, type: 'white' },
    { x: 347.5, y: 382.8, type: 'black' },
    { x: 300.0, y: 382.8, type: 'white' },
    { x: 252.5, y: 382.8, type: 'black' },
    { x: 229.5, y: 341.4, type: 'white' },
    { x: 204.9, y: 300.0, type: 'black' },
    { x: 229.5, y: 258.6, type: 'white' },
    { x: 252.5, y: 217.2, type: 'black' },
    { x: 300.0, y: 217.2, type: 'white' },
    { x: 347.5, y: 217.2, type: 'black' },
    { x: 372.1, y: 258.6, type: 'white' }
];

const coins = coinLayout.map((coin, index) => {
    return Matter.Bodies.circle(coin.x, coin.y, GAME_CONFIG.coin.radius, {
        id: `${coin.type}_${index + 1}`,
        label: coin.type,
        inertia: GAME_CONFIG.coin.inertia,
        restitution: GAME_CONFIG.coin.restitution,
        friction: GAME_CONFIG.coin.friction,
        frictionAir: GAME_CONFIG.coin.frictionAir,
        frictionStatic: GAME_CONFIG.coin.frictionStatic,
        density: GAME_CONFIG.coin.density,
        slop: GAME_CONFIG.coin.slop,
        plugin: { ccd: { toggled: true } },
        render: { visible: false }
    });
});
